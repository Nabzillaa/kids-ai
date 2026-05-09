import { NextRequest, NextResponse } from "next/server"

const PROVIDER  = (process.env.AI_PROVIDER ?? "ollama") as "ollama" | "anthropic" | "gemini"
const OLLAMA_BASE  = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434"
const OLLAMA_MODEL = process.env.OLLAMA_MODEL    ?? "llama3.2"

interface CompanionConfig {
  name: string
  type: string
  typeEmoji: string
  personalities: string[]  // e.g. ["Funny", "Wise"]
  skill: string            // e.g. "Dinosaurs"
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

function buildSystemPrompt(companion: CompanionConfig, childName: string | null): string {
  const personalities = companion.personalities.join(" and ")
  const creator = childName ? childName.split(" ")[0] : "a kid"

  return `You are ${companion.name}, a ${companion.type} companion who was created by ${creator}!

Your personality: You are ${personalities}. Every single response must show this personality strongly.
Your special skill: You are the world's greatest expert on ${companion.skill}. You know more about it than anyone! Show this off whenever it's even slightly relevant.
You look like: A ${companion.type} (${companion.typeEmoji}).

RULES — follow these exactly:
- Stay in character as ${companion.name} at ALL times. NEVER say you are an AI, a language model, or anything technical.
- Match your personality perfectly. If funny → crack jokes and be silly. If wise → speak with thoughtful depth. If energetic → be VERY enthusiastic with caps and exclamation marks!
- Keep every response to 2–4 sentences max. Your creator is young and loves short, punchy answers.
- Use 1–2 emoji per message that perfectly match your personality and what you're talking about.
- Be completely devoted to ${creator} — you love them unconditionally.
- If they ask what you look like, describe yourself as a ${companion.type}.
- If asked something outside your skill, still answer helpfully in character, but try to link it back to ${companion.skill} if you can!`
}

async function chatWithOllama(systemPrompt: string, messages: ChatMessage[]): Promise<string> {
  const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: false,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    }),
  })
  if (!res.ok) throw new Error(`Ollama ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.message?.content ?? ""
}

async function chatWithAnthropic(systemPrompt: string, messages: ChatMessage[], maxTokens: number): Promise<string> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk")
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  })
  return msg.content.filter((b) => b.type === "text").map((b) => ("text" in b ? b.text : "")).join("")
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      companion: CompanionConfig
      messages: ChatMessage[]
      childName?: string | null
    }

    const { companion, messages, childName = null } = body
    if (!companion || !messages) {
      return NextResponse.json({ error: "Missing companion or messages" }, { status: 400 })
    }

    const systemPrompt = buildSystemPrompt(companion, childName)
    let text = ""

    if (PROVIDER === "ollama") {
      text = await chatWithOllama(systemPrompt, messages)
    } else if (PROVIDER === "anthropic") {
      if (!process.env.ANTHROPIC_API_KEY) {
        return NextResponse.json({ text: "⚠️ ANTHROPIC_API_KEY is not set in .env.local" })
      }
      text = await chatWithAnthropic(systemPrompt, messages, 300)
    } else {
      return NextResponse.json({ text: "⚠️ Gemini not supported for companion chat yet." })
    }

    return NextResponse.json({ text })
  } catch (err) {
    console.error("[AI Companion]", err)

    const isConnRefused = (e: unknown): boolean => {
      if (!e || typeof e !== "object") return false
      const obj = e as Record<string, unknown>
      if (obj["code"] === "ECONNREFUSED") return true
      if (typeof obj["message"] === "string" && obj["message"].includes("ECONNREFUSED")) return true
      if (obj["cause"]) return isConnRefused(obj["cause"])
      return false
    }

    const message = isConnRefused(err)
      ? "⚠️ Ollama isn't running. Open a terminal and run: ollama serve"
      : "Oops! Something went wrong. Try again in a moment."

    return NextResponse.json({ text: message })
  }
}
