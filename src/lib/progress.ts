// Per-stage activity progress stored in localStorage.
// Swappable to Supabase later.

export interface StageProgressData {
  completedActivityIds: string[]
  completedLessonIds: string[]
  lastActivityId: string | null
}

const key = (stageId: string) => `cyber-academy:progress:${stageId}`

export function getStageProgress(stageId: string): StageProgressData {
  if (typeof window === "undefined") return { completedActivityIds: [], completedLessonIds: [], lastActivityId: null }
  try {
    const raw = JSON.parse(localStorage.getItem(key(stageId)) ?? "null") ?? {
      completedActivityIds: [],
      completedLessonIds: [],
      lastActivityId: null,
    }
    // Back-compat: old data may not have completedLessonIds
    if (!raw.completedLessonIds) raw.completedLessonIds = []
    return raw
  } catch {
    return { completedActivityIds: [], completedLessonIds: [], lastActivityId: null }
  }
}

export function markLessonComplete(stageId: string, lessonId: string): void {
  const progress = getStageProgress(stageId)
  if (!progress.completedLessonIds.includes(lessonId)) {
    progress.completedLessonIds.push(lessonId)
  }
  localStorage.setItem(key(stageId), JSON.stringify(progress))
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
