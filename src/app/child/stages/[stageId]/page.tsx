"use client"

import { use, useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"
const AnimatedBackground = dynamic(
  () => import("@/components/layout/AnimatedBackground").then((m) => m.AnimatedBackground),
  { ssr: false }
)
import { StageHeader } from "@/components/layout/StageHeader"
import { GlassCard } from "@/components/layout/GlassCard"
import { BadgeCard } from "@/components/gamification/BadgeCard"
import { FillInTheBlank } from "@/components/activities/FillInTheBlank"
import { QuizActivity } from "@/components/activities/QuizActivity"
import { CodeBuilder } from "@/components/activities/CodeBuilder"
import { LessonViewer } from "@/components/activities/LessonViewer"
import { PortfolioView } from "@/components/activities/PortfolioView"
import { getStageById } from "@/stages"
import { getStageProgress, markActivityComplete, markLessonComplete, setLastActivity } from "@/lib/progress"
import type { Activity, DifficultyLevel, Lesson } from "@/types/stage"

const STAGE_COLORS: Record<string, string> = {
  "stage-1": "#ffb800",
  "stage-2": "#ff0080",
  "stage-3": "#00d4ff",
  "stage-4": "#00ff88",
  "stage-5": "#7c3aed",
  "stage-6": "#ff6b35",
  "stage-7": "#00d4ff",
  "stage-8": "#a855f7",
}

type Tab = "overview" | "lessons" | "activities" | "tips" | "badges" | "portfolio"

export default function StagePage({ params }: { params: Promise<{ stageId: string }> }) {
  const { stageId } = use(params)
  const stage = getStageById(stageId)
  if (!stage) notFound()

  const color = STAGE_COLORS[stageId] ?? "#00d4ff"
  const [mounted, setMounted] = useState(false)
  const [completedIds, setCompletedIds] = useState<string[]>([])
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([])
  const [lastActivityId, setLastActivityId] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    const p = getStageProgress(stageId)
    setCompletedIds(p.completedActivityIds)
    setCompletedLessonIds(p.completedLessonIds)
    setLastActivityId(p.lastActivityId)
  }, [stageId])

  const [activeTab, setActiveTab] = useState<Tab>("overview")
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>("beginner")
  const [earnedXP, setEarnedXP] = useState(0)

  const hasPortfolio = stage.output.type === "character-portfolio"

  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: "overview",    label: "Overview",    emoji: "🗺️" },
    { id: "lessons",     label: "Lessons",     emoji: "📖" },
    { id: "activities",  label: "Activities",  emoji: "⚡" },
    { id: "tips",        label: "Tip Cards",   emoji: "💡" },
    { id: "badges",      label: "Badges",      emoji: "🏆" },
    ...(hasPortfolio ? [{ id: "portfolio" as Tab, label: "Portfolio", emoji: "🦊" }] : []),
  ]

  // Group activities by difficulty for the activities tab
  const beginnerActivities = stage.activities.filter((a) => a.difficulty === "beginner")
  const explorerActivities  = stage.activities.filter((a) => a.difficulty === "explorer")
  const proActivities       = stage.activities.filter((a) => a.difficulty === "pro")

  const handleActivityComplete = (xp: number, _difficulty: DifficultyLevel) => {
    setEarnedXP((prev) => prev + xp)
    if (selectedActivity) {
      markActivityComplete(stageId, selectedActivity.id)
      setCompletedIds((prev) =>
        prev.includes(selectedActivity.id) ? prev : [...prev, selectedActivity.id]
      )
      setLastActivityId(selectedActivity.id)
    }
  }

  const handleLessonComplete = (xp: number) => {
    if (!selectedLesson) return
    setEarnedXP((prev) => prev + xp)
    markLessonComplete(stageId, selectedLesson.id)
    setCompletedLessonIds((prev) =>
      prev.includes(selectedLesson.id) ? prev : [...prev, selectedLesson.id]
    )
  }

  const openActivity = (activity: Activity) => {
    setSelectedActivity(activity)
    setLastActivity(stageId, activity.id)
    setLastActivityId(activity.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNextActivity = () => {
    if (!selectedActivity) return
    const allActivities = stage.activities
    const currentIndex = allActivities.findIndex((a) => a.id === selectedActivity.id)
    const next = allActivities[currentIndex + 1] ?? null
    if (next) openActivity(next)
    else setSelectedActivity(null) // back to list if no next
  }

  const hasNextActivity = selectedActivity
    ? stage.activities.findIndex((a) => a.id === selectedActivity.id) < stage.activities.length - 1
    : false

  if (!mounted) {
    return <div className="min-h-screen" suppressHydrationWarning />
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-16">
        {/* Back nav */}
        <div className="pt-4 pb-2">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm font-space transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
              ← Back to Journey
            </button>
          </Link>
        </div>

        {/* Stage header */}
        <StageHeader
          stageNumber={stage.number}
          stageName={stage.name}
          tagline={stage.tagline}
          mascot={stage.mascot}
          accentColor={color}
          xp={earnedXP}
          maxXP={stage.totalXP}
        />

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 mb-6 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedActivity(null); setSelectedLesson(null) }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-orbitron font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0"
              style={
                activeTab === tab.id
                  ? {
                      background: `linear-gradient(135deg, ${color}20, ${color}08)`,
                      border: `1px solid ${color}50`,
                      color,
                      boxShadow: `0 0 15px ${color}20`,
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.45)",
                    }
              }
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <div className="space-y-5">
                {/* Core skill */}
                <GlassCard className="p-6" glow>
                  <p className="text-xs font-orbitron font-bold tracking-widest uppercase mb-3" style={{ color }}>
                    Core Skill
                  </p>
                  <p className="text-lg font-space font-medium text-white">{stage.coreSkill}</p>
                </GlassCard>

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Lessons",    value: stage.lessons.length,    icon: "📖" },
                    { label: "Activities", value: stage.activities.length,  icon: "⚡" },
                    { label: "Tip Cards",  value: stage.tipCards.length,    icon: "💡" },
                    { label: "Total XP",   value: stage.totalXP.toLocaleString(), icon: "🌟" },
                  ].map((s) => (
                    <GlassCard key={s.label} className="p-4 text-center">
                      <p className="text-2xl mb-1">{s.icon}</p>
                      <p className="text-xl font-orbitron font-black" style={{ color }}>{s.value}</p>
                      <p className="text-xs font-space" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                    </GlassCard>
                  ))}
                </div>

                {/* Output project */}
                <GlassCard variant="elevated" className="p-6">
                  <p className="text-xs font-orbitron font-bold tracking-widest uppercase mb-3" style={{ color }}>
                    Stage Output Project
                  </p>
                  <h3 className="text-xl font-orbitron font-bold text-white mb-2">{stage.output.title}</h3>
                  <p className="text-sm font-space leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {stage.output.description}
                  </p>
                  <div className="flex gap-3 mt-4 text-xs font-space" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {stage.output.downloadable && <span>📥 Downloadable</span>}
                    {stage.output.shareable   && <span>🔗 Shareable</span>}
                    <span>Min {stage.output.minActivitiesRequired} activities required</span>
                  </div>
                </GlassCard>

                {/* Quick start CTA */}
                <button
                  onClick={() => setActiveTab("activities")}
                  className="w-full py-4 rounded-xl font-orbitron font-bold text-sm tracking-wider"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                    color: "#050510",
                    boxShadow: `0 0 25px ${color}40, 0 0 50px ${color}15`,
                  }}
                >
                  Start First Activity ⚡
                </button>
              </div>
            )}

            {/* ── LESSONS LIST ── */}
            {activeTab === "lessons" && !selectedLesson && (
              <div className="space-y-3">
                {/* Lesson progress */}
                {completedLessonIds.length > 0 && (
                  <GlassCard className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-orbitron font-bold tracking-widest uppercase" style={{ color }}>
                        Lessons Read
                      </span>
                      <span className="text-xs font-orbitron font-bold" style={{ color }}>
                        {completedLessonIds.length} / {stage.lessons.length}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)`, boxShadow: `0 0 8px ${color}60` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(completedLessonIds.length / stage.lessons.length) * 100}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </GlassCard>
                )}

                {stage.lessons.map((lesson, i) => {
                  const isDone = completedLessonIds.includes(lesson.id)
                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <GlassCard hover className="p-5" onClick={() => setSelectedLesson(lesson)}>
                        <div className="flex items-start gap-4">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-orbitron font-black flex-shrink-0"
                            style={
                              isDone
                                ? { background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.3)", color: "#00ff88" }
                                : { background: `${color}15`, border: `1px solid ${color}30`, color }
                            }
                          >
                            {isDone ? "✓" : i + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3
                                className="font-orbitron font-bold text-sm"
                                style={{ color: isDone ? "rgba(255,255,255,0.5)" : "white" }}
                              >
                                {lesson.title}
                              </h3>
                              {isDone && (
                                <span className="text-xs font-orbitron font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88" }}>
                                  Done
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-space mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                              {lesson.summary}
                            </p>
                            <div className="flex gap-3 text-xs font-space" style={{ color: "rgba(255,255,255,0.35)" }}>
                              <span>⏱ {lesson.durationMinutes} min</span>
                              <span style={{ color: isDone ? "rgba(255,255,255,0.2)" : color }}>+{lesson.xpReward} XP</span>
                              <span>🔓 {lesson.unlocksActivityIds.length} activities</span>
                            </div>
                          </div>
                          <span className="text-sm flex-shrink-0" style={{ color: "rgba(255,255,255,0.2)" }}>→</span>
                        </div>
                      </GlassCard>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {/* ── LESSON VIEWER ── */}
            {activeTab === "lessons" && selectedLesson && (() => {
              const lessonIndex = stage.lessons.findIndex((l) => l.id === selectedLesson.id)
              const prevLesson  = stage.lessons[lessonIndex - 1] ?? null
              const nextLesson  = stage.lessons[lessonIndex + 1] ?? null
              const unlocked    = selectedLesson.unlocksActivityIds
                .map((aid) => stage.activities.find((a) => a.id === aid)?.title)
                .filter(Boolean) as string[]
              return (
                <LessonViewer
                  lesson={selectedLesson}
                  lessonIndex={lessonIndex}
                  totalLessons={stage.lessons.length}
                  accentColor={color}
                  isCompleted={completedLessonIds.includes(selectedLesson.id)}
                  onComplete={handleLessonComplete}
                  onClose={() => setSelectedLesson(null)}
                  onPrev={prevLesson ? () => setSelectedLesson(prevLesson) : undefined}
                  onNext={nextLesson ? () => setSelectedLesson(nextLesson) : undefined}
                  unlockedActivityTitles={unlocked}
                />
              )
            })()}

            {/* ── ACTIVITIES ── */}
            {activeTab === "activities" && !selectedActivity && (
              <div className="space-y-6">
                {/* Overall progress bar */}
                {completedIds.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <GlassCard className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-orbitron font-bold tracking-widest uppercase" style={{ color }}>
                          Progress
                        </span>
                        <span className="text-xs font-orbitron font-bold" style={{ color }}>
                          {completedIds.length} / {stage.activities.length}
                        </span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)`, boxShadow: `0 0 8px ${color}60` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(completedIds.length / stage.activities.length) * 100}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                      {/* Resume button */}
                      {lastActivityId && (() => {
                        const lastActivity = stage.activities.find((a) => a.id === lastActivityId)
                        if (!lastActivity) return null
                        const isComplete = completedIds.includes(lastActivityId)
                        const nextIncomplete = stage.activities.find((a) => !completedIds.includes(a.id))
                        const target = isComplete ? nextIncomplete : lastActivity
                        if (!target) return null
                        return (
                          <button
                            onClick={() => openActivity(target)}
                            className="mt-3 w-full py-2.5 rounded-xl text-sm font-orbitron font-bold"
                            style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
                          >
                            {isComplete ? `▶ Continue — ${target.title}` : `↩ Resume — ${target.title}`}
                          </button>
                        )
                      })()}
                    </GlassCard>
                  </motion.div>
                )}

                {[
                  { label: "🌱 Beginner", activities: beginnerActivities, tierColor: "#00ff88" },
                  { label: "🚀 Explorer", activities: explorerActivities, tierColor: "#00d4ff" },
                  { label: "⚡ Pro",      activities: proActivities,       tierColor: "#ff0080" },
                ].map(({ label, activities, tierColor }) => {
                  const doneInTier = activities.filter((a) => completedIds.includes(a.id)).length
                  return (
                    <div key={label} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-orbitron font-bold" style={{ color: tierColor }}>{label}</span>
                        <div className="flex-1 h-px" style={{ background: `${tierColor}20` }} />
                        <span className="text-xs font-space" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {doneInTier}/{activities.length}
                        </span>
                      </div>
                      {activities.map((activity, i) => {
                        const isDone = completedIds.includes(activity.id)
                        const isLast = activity.id === lastActivityId && !isDone
                        return (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <GlassCard
                              hover
                              className="p-4"
                              onClick={() => openActivity(activity)}
                            >
                              <div className="flex items-center gap-3">
                                {/* Icon / completion state */}
                                <div
                                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                                  style={
                                    isDone
                                      ? { background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.3)" }
                                      : { background: `${tierColor}10`, border: `1px solid ${tierColor}25` }
                                  }
                                >
                                  {isDone ? "✓" : activity.type === "quiz" ? "📝" : activity.type === "code-build" ? "💻" : activity.type === "multi-step" ? "🔗" : "✍️"}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4
                                      className="text-sm font-space font-semibold truncate"
                                      style={{ color: isDone ? "rgba(255,255,255,0.5)" : "white" }}
                                    >
                                      {activity.title}
                                    </h4>
                                    {isLast && (
                                      <span className="text-xs font-orbitron font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                                        style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                                        In Progress
                                      </span>
                                    )}
                                    {activity.contributesToOutput && !isDone && hasPortfolio && (
                                      <span className="text-xs font-orbitron font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                                        style={{ background: `${color}10`, border: `1px solid ${color}25`, color }}>
                                        ✦ Portfolio
                                      </span>
                                    )}
                                    {isDone && (
                                      <span className="text-xs font-orbitron font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                                        style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88" }}>
                                        Done
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs font-space truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                                    {activity.description}
                                  </p>
                                </div>

                                <div className="flex-shrink-0 flex items-center gap-3 text-xs font-space">
                                  <span style={{ color: isDone ? "rgba(255,255,255,0.25)" : tierColor }}>
                                    +{activity.xpReward} XP
                                  </span>
                                  <span style={{ color: "rgba(255,255,255,0.2)" }}>⏱ {activity.estimatedMinutes}m</span>
                                  <span style={{ color: "rgba(255,255,255,0.2)" }}>→</span>
                                </div>
                              </div>
                            </GlassCard>
                          </motion.div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            )}

            {/* ── ACTIVITY DETAIL ── */}
            {activeTab === "activities" && selectedActivity && (
              <div className="space-y-5">
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="flex items-center gap-2 text-sm font-space"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  ← All Activities
                </button>

                <GlassCard className="p-6" glow>
                  <div className="mb-5">
                    <p className="text-xs font-orbitron font-bold tracking-widest uppercase mb-1" style={{ color }}>
                      {selectedActivity.difficulty.toUpperCase()} · {selectedActivity.estimatedMinutes} min · +{selectedActivity.xpReward} XP
                    </p>
                    <h2 className="text-xl font-orbitron font-bold text-white mb-2">{selectedActivity.title}</h2>
                    <p className="text-sm font-space" style={{ color: "rgba(255,255,255,0.55)" }}>{selectedActivity.description}</p>
                  </div>

                  <div className="border-t mb-5" style={{ borderColor: `${color}15` }} />

                  {selectedActivity.type === "quiz" && selectedActivity.quiz && (
                    <QuizActivity
                      activity={selectedActivity}
                      accentColor={color}
                      onComplete={handleActivityComplete}
                      onNext={hasNextActivity ? handleNextActivity : undefined}
                    />
                  )}

                  {selectedActivity.type === "code-build" && (
                    <CodeBuilder
                      activity={selectedActivity}
                      accentColor={color}
                      stageId={stageId}
                      onComplete={handleActivityComplete}
                      onNext={hasNextActivity ? handleNextActivity : undefined}
                    />
                  )}

                  {selectedActivity.type !== "quiz" && selectedActivity.type !== "code-build" && (
                    <FillInTheBlank
                      activity={selectedActivity}
                      accentColor={color}
                      stageId={stageId}
                      stageName={stage.name}
                      onComplete={handleActivityComplete}
                      onNext={hasNextActivity ? handleNextActivity : undefined}
                    />
                  )}
                </GlassCard>
              </div>
            )}

            {/* ── TIP CARDS ── */}
            {activeTab === "tips" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {stage.tipCards.map((tip, i) => (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <GlassCard className="p-5 h-full">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl flex-shrink-0">{tip.emoji}</span>
                        <h3 className="font-orbitron font-bold text-sm text-white leading-tight">{tip.title}</h3>
                      </div>
                      <p className="text-sm font-space leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
                        {tip.tip}
                      </p>
                      {tip.example && (
                        <div className="space-y-2">
                          <div className="flex gap-2 p-3 rounded-lg" style={{ background: "rgba(255,0,64,0.08)", border: "1px solid rgba(255,0,64,0.15)" }}>
                            <span className="text-xs flex-shrink-0 mt-0.5">❌</span>
                            <p className="text-xs font-space italic" style={{ color: "rgba(255,100,100,0.8)" }}>{tip.example.bad}</p>
                          </div>
                          <div className="flex gap-2 p-3 rounded-lg" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.15)" }}>
                            <span className="text-xs flex-shrink-0 mt-0.5">✅</span>
                            <p className="text-xs font-space italic" style={{ color: "rgba(100,255,180,0.8)" }}>{tip.example.good}</p>
                          </div>
                        </div>
                      )}
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ── BADGES ── */}
            {activeTab === "badges" && (
              <div className="space-y-5">
                <GlassCard className="p-6">
                  <p className="text-xs font-orbitron font-bold tracking-widest uppercase mb-4" style={{ color }}>
                    Stage {stage.number} Badges
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {stage.badges.map((badge) => (
                      <BadgeCard key={badge.id} badge={badge} earned={false} accentColor={color} size="md" />
                    ))}
                  </div>
                </GlassCard>
                <p className="text-center text-sm font-space" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Complete activities and the stage to unlock your badges!
                </p>
              </div>
            )}

            {/* ── PORTFOLIO ── */}
            {activeTab === "portfolio" && hasPortfolio && (
              <PortfolioView
                stage={stage}
                accentColor={color}
                completedActivityIds={completedIds}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
