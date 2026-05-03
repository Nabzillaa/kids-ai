"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AIOutputProps {
  text: string | null
  isStreaming: boolean
  accentColor?: string
  onComplete?: () => void
}

// Typewriter effect — streams text character by character
export function AIOutput({ text, isStreaming, accentColor = "#00d4ff", onComplete }: AIOutputProps) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Stable ref so the typewriter effect never re-runs just because onComplete changed
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  const startTypewriter = useCallback((str: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    indexRef.current = 0
    setDisplayed("")
    setDone(false)

    const tick = () => {
      if (indexRef.current < str.length) {
        indexRef.current = Math.min(indexRef.current + 2, str.length)
        setDisplayed(str.slice(0, indexRef.current))
        timerRef.current = setTimeout(tick, 12)
      } else {
        setDone(true)
        onCompleteRef.current?.()
      }
    }

    timerRef.current = setTimeout(tick, 200)
  }, [])

  useEffect(() => {
    if (!text) { setDisplayed(""); setDone(false); return }
    startTypewriter(text)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [text, startTypewriter])

  if (!text && !isStreaming) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accentColor}06, ${accentColor}02)`,
          border: `1px solid ${accentColor}25`,
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-0.5 w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />

        {/* Header */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: `${accentColor}15` }}
        >
          <div className="flex gap-1.5">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ background: accentColor }}
                animate={isStreaming || !done ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.2, repeat: isStreaming || !done ? Infinity : 0 }}
              />
            ))}
          </div>
          <span
            className="text-xs font-orbitron font-bold tracking-widest uppercase"
            style={{ color: accentColor }}
          >
            AI Output
          </span>
          {done && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto text-xs font-space px-2 py-0.5 rounded-full"
              style={{
                background: `${accentColor}15`,
                color: accentColor,
                border: `1px solid ${accentColor}30`,
              }}
            >
              ✓ Complete
            </motion.span>
          )}
        </div>

        {/* Output text */}
        <div className="p-5">
          <p
            className={cn(
              "text-base font-space leading-relaxed whitespace-pre-wrap",
              !done && "cursor-blink"
            )}
            style={{ color: "rgba(255,255,255,0.88)" }}
          >
            {displayed}
          </p>
        </div>

        {/* Scan line while streaming */}
        {(isStreaming || !done) && text && (
          <div
            className="absolute left-0 right-0 h-8 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, ${accentColor}08, transparent)`,
              animation: "scan 2s linear infinite",
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

// AI thinking / loading state
export function AIThinking({ accentColor = "#00d4ff" }: { accentColor?: string }) {
  return (
    <div
      className="rounded-2xl p-6 flex items-center gap-4"
      style={{
        background: `${accentColor}06`,
        border: `1px solid ${accentColor}20`,
      }}
    >
      {/* Pulsing brain icon */}
      <div className="relative flex-shrink-0">
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}30` }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🤖
        </motion.div>
        {/* Ripple */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-xl border"
            style={{ borderColor: `${accentColor}40` }}
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }}
          />
        ))}
      </div>

      <div>
        <p className="text-sm font-orbitron font-bold mb-1" style={{ color: accentColor }}>
          AI is thinking...
        </p>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: accentColor }}
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
              transition={{ duration: 0.8, delay: i * 0.12, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
