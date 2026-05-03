"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XPPopup } from "@/components/gamification/XPPopup"
import type { Activity, DifficultyLevel, QuizQuestion } from "@/types/stage"

interface QuizActivityProps {
  activity: Activity
  accentColor?: string
  onComplete?: (xp: number, difficulty: DifficultyLevel) => void
  onNext?: () => void
}

type AnswerState = "unanswered" | "correct" | "wrong"

export function QuizActivity({ activity, accentColor = "#00d4ff", onComplete, onNext }: QuizActivityProps) {
  const questions: QuizQuestion[] = activity.quiz ?? []
  const [answers, setAnswers] = useState<Record<string, number | null>>(
    Object.fromEntries(questions.map((q) => [q.id, null]))
  )
  const [revealed, setRevealed] = useState<Record<string, boolean>>(
    Object.fromEntries(questions.map((q) => [q.id, false]))
  )
  const [submitted, setSubmitted] = useState(false)
  const [showXP, setShowXP] = useState(false)

  const selectAnswer = (qId: string, idx: number) => {
    if (revealed[qId] || submitted) return
    setAnswers((prev) => ({ ...prev, [qId]: idx }))
    setRevealed((prev) => ({ ...prev, [qId]: true }))
  }

  const answeredCount = Object.values(answers).filter((v) => v !== null).length
  const allAnswered = answeredCount === questions.length

  const score = questions.filter((q) => answers[q.id] === q.correctIndex).length
  const scorePct = questions.length > 0 ? score / questions.length : 0

  const earnedXP = Math.round(activity.xpReward * scorePct)

  const handleSubmit = () => {
    // Reveal any un-answered questions
    setRevealed(Object.fromEntries(questions.map((q) => [q.id, true])))
    setSubmitted(true)
    setShowXP(true)
    onComplete?.(earnedXP, activity.difficulty)
  }

  const handleRetry = () => {
    setAnswers(Object.fromEntries(questions.map((q) => [q.id, null])))
    setRevealed(Object.fromEntries(questions.map((q) => [q.id, false])))
    setSubmitted(false)
    setShowXP(false)
  }

  const getOptionState = (q: QuizQuestion, optIdx: number): AnswerState => {
    if (!revealed[q.id]) return "unanswered"
    if (optIdx === q.correctIndex) return "correct"
    if (answers[q.id] === optIdx) return "wrong"
    return "unanswered"
  }

  return (
    <div className="space-y-6">
      {/* Pre-tip */}
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

      {/* Progress header */}
      <div className="flex items-center justify-between text-xs font-orbitron">
        <span style={{ color: "rgba(255,255,255,0.35)" }}>
          {answeredCount}/{questions.length} answered
        </span>
        {submitted && (
          <span style={{ color: scorePct >= 0.7 ? "#00ff88" : scorePct >= 0.4 ? "#ffb800" : "#ff4060" }}>
            Score: {score}/{questions.length} · +{earnedXP} XP
          </span>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qi) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qi * 0.07 }}
            className="space-y-3"
          >
            {/* Question */}
            <p className="font-space font-medium text-white leading-snug">
              <span
                className="inline-block w-6 h-6 rounded-md text-center text-xs font-orbitron font-black mr-2 leading-6"
                style={{ background: `${accentColor}20`, color: accentColor }}
              >
                {qi + 1}
              </span>
              {q.question}
            </p>

            {/* Options */}
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const state = getOptionState(q, oi)
                const isSelected = answers[q.id] === oi
                const isDisabled = revealed[q.id] || submitted

                return (
                  <motion.button
                    key={oi}
                    onClick={() => selectAnswer(q.id, oi)}
                    disabled={isDisabled}
                    whileHover={!isDisabled ? { x: 4 } : {}}
                    whileTap={!isDisabled ? { scale: 0.98 } : {}}
                    className="text-left px-4 py-3 rounded-xl text-sm font-space transition-all w-full relative overflow-hidden"
                    style={
                      state === "correct"
                        ? {
                            background: "rgba(0,255,136,0.12)",
                            border: "1px solid rgba(0,255,136,0.4)",
                            color: "rgba(180,255,220,0.95)",
                          }
                        : state === "wrong"
                        ? {
                            background: "rgba(255,64,96,0.1)",
                            border: "1px solid rgba(255,64,96,0.35)",
                            color: "rgba(255,160,160,0.9)",
                          }
                        : isSelected && !revealed[q.id]
                        ? {
                            background: `${accentColor}12`,
                            border: `1px solid ${accentColor}45`,
                            color: "rgba(255,255,255,0.88)",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: isDisabled ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.75)",
                          }
                    }
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center text-xs font-orbitron font-bold"
                        style={
                          state === "correct"
                            ? { background: "rgba(0,255,136,0.2)", color: "#00ff88" }
                            : state === "wrong"
                            ? { background: "rgba(255,64,96,0.15)", color: "#ff4060" }
                            : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }
                        }
                      >
                        {state === "correct" ? "✓" : state === "wrong" ? "✗" : String.fromCharCode(65 + oi)}
                      </span>
                      {opt}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* Explanation (revealed after answer) */}
            <AnimatePresence>
              {revealed[q.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className="flex gap-2 p-3 rounded-lg"
                    style={
                      answers[q.id] === q.correctIndex
                        ? { background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }
                        : { background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }
                    }
                  >
                    <span className="text-sm flex-shrink-0">
                      {answers[q.id] === q.correctIndex ? "🎉" : "💡"}
                    </span>
                    <p
                      className="text-xs font-space leading-relaxed"
                      style={
                        answers[q.id] === q.correctIndex
                          ? { color: "rgba(150,255,200,0.9)" }
                          : { color: "rgba(150,220,255,0.9)" }
                      }
                    >
                      {q.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Score result card (after submit) */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="rounded-2xl p-6 text-center"
            style={{
              background:
                scorePct >= 0.7
                  ? "rgba(0,255,136,0.06)"
                  : scorePct >= 0.4
                  ? "rgba(255,184,0,0.06)"
                  : "rgba(255,64,96,0.06)",
              border: `1px solid ${
                scorePct >= 0.7
                  ? "rgba(0,255,136,0.25)"
                  : scorePct >= 0.4
                  ? "rgba(255,184,0,0.25)"
                  : "rgba(255,64,96,0.25)"
              }`,
            }}
          >
            <div className="text-4xl mb-2">
              {scorePct === 1 ? "🏆" : scorePct >= 0.7 ? "🎉" : scorePct >= 0.4 ? "💪" : "🔄"}
            </div>
            <p
              className="text-xl font-orbitron font-black mb-1"
              style={{
                color:
                  scorePct >= 0.7 ? "#00ff88" : scorePct >= 0.4 ? "#ffb800" : "#ff6080",
              }}
            >
              {scorePct === 1
                ? "Perfect Score!"
                : scorePct >= 0.7
                ? "Great Work!"
                : scorePct >= 0.4
                ? "Good Effort!"
                : "Keep Trying!"}
            </p>
            <p className="text-sm font-space mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              {score} out of {questions.length} correct · earned {earnedXP} XP
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              {activity.allowRetry && (
                <button
                  onClick={handleRetry}
                  className="px-6 py-2.5 rounded-xl text-sm font-orbitron font-bold"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  🔄 Try Again
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className="px-6 py-2.5 rounded-xl text-sm font-orbitron font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                    color: "#050510",
                    boxShadow: `0 0 15px ${accentColor}40`,
                  }}
                >
                  Next Activity →
                </button>
              )}
              {!onNext && (
                <button
                  className="px-6 py-2.5 rounded-xl text-sm font-orbitron font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                    color: "#050510",
                    boxShadow: `0 0 15px ${accentColor}40`,
                  }}
                >
                  ✅ Done
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit button — shown before submitting, once all answered */}
      {!submitted && (
        <motion.button
          onClick={handleSubmit}
          disabled={!allAnswered}
          whileHover={allAnswered ? { scale: 1.02 } : {}}
          whileTap={allAnswered ? { scale: 0.98 } : {}}
          className="w-full py-4 rounded-xl font-orbitron font-bold text-sm tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: allAnswered
              ? `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`
              : "rgba(255,255,255,0.06)",
            color: allAnswered ? "#050510" : "rgba(255,255,255,0.3)",
            border: `1px solid ${allAnswered ? accentColor : "rgba(255,255,255,0.1)"}`,
            boxShadow: allAnswered ? `0 0 20px ${accentColor}40` : "none",
            transition: "all 0.3s",
          }}
        >
          {allAnswered ? "🎯 Submit Answers" : `Answer all ${questions.length} questions to submit`}
        </motion.button>
      )}

      {/* XP popup */}
      <XPPopup xp={earnedXP} show={showXP} accentColor={accentColor} />
    </div>
  )
}
