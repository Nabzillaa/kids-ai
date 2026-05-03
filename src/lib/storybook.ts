// Local storage-based Story Book
// Swappable to Supabase later — just replace these functions.

export interface StoryEntry {
  id: string
  activityId: string
  activityTitle: string
  stageId: string
  stageName: string
  content: string
  fields: Record<string, string>
  xpEarned: number
  savedAt: string // ISO string
}

const KEY = "cyber-academy:storybook"

export function getStories(): StoryEntry[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]")
  } catch {
    return []
  }
}

export function saveStory(entry: Omit<StoryEntry, "id" | "savedAt">): StoryEntry {
  const stories = getStories()
  const newEntry: StoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  }
  localStorage.setItem(KEY, JSON.stringify([newEntry, ...stories]))
  return newEntry
}

export function deleteStory(id: string): void {
  const stories = getStories().filter((s) => s.id !== id)
  localStorage.setItem(KEY, JSON.stringify(stories))
}
