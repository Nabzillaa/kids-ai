export type AgeGroup = "7-8" | "9-10" | "11-12" | "13+"
export type Experience = "none" | "some" | "lots"

export interface ChildProfile {
  name?: string
  ageGroup: AgeGroup
  experience: Experience
  interests: string[]   // e.g. ["animals", "gaming", "space"]
  tutorialDone: boolean
  createdAt: string
}
