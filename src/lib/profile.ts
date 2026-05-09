import type { ChildProfile } from "@/types/profile"

const KEY = "cyber-academy-profile-v1"

export function getProfile(): ChildProfile | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ChildProfile) : null
  } catch {
    return null
  }
}

export function saveProfile(p: ChildProfile): void {
  localStorage.setItem(KEY, JSON.stringify(p))
}

export function markTutorialDone(): void {
  const p = getProfile()
  if (p) saveProfile({ ...p, tutorialDone: true })
}

export function clearProfile(): void {
  localStorage.removeItem(KEY)
}
