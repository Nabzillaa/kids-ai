"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface XPPopupProps {
  xp: number
  show: boolean
  accentColor?: string
}

export function XPPopup({ xp, show, accentColor = "#ffb800" }: XPPopupProps) {
  const confettiRef = useRef(false)

  useEffect(() => {
    if (show && !confettiRef.current) {
      confettiRef.current = true
      import("canvas-confetti").then(({ default: confetti }) => {
        // Burst from the bottom centre
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8, x: 0.5 },
          colors: [accentColor, "#00d4ff", "#ff0080", "#00ff88", "#ffffff"],
          disableForReducedMotion: true,
        })
      })
    }
    if (!show) confettiRef.current = false
  }, [show, accentColor])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}08)`,
              border: `1px solid ${accentColor}60`,
              boxShadow: `0 0 30px ${accentColor}40, 0 0 60px ${accentColor}15`,
              backdropFilter: "blur(20px)",
            }}
          >
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              ⚡
            </motion.span>
            <div>
              <p className="text-xs font-orbitron font-bold tracking-widest uppercase" style={{ color: accentColor }}>
                XP Earned!
              </p>
              <p className="text-2xl font-orbitron font-black" style={{ color: accentColor, textShadow: `0 0 20px ${accentColor}` }}>
                +{xp}
              </p>
            </div>
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              🌟
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
