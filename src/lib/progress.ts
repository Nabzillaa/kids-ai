// Per-stage activity progress stored in localStorage.
// Swappable to Supabase later.

export interface StageProgressData {
  completedActivityIds: string[]
  lastActivityId: string | null
}

const key = (stageId: string) => `cyber-academy:progress:${stageId}`

export function getStageProgress(stageId: string): StageProgressData {
  if (typeof window === "undefined") return { completedActivityIds: [], lastActivityId: null }
  try {
    return JSON.parse(localStorage.getItem(key(stageId)) ?? "null") ?? {
      completedActivityIds: [],
      lastActivityId: null,
    }
  } catch {
    return { completedActivityIds: [], lastActivityId: null }
  }
}

export function markActivityComplete(stageId: string, activityId: string): void {
  const progress = getStageProgress(stageId)
  if (!progress.completedActivityIds.includes(activityId)) {
    progress.completedActivityIds.push(activityId)
  }
  progress.lastActivityId = activityId
  localStorage.setItem(key(stageId), JSON.stringify(progress))
}

export function setLastActivity(stageId: string, activityId: string): void {
  const progress = getStageProgress(stageId)
  progress.lastActivityId = activityId
  localStorage.setItem(key(stageId), JSON.stringify(progress))
}
