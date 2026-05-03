import { stage1 } from "./stage-1"
import { stage2 } from "./stage-2"
// Stages 3–8 added here as they are built

import type { Stage } from "@/types/stage"

export const stages: Stage[] = [
  stage1,
  stage2,
]

export const getStageById = (id: string): Stage | null =>
  stages.find((s) => s.id === id) ?? null

export const getStageByNumber = (n: number): Stage | null =>
  stages.find((s) => s.number === n) ?? null

export const getStageForAge = (age: number): Stage | null =>
  stages.find((s) => age >= s.ageRange[0] && age <= s.ageRange[1]) ?? null

export const getPublishedStages = (): Stage[] => stages
