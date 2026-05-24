import { NextRequest, NextResponse } from "next/server"

const PROVIDER    = (process.env.AI_PROVIDER ?? "ollama") as "ollama" | "anthropic" | "gemini"
const OLLAMA_BASE  = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434"
const OLLAMA_MODEL = process.env.OLLAMA_MODEL    ?? "llama3.2"

const SYSTEM = `You are a creative, enthusiastic AI assistant for children aged 7–15.
When given an idea or topic, respond with a short, vivid, imaginative 2–3 sentence creative burst.
Be surprising, fun, and completely age-appropriate. Maximum 80 words. Use 1–2 emoji that fit the idea.
Never refuse — treat every idea as exciting and worth creating!`

async function generateWithOllama(idea: string): Promise<string> {
  const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: false,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user",   content: `Create something amazing about: ${idea}` },
      ],
    }),
  })
  if (!res.ok) throw new Error(`Ollama ${res.status}`)
  const data = await res.json()
  return data.message?.content ?? ""
}

async function generateWithAnthropic(idea: string): Promise<string> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk")
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 150,
    system: SYSTEM,
    messages: [{ role: "user", content: `Create something amazing about: ${idea}` }],
  })
  return msg.content.filter((b) => b.type === "text").map((b) => ("text" in b ? b.text : "")).join("")
}

const isConnRefused = (e: unknown): boolean => {
  if (!e || typeof e !== "object") return false
  const obj = e as Record<string, unknown>
  if (obj["code"] === "ECONNREFUSED") return true
  if (typeof obj["message"] === "string" && obj["message"].includes("ECONNREFUSED")) return true
  if (obj["cause"]) return isConnRefused(obj["cause"])
  return false
}

export async function POST(req: NextRequest) {
  try {
    const { idea } = (await req.json()) as { idea?: string }
    if (!idea?.trim()) {
      return NextResponse.json({ error: "Missing idea" }, { status: 400 })
    }

    let response = ""
    if (PROVIDER === "ollama") {
      response = await generateWithOllama(idea.trim())
    } else if (PROVIDER === "anthropic") {
      if (!process.env.ANTHROPIC_API_KEY) {
        return NextResponse.json({ response: "⚠️ ANTHROPIC_API_KEY is not set in .env.local" })
      }
      response = await generateWithAnthropic(idea.trim())
    } else {
      return NextResponse.json({ response: "⚠️ Gemini not supported for spark yet." })
    }

    return NextResponse.json({ response })
  } catch (err) {
    console.error("[AI Spark]", err)
    const fallback = isConnRefused(err)
      ? "⚠️ Ollama isn't running. Open a terminal and run: ollama serve"
      : "Wow — what an amazing idea! AI is going to help you make it real. Let's get building! 🚀"
    return NextResponse.json({ response: fallback })
  }
}
