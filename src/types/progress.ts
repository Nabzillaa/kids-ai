// Progress and user profile types

export interface ChildProfile {
  id: string
  parentId: string
  name: string
  age: number
  avatarId: string
  themeId: string
  createdAt: string
}

export interface StageProgress {
  childId: string
  stageId: string
  currentLessonId: string | null
  completedLessonIds: string[]
  completedActivityIds: string[]
  // Map of activityId → best difficulty achieved
  activityBestDifficulty: Record<string, "beginner" | "explorer" | "pro">
  earnedBadgeIds: string[]
  totalXP: number
  stageCompleted: boolean
  stageCompletedAt: string | null
}

export interface ActivityOutput {
  id: string
  childId: string
  stageId: string
  activityId: string
  difficulty: "beginner" | "explorer" | "pro"
  // The fields the child filled in
  inputs: Record<string, string>
  // The AI-generated response
  aiOutput: string
  createdAt: string
  // If this output is included in the stage output project
  includedInOutput: boolean
}

export interface StageOutputProject {
  id: string
  childId: string
  stageId: string
  outputType: string
  title: string
  // Ordered list of activity outputs that make up this project
  activityOutputIds: string[]
  generatedAt: string
  // URL to the generated PDF/image in Supabase Storage
  fileUrl: string | null
}
