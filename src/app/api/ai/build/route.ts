import { NextRequest, NextResponse } from "next/server"

const PROVIDER = (process.env.AI_PROVIDER ?? "ollama") as "ollama" | "anthropic" | "gemini"
const OLLAMA_BASE = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434"
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "llama3.2"

const SYSTEM = `You are an AI coding assistant for children aged 7–15.
When asked to build or edit a webpage, return ONLY valid HTML code — nothing else.
No explanations. No markdown. No code fences. Just raw HTML starting with <!DOCTYPE html>.
Make pages colourful, fun, and always appropriate for children.
Never include violent, scary, adult, or inappropriate content.`

function buildGeneratePrompt(topic: string): string {
  return `Build a colourful, fun webpage for a child about: "${topic}"

Requirements:
- Complete HTML: <!DOCTYPE html>, <html>, <head>, <body>
- CSS in a <style> tag: bright colours, clean font (Arial or similar), nice padding and spacing
- A big eye-catching <h1> heading
- A welcoming <p> introduction paragraph
- An <h2> section with 4–5 fun facts as a <ul> list
- At least one more interesting <h2> section about the topic
- Use emoji in headings and list items to make it fun

Return ONLY the HTML. Nothing else.`
}

function buildEditPrompt(currentCode: string, instruction: string): string {
  return `Here is a child's current webpage HTML:

${currentCode}

Apply this change: "${instruction}"

Rules:
- Keep everything that's already there unless asked to remove it
- Only add or change what was requested
- Return the COMPLETE updated HTML from <!DOCTYPE html> to </html>
- Return ONLY the HTML. Nothing else.`
}

function stripFences(text: string): string {
  const fenced = text.match(/```(?:html)?\s*([\s\S]*?)```/)
  if (fenced) return fenced[1].trim()
  // Also strip a leading ```html without closing fence
  return text.replace(/^```(?:html)?\s*/i, "").trim()
}

function wrapIfPartial(html: string): string {
  if (html.toLowerCase().includes("<html")) return html
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Arial, sans-serif; padding: 24px; background: #f0f8ff; color: #333; }
</style>
</head>
<body>
${html}
</body>
</html>`
}

async function callOllama(userPrompt: string): Promise<string> {
  const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: false,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: userPrompt },
      ],
    }),
  })
  if (!res.ok) throw new Error(`Ollama ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.message?.content ?? ""
}

async function callAnthropic(userPrompt: string): Promise<string> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk")
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const msg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    system: SYSTEM,
    messages: [{ role: "user", content: userPrompt }],
  })
  return msg.content
    .filter((b) => b.type === "text")
    .map((b) => ("text" in b ? b.text : ""))
    .join("")
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { mode, topic, code, instruction } = body as {
      mode: "generate" | "edit"
      topic?: string
      code?: string
      instruction?: string
    }

    let userPrompt: string
    let message: string

    if (mode === "generate") {
      if (!topic?.trim()) return NextResponse.json({ error: "No topic provided" }, { status: 400 })
      userPrompt = buildGeneratePrompt(topic)
      message = `I built your ${topic} page! It has a heading, fun facts, and colourful styling. Now try editing the code or tell me what to change!`
    } else if (mode === "edit") {
      if (!code?.trim() || !instruction?.trim()) {
        return NextResponse.json({ error: "Missing code or instruction" }, { status: 400 })
      }
      userPrompt = buildEditPrompt(code, instruction)
      message = `Done! I updated your page. Check the preview to see the change — what else would you like?`
    } else {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 })
    }

    let raw = ""

    if (PROVIDER === "anthropic") {
      if (!process.env.ANTHROPIC_API_KEY) {
        return NextResponse.json(
          { error: "ANTHROPIC_API_KEY is not set in .env.local" },
          { status: 500 }
        )
      }
      raw = await callAnthropic(userPrompt)
    } else if (PROVIDER === "ollama") {
      raw = await callOllama(userPrompt)
    } else {
      return NextResponse.json({ error: "Provider not configured" }, { status: 500 })
    }

    const html = wrapIfPartial(stripFences(raw))
    return NextResponse.json({ html, message })
  } catch (err) {
    console.error("[AI Build]", err)

    const isConnRefused = (e: unknown): boolean => {
      if (!e || typeof e !== "object") return false
      const obj = e as Record<string, unknown>
      if (obj["code"] === "ECONNREFUSED") return true
      if (typeof obj["message"] === "string" && obj["message"].includes("ECONNREFUSED")) return true
      if (obj["cause"]) return isConnRefused(obj["cause"])
      return false
    }

    const error = isConnRefused(err)
      ? "Ollama isn't running. Open a terminal and run: ollama serve"
      : "The AI ran into a problem — try again in a moment!"

    return NextResponse.json({ error }, { status: 200 })
  }
}
