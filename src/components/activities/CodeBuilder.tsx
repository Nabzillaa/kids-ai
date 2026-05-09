"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Activity, DifficultyLevel } from "@/types/stage"
import { XPPopup } from "@/components/gamification/XPPopup"

interface Props {
  activity: Activity
  accentColor: string
  stageId: string
  onComplete: (xp: number, difficulty: DifficultyLevel) => void
  onNext?: () => void
}

export function CodeBuilder({ activity, accentColor, onComplete, onNext }: Props) {
  const [code, setCode] = useState(activity.starterCode ?? "")
  const [aiHelp, setAiHelp] = useState("")
  const [loadingHelp, setLoadingHelp] = useState(false)
  const [done, setDone] = useState(false)
  const [xpPopup, setXpPopup] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.max(el.scrollHeight, 240)}px`
  }, [code])

  const handleTabKey = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Tab") return
    e.preventDefault()
    const el = e.currentTarget
    const start = el.selectionStart
    const end = el.selectionEnd
    const newCode = code.substring(0, start) + "  " + code.substring(end)
    setCode(newCode)
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + 2
    })
  }, [code])

  const askAI = async () => {
    setLoadingHelp(true)
    setAiHelp("")
    try {
      const goal = activity.buildGoal ?? activity.description
      const step = activity.buildInstructions?.[activeStep] ?? goal
      const prompt =
        `A child (age 7-15) is learning to code and needs a helpful hint.\n\n` +
        `Their goal: ${goal}\n` +
        `Current step: ${step}\n\n` +
        `Their current code:\n${code || "(empty)"}\n\n` +
        `Give ONE friendly hint that nudges them in the right direction — don't give the answer away. ` +
        `Use simple words. Keep it to 2-3 sentences. Be encouraging!`

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: "lightweight", maxTokens: 150 }),
      })
      const data = await res.json()
      setAiHelp(data.text ?? "Try reading the instructions again and look at your starter code carefully!")
    } catch {
      setAiHelp("Hmm, I couldn't load a hint right now. Read the instructions carefully — you've got this!")
    } finally {
      setLoadingHelp(false)
    }
  }

  const markDone = () => {
    if (done) return
    setDone(true)
    setXpPopup(true)
    onComplete(activity.xpReward, activity.difficulty)
    setTimeout(() => setXpPopup(false), 2200)
  }

  const steps = activity.buildInstructions ?? []

  return (
    <div className="space-y-5">
      {/* Goal banner */}
      <div className="p-4 rounded-xl text-sm font-space leading-relaxed"
        style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}25`, color: "rgba(255,255,255,0.8)" }}>
        <span className="font-bold" style={{ color: accentColor }}>🎯 Goal: </span>
        {activity.buildGoal ?? activity.description}
      </div>

      {/* Step-by-step instructions */}
      {steps.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-orbitron font-bold tracking-widest uppercase" style={{ color: accentColor }}>
            Steps
          </p>
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className="w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all duration-150"
              style={
                activeStep === i
                  ? { background: `${accentColor}18`, border: `1px solid ${accentColor}40` }
                  : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }
              }
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-orbitron font-black flex-shrink-0 mt-0.5"
                style={
                  activeStep === i
                    ? { background: accentColor, color: "#050510" }
                    : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }
                }
              >
                {i + 1}
              </span>
              <span
                className="text-sm font-space"
                style={{ color: activeStep === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)" }}
              >
                {step}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Editor + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code editor */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "rgba(0,0,0,0.4)" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
            </div>
            <span className="text-xs font-orbitron font-bold ml-1" style={{ color: "rgba(255,255,255,0.35)" }}>
              {activity.language?.toUpperCase() ?? "HTML"} EDITOR
            </span>
          </div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleTabKey}
            spellCheck={false}
            className="w-full p-4 text-sm font-mono resize-none focus:outline-none"
            style={{
              background: "#0d0d1a",
              color: "#e2e8f0",
              minHeight: "240px",
              lineHeight: "1.7",
              tabSize: 2,
            }}
            placeholder="Write your code here..."
          />
        </div>

        {/* Live preview */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "rgba(0,0,0,0.4)" }}>
            <div className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
            <span className="text-xs font-orbitron font-bold" style={{ color: "rgba(255,255,255,0.35)" }}>
              LIVE PREVIEW
            </span>
          </div>
          <iframe
            srcDoc={code || "<body style='font-family:sans-serif;padding:16px;color:#aaa'>Your preview will appear here...</body>"}
            sandbox="allow-scripts"
            className="w-full"
            style={{ minHeight: "278px", background: "white", border: "none" }}
            title="Live preview"
          />
        </div>
      </div>

      {/* AI Help */}
      <div className="space-y-3">
        <button
          onClick={askAI}
          disabled={loadingHelp}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-orbitron font-bold transition-all duration-150"
          style={{
            background: loadingHelp ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: loadingHelp ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.7)",
          }}
        >
          {loadingHelp ? (
            <><span className="animate-spin">⟳</span> Thinking...</>
          ) : (
            <>🤖 I'm Stuck — Give Me a Hint</>
          )}
        </button>

        <AnimatePresence>
          {aiHelp && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-xl text-sm font-space leading-relaxed"
              style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: "rgba(255,255,255,0.8)" }}
            >
              <span className="font-bold" style={{ color: "#00d4ff" }}>💡 Hint: </span>
              {aiHelp}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Complete / Next */}
      <div className="flex gap-3">
        {!done ? (
          <button
            onClick={markDone}
            className="flex-1 py-3.5 rounded-xl font-orbitron font-bold text-sm tracking-wider transition-all duration-150"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
              color: "#050510",
              boxShadow: `0 0 20px ${accentColor}35`,
            }}
          >
            ✓ I Built It! Mark Complete
          </button>
        ) : (
          <div className="flex-1 flex items-center gap-3">
            <div
              className="flex-1 py-3.5 rounded-xl font-orbitron font-bold text-sm text-center"
              style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00ff88" }}
            >
              ✓ Complete! +{activity.xpReward} XP
            </div>
            {onNext && (
              <button
                onClick={onNext}
                className="px-5 py-3.5 rounded-xl font-orbitron font-bold text-sm"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
              >
                Next →
              </button>
            )}
          </div>
        )}
      </div>

      <XPPopup xp={activity.xpReward} show={xpPopup} />
    </div>
  )
}
