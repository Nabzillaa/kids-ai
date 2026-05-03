import type { ModelTier } from "@/types/stage"

// ─────────────────────────────────────────────
// Multi-model router
//
// Maps abstract model tiers to specific model IDs.
// Change provider or model here — stage config files
// never reference model strings directly.
//
// Vercel AI SDK provider packages required:
//   @ai-sdk/anthropic  @ai-sdk/openai  @ai-sdk/google
// ─────────────────────────────────────────────

export type Provider = "anthropic" | "openai" | "google"

interface ModelConfig {
  provider: Provider
  modelId: string
  // Approx cost tier for monitoring
  costTier: "low" | "medium" | "high"
}

// Default model per tier — swap these to change the whole platform
const MODEL_MAP: Record<ModelTier, ModelConfig> = {
  lightweight: {
    provider: "anthropic",
    modelId: "claude-haiku-4-5-20251001",
    costTier: "low",
  },
  mid: {
    provider: "anthropic",
    modelId: "claude-sonnet-4-6",
    costTier: "medium",
  },
  premium: {
    provider: "anthropic",
    modelId: "claude-opus-4-6",
    costTier: "high",
  },
}

// Fallback models if primary is unavailable
const FALLBACK_MAP: Record<ModelTier, ModelConfig> = {
  lightweight: {
    provider: "openai",
    modelId: "gpt-4o-mini",
    costTier: "low",
  },
  mid: {
    provider: "openai",
    modelId: "gpt-4o",
    costTier: "medium",
  },
  premium: {
    provider: "openai",
    modelId: "gpt-4o",
    costTier: "high",
  },
}

export const getModelConfig = (tier: ModelTier): ModelConfig =>
  MODEL_MAP[tier]

export const getFallbackModelConfig = (tier: ModelTier): ModelConfig =>
  FALLBACK_MAP[tier]

// ─────────────────────────────────────────────
// Token budget enforcement
//
// Hard caps per tier — activities cannot exceed these.
// This prevents runaway costs from edge-case prompts.
// ─────────────────────────────────────────────
export const TOKEN_CAPS: Record<ModelTier, number> = {
  lightweight: 600,
  mid: 1200,
  premium: 2500,
}

export const enforceTokenCap = (
  requested: number,
  tier: ModelTier
): number => Math.min(requested, TOKEN_CAPS[tier])
