"use client"

import { motion } from "framer-motion"

interface StreakCounterProps {
  streak: number
  accentColor?: string
}

export function StreakCounter({ streak, accentColor = "#ff6b35" }: StreakCounterProps) {
  const isOnFire = streak >= 3

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-default"
      style={{
        background: isOnFire
          ? "linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,184,0,0.08))"
          : "rgba(255,255,255,0.05)",
        border: `1px solid ${isOnFire ? "rgba(255,107,53,0.4)" : "rgba(255,255,255,0.1)"}`,
        boxShadow: isOnFire ? "0 0 15px rgba(255,107,53,0.2)" : "none",
      }}
    >
      <motion.span
        className="text-xl"
        animate={isOnFire ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        🔥
      </motion.span>
      <div>
        <p className="text-lg font-orbitron font-black leading-none" style={{ color: isOnFire ? "#ff6b35" : "rgba(255,255,255,0.4)" }}>
          {streak}
        </p>
        <p className="text-xs font-space" style={{ color: "rgba(255,255,255,0.35)" }}>
          day streak
        </p>
      </div>
    </motion.div>
  )
}
