// ─────────────────────────────────────────────
// Core types for the Kids AI Education Platform
// Every stage, lesson, activity, and output is
// defined using these types.
// ─────────────────────────────────────────────

export type AgeRange = [min: number, max: number]

export type ModelTier = "lightweight" | "mid" | "premium"

export type DifficultyLevel = "beginner" | "explorer" | "pro"

export type ActivityType =
  | "fill-in-the-blank"   // Kid fills fields → AI completes
  | "guided-choice"       // Kid picks from options → AI generates
  | "open-creative"       // Kid writes freely → AI collaborates
  | "remix"               // Kid modifies a previous output
  | "quiz"                // Knowledge check (auto-graded)
  | "multi-step"          // Sequential prompt chain

export type OutputType =
  | "storybook"
  | "character-portfolio"
  | "game-design-doc"
  | "research-report"
  | "mini-course"
  | "creative-portfolio"
  | "app-prototype"
  | "capstone-project"

// ─────────────────────────────────────────────
// Tip Card
// ─────────────────────────────────────────────

export interface TipCard {
  id: string
  title: string
  emoji: string
  tip: string
  example?: {
    bad: string
    good: string
  }
}

// ─────────────────────────────────────────────
// Quiz Question
// ─────────────────────────────────────────────

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

// ─────────────────────────────────────────────
// Activity
// ─────────────────────────────────────────────

export interface ActivityField {
  key: string
  label: string
  placeholder: string
  hint?: string
  maxLength?: number
}

export interface Activity {
  id: string
  title: string
  description: string
  type: ActivityType
  difficulty: DifficultyLevel
  estimatedMinutes: number
  // The prompt template sent to AI — {key} placeholders replaced with field values
  promptTemplate: string
  // Fields the child fills in (for fill-in-the-blank and open-creative types)
  fields?: ActivityField[]
  // For guided-choice: pre-defined options presented to the child
  choices?: Array<{ label: string; value: string }>
  // For multi-step: ordered list of sub-prompts
  steps?: string[]
  // For quiz type
  quiz?: QuizQuestion[]
  model: ModelTier
  maxTokens: number
  xpReward: number
  // Whether the output from this activity feeds into the stage output project
  contributesToOutput: boolean
  // Encourage retry for more XP
  allowRetry: boolean
  // Tip to show before the kid starts
  preTip?: string
}

// ─────────────────────────────────────────────
// Lesson
// ─────────────────────────────────────────────

export interface Lesson {
  id: string
  title: string
  // Short summary shown in lesson list
  summary: string
  // Rich content: can be markdown or a reference to a video/animation asset
  content: string
  videoUrl?: string
  durationMinutes: number
  // Key concept the lesson introduces
  keyConcept: string
  // Activities unlocked after this lesson is completed
  unlocksActivityIds: string[]
  xpReward: number
}

// ─────────────────────────────────────────────
// Stage Output Project
// ─────────────────────────────────────────────

export interface StageOutput {
  type: OutputType
  title: string
  description: string
  // Which activity IDs contribute pages/sections to this output
  activityIds: string[]
  // How many activities must be completed to generate the output
  minActivitiesRequired: number
  downloadable: boolean
  shareable: boolean
}

// ─────────────────────────────────────────────
// Badge
// ─────────────────────────────────────────────

export interface Badge {
  id: string
  name: string
  description: string
  emoji: string
  // Condition: completing the stage, or specific activity count
  condition: "stage-complete" | "all-pro" | "streak-7" | "first-output"
}

// ─────────────────────────────────────────────
// Stage — top-level config
// ─────────────────────────────────────────────

export interface Stage {
  id: string
  number: number                   // 1–8
  name: string                     // e.g. "AI Explorers"
  tagline: string                  // One-line hook shown on stage card
  ageRange: AgeRange
  // Theme colour used in UI (Tailwind colour name)
  themeColor: string
  // Emoji mascot for the stage
  mascot: string
  // Core skill introduced in this stage
  coreSkill: string
  lessons: Lesson[]
  activities: Activity[]
  tipCards: TipCard[]
  output: StageOutput
  badges: Badge[]
  totalXP: number                  // Sum of all lesson + activity XP
  primaryModel: ModelTier
}
