"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DifficultySelector } from "./DifficultySelector"
import { AIOutput, AIThinking } from "./AIOutput"
import { XPPopup } from "@/components/gamification/XPPopup"
import { GlassCard } from "@/components/layout/GlassCard"
import { saveStory } from "@/lib/storybook"
import type { Activity, DifficultyLevel } from "@/types/stage"

interface FillInTheBlankProps {
  activity: Activity
  accentColor?: string
  stageId?: string
  stageName?: string
  onComplete?: (xp: number, difficulty: DifficultyLevel) => void
  onNext?: () => void
}

export function FillInTheBlank({ activity, accentColor = "#00d4ff", stageId = "", stageName = "", onComplete, onNext }: FillInTheBlankProps) {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(activity.difficulty)
  const [values, setValues] = useState<Record<string, string>>({})
  const [output, setOutput] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showXP, setShowXP] = useState(false)
  const [saved, setSaved] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const fields = activity.fields ?? []

  const filledCount = fields.filter((f) => (values[f.key] ?? "").trim().length > 0).length
  const allFilled = filledCount === fields.length
  const progress = fields.length > 0 ? filledCount / fields.length : 0

  const handleChange = useCallback((key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }))
    if (val.trim()) setErrors((prev) => ({ ...prev, [key]: false }))
  }, [])

  const handleSubmit = async () => {
    // Validate
    const newErrors: Record<string, boolean> = {}
    fields.forEach((f) => {
      if (!(values[f.key] ?? "").trim()) newErrors[f.key] = true
    })
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setOutput(null)

    // Build the prompt from template
    let prompt = activity.promptTemplate
    fields.forEach((f) => {
      prompt = prompt.replaceAll(`{${f.key}}`, values[f.key] ?? "")
    })

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          model: activity.model,
          maxTokens: activity.maxTokens,
          activityId: activity.id,
        }),
      })
      const data = await res.json()
      setOutput(data.text ?? "Something went wrong. Try again!")
    } catch {
      setOutput("Oops! Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleOutputComplete = useCallback(() => {
    setShowXP(true)
    onComplete?.(activity.xpReward, difficulty)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity.xpReward, difficulty])

  const handleSave = useCallback(() => {
    if (!output) return
    saveStory({
      activityId: activity.id,
      activityTitle: activity.title,
      stageId,
      stageName,
      content: output,
      fields: values,
      xpEarned: activity.xpReward,
    })
    setSaved(true)
  }, [output, activity.id, activity.title, activity.xpReward, stageId, stageName, values])

  const handleRetry = () => {
    setOutput(null)
    setShowXP(false)
    setSaved(false)
  }

  return (
    <div className="space-y-5">
      {/* Tip */}
      {activity.preTip && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 items-start p-4 rounded-xl"
          style={{
            background: `${accentColor}08`,
            border: `1px solid ${accentColor}20`,
          }}
        >
          <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
          <p className="text-sm font-space" style={{ color: "rgba(255,255,255,0.7)" }}>
            {activity.preTip}
          </p>
        </motion.div>
      )}

      {/* Difficulty selector */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-xs font-orbitron font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
          Difficulty
        </span>
        <DifficultySelector selected={difficulty} onChange={setDifficulty} accentColor={accentColor} />
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs font-orbitron mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
          <span>FIELDS</span>
          <span style={{ color: accentColor }}>{filledCount}/{fields.length}</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`, boxShadow: `0 0 8px ${accentColor}60` }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {fields.map((field, i) => {
          const val = values[field.key] ?? ""
          const isFocused = focusedField === field.key
          const hasError = errors[field.key]
          const isFilled = val.trim().length > 0

          return (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="space-y-1.5"
            >
              {/* Label */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-space font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-orbitron font-bold flex-shrink-0"
                    style={{
                      background: isFilled ? `${accentColor}20` : "rgba(255,255,255,0.06)",
                      border: `1px solid ${isFilled ? accentColor + "50" : "rgba(255,255,255,0.1)"}`,
                      color: isFilled ? accentColor : "rgba(255,255,255,0.4)",
                      transition: "all 0.2s",
                    }}
                  >
                    {isFilled ? "✓" : i + 1}
                  </span>
                  {field.label}
                </label>
                {field.maxLength && (
                  <span className="text-xs font-space" style={{ color: val.length > field.maxLength * 0.8 ? "#ffb800" : "rgba(255,255,255,0.25)" }}>
                    {val.length}/{field.maxLength}
                  </span>
                )}
              </div>

              {/* Input */}
              {(field.maxLength ?? 0) > 80 ? (
                <textarea
                  rows={3}
                  value={val}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  onFocus={() => setFocusedField(field.key)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={field.placeholder}
                  maxLength={field.maxLength}
                  className="w-full input-cyber px-4 py-3 text-sm resize-none"
                  style={
                    isFocused
                      ? { borderColor: `${accentColor}70`, boxShadow: `0 0 0 3px ${accentColor}10, 0 0 20px ${accentColor}15` }
                      : hasError
                      ? { borderColor: "rgba(255,0,64,0.5)" }
                      : {}
                  }
                />
              ) : (
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  onFocus={() => setFocusedField(field.key)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={field.placeholder}
                  className="w-full input-cyber px-4 py-3 text-sm"
                  style={
                    isFocused
                      ? { borderColor: `${accentColor}70`, boxShadow: `0 0 0 3px ${accentColor}10, 0 0 20px ${accentColor}15` }
                      : hasError
                      ? { borderColor: "rgba(255,0,64,0.5)" }
                      : {}
                  }
                />
              )}

              {/* Hint */}
              <AnimatePresence>
                {isFocused && field.hint && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs font-space pl-7"
                    style={{ color: `${accentColor}80` }}
                  >
                    💡 {field.hint}
                  </motion.p>
                )}
                {hasError && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs font-space pl-7"
                    style={{ color: "#ff4060" }}
                  >
                    Fill this in before generating!
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Generate button */}
      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
        className="w-full py-4 rounded-xl font-orbitron font-bold text-sm tracking-wider relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: allFilled
            ? `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`
            : "rgba(255,255,255,0.06)",
          color: allFilled ? "#050510" : "rgba(255,255,255,0.3)",
          border: `1px solid ${allFilled ? accentColor : "rgba(255,255,255,0.1)"}`,
          boxShadow: allFilled ? `0 0 20px ${accentColor}40, 0 0 40px ${accentColor}15` : "none",
          transition: "all 0.3s",
        }}
      >
        {/* Shimmer on active */}
        {allFilled && !loading && (
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s linear infinite",
            }}
          />
        )}
        <span className="relative z-10">
          {loading ? "Generating..." : allFilled ? "✨ Generate with AI" : "Fill all fields to unlock"}
        </span>
      </motion.button>

      {/* AI states */}
      {loading && <AIThinking accentColor={accentColor} />}

      {output && !loading && (
        <div className="space-y-4">
          <AIOutput
            text={output}
            isStreaming={false}
            accentColor={accentColor}
            onComplete={handleOutputComplete}
          />

          {/* Actions after output */}
          <AnimatePresence>
            {showXP && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-3"
              >
                {activity.allowRetry && (
                  <button
                    onClick={handleRetry}
                    className="flex-1 py-3 rounded-xl text-sm font-orbitron font-bold btn-cyber-cyan"
                  >
                    🔄 Try Again
                  </button>
                )}
                <button
                  onClick={handleSave}
                  disabled={saved}
                  className="flex-1 py-3 rounded-xl text-sm font-orbitron font-bold transition-all"
                  style={
                    saved
                      ? { background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.3)", color: "#00ff88" }
                      : { background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, color: "#050510", boxShadow: `0 0 15px ${accentColor}40` }
                  }
                >
                  {saved ? "✅ Saved!" : "📖 Save to Story Book"}
                </button>
                {onNext && (
                  <button
                    onClick={onNext}
                    className="w-full py-3 rounded-xl text-sm font-orbitron font-bold"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }}
                  >
                    Next Activity →
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* XP popup */}
      <XPPopup xp={activity.xpReward} show={showXP} accentColor={accentColor} />
    </div>
  )
}
