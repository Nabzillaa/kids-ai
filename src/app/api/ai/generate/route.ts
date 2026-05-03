import { NextRequest, NextResponse } from "next/server"
import type { ModelTier } from "@/types/stage"

// ── Provider switch ────────────────────────────────────────────────────────────
// Change AI_PROVIDER in .env.local to swap:
//   "ollama"    → local Ollama (free, no API key needed)
//   "anthropic" → Anthropic Claude (set ANTHROPIC_API_KEY)
//   "gemini"    → Google Gemini  (set GOOGLE_AI_API_KEY)
const PROVIDER = (process.env.AI_PROVIDER ?? "ollama") as "ollama" | "anthropic" | "gemini"

const OLLAMA_BASE  = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434"
const OLLAMA_MODEL = process.env.OLLAMA_MODEL    ?? "llama3.2"

// ── Safety system prompt ───────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a friendly, encouraging AI assistant helping children aged 7-15 learn creative skills.
Keep all content age-appropriate, positive, and safe.
Never produce violent, scary, adult, or inappropriate content.
Write in clear, simple English that matches the child's age level.
Be encouraging and celebrate creativity.
Keep responses concise and focused — children have short attention spans.`

// ── Model tier → Ollama model mapping ─────────────────────────────────────────
// When you switch to Anthropic/Gemini, update model-selector.ts instead.
function ollamaModelForTier(_tier: ModelTier): string {
  // All tiers use the same local model for now.
  // Swap tiers independently once you move to a cloud provider.
  return OLLAMA_MODEL
}

// ── Ollama ─────────────────────────────────────────────────────────────────────
async function generateWithOllama(prompt: string, tier: ModelTier): Promise<string> {
  const model = ollamaModelForTier(tier)

  const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user",   content: prompt },
      ],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Ollama error ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.message?.content ?? ""
}

// ── Anthropic ──────────────────────────────────────────────────────────────────
async function generateWithAnthropic(prompt: string, tier: ModelTier, maxTokens: number): Promise<string> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk")
  const { getModelConfig, enforceTokenCap } = await import("@/lib/ai/model-selector")

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const config     = getModelConfig(tier)
  const capped     = enforceTokenCap(maxTokens, tier)

  const msg = await anthropic.messages.create({
    model: config.modelId,
    max_tokens: capped,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: prompt }],
  })

  return msg.content
    .filter((b) => b.type === "text")
    .map((b) => ("text" in b ? b.text : ""))
    .join("")
}

// ── Gemini ─────────────────────────────────────────────────────────────────────
// Only active when AI_PROVIDER=gemini. Run: npm install @google/generative-ai first.
async function generateWithGemini(prompt: string): Promise<string> {
  throw new Error(
    `Gemini provider selected but @google/generative-ai is not installed. ` +
    `Run: npm install @google/generative-ai\n\nPrompt was: ${prompt.slice(0, 50)}`
  )
}

// ── Route handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt, model: modelTier, maxTokens } = body as {
      prompt: string
      model: ModelTier
      maxTokens: number
    }

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 })
    }

    let text = ""

    if (PROVIDER === "ollama") {
      text = await generateWithOllama(prompt, modelTier ?? "lightweight")
    } else if (PROVIDER === "anthropic") {
      if (!process.env.ANTHROPIC_API_KEY) {
        return NextResponse.json(
          { text: "⚠️ ANTHROPIC_API_KEY is not set in .env.local" },
          { status: 200 }
        )
      }
      text = await generateWithAnthropic(prompt, modelTier ?? "lightweight", maxTokens ?? 300)
    } else if (PROVIDER === "gemini") {
      if (!process.env.GOOGLE_AI_API_KEY) {
        return NextResponse.json(
          { text: "⚠️ GOOGLE_AI_API_KEY is not set in .env.local" },
          { status: 200 }
        )
      }
      text = await generateWithGemini(prompt)
    }

    return NextResponse.json({ text })
  } catch (err) {
    console.error("[AI Generate]", err)

    // Give a helpful hint if Ollama isn't running
    const message = err instanceof Error && err.message.includes("ECONNREFUSED")
      ? "⚠️ Ollama isn't running. Open a terminal and run: ollama serve"
      : "Oops! The AI ran into a problem. Try again in a moment."

    return NextResponse.json({ text: message }, { status: 200 })
  }
}
