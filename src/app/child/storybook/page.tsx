"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"
const AnimatedBackground = dynamic(
  () => import("@/components/layout/AnimatedBackground").then((m) => m.AnimatedBackground),
  { ssr: false }
)
import { GlassCard } from "@/components/layout/GlassCard"
import { getStories, deleteStory, type StoryEntry } from "@/lib/storybook"

export default function StoryBookPage() {
  const [mounted, setMounted] = useState(false)
  const [stories, setStories] = useState<StoryEntry[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    setStories(getStories())
  }, [])

  const handleDelete = (id: string) => {
    deleteStory(id)
    setStories(getStories())
    if (expanded === id) setExpanded(null)
  }

  if (!mounted) return <div className="min-h-screen" suppressHydrationWarning />

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 max-w-3xl mx-auto px-4 pb-16">
        {/* Back nav */}
        <div className="pt-4 pb-2">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm font-space transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
              ← Back to Journey
            </button>
          </Link>
        </div>

        {/* Header */}
        <div className="py-8 text-center space-y-2">
          <div className="text-5xl mb-3">📖</div>
          <h1 className="text-3xl font-orbitron font-black text-white">My Story Book</h1>
          <p className="text-sm font-space" style={{ color: "rgba(255,255,255,0.45)" }}>
            All your saved AI creations in one place
          </p>
          {stories.length > 0 && (
            <p className="text-xs font-orbitron font-bold tracking-widest" style={{ color: "#00d4ff" }}>
              {stories.length} {stories.length === 1 ? "story" : "stories"} saved
            </p>
          )}
        </div>

        {/* Empty state */}
        {stories.length === 0 && (
          <GlassCard className="p-12 text-center">
            <div className="text-4xl mb-4">✨</div>
            <p className="font-orbitron font-bold text-white mb-2">Nothing here yet!</p>
            <p className="text-sm font-space mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              Complete an activity and hit &quot;Save to Story Book&quot; to see it here.
            </p>
            <Link href="/">
              <button className="btn-solid-cyan px-6 py-2.5 rounded-xl font-orbitron font-bold text-sm">
                Go do an activity →
              </button>
            </Link>
          </GlassCard>
        )}

        {/* Story list */}
        <div className="space-y-4">
          <AnimatePresence>
            {stories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard className="overflow-hidden">
                  {/* Card header */}
                  <button
                    onClick={() => setExpanded(expanded === story.id ? null : story.id)}
                    className="w-full p-5 text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-orbitron font-bold tracking-widest uppercase" style={{ color: "#00d4ff" }}>
                            {story.stageName || "Stage"}
                          </span>
                          <span className="text-xs font-space px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }}>
                            +{story.xpEarned} XP
                          </span>
                        </div>
                        <h3 className="font-orbitron font-bold text-white text-sm mb-1 truncate">{story.activityTitle}</h3>
                        <p className="text-xs font-space" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {new Date(story.savedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      <span className="text-lg flex-shrink-0 mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                        {expanded === story.id ? "▲" : "▼"}
                      </span>
                    </div>

                    {/* Preview (collapsed) */}
                    {expanded !== story.id && (
                      <p className="text-sm font-space mt-3 line-clamp-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {story.content}
                      </p>
                    )}
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expanded === story.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 space-y-4">
                          {/* Fields used */}
                          {Object.keys(story.fields).length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(story.fields).map(([k, v]) => (
                                <span key={k} className="text-xs font-space px-2.5 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "rgba(0,212,255,0.8)" }}>
                                  {v}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Full story */}
                          <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <p className="text-sm font-space leading-relaxed whitespace-pre-wrap" style={{ color: "rgba(255,255,255,0.85)" }}>
                              {story.content}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3">
                            <button
                              onClick={() => navigator.clipboard.writeText(story.content)}
                              className="flex-1 py-2.5 rounded-xl text-xs font-orbitron font-bold"
                              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
                            >
                              📋 Copy
                            </button>
                            <button
                              onClick={() => handleDelete(story.id)}
                              className="px-4 py-2.5 rounded-xl text-xs font-orbitron font-bold"
                              style={{ background: "rgba(255,64,96,0.08)", border: "1px solid rgba(255,64,96,0.2)", color: "rgba(255,100,120,0.8)" }}
                            >
                              🗑 Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
