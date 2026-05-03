"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StageHeaderProps {
  stageNumber: number
  stageName: string
  tagline: string
  mascot: string
  accentColor: string   // hex e.g. "#ff0080"
  xp: number
  maxXP: number
}

export function StageHeader({
  stageNumber,
  stageName,
  tagline,
  mascot,
  accentColor,
  xp,
  maxXP,
}: StageHeaderProps) {
  const pct = Math.min(100, Math.round((xp / maxXP) * 100))

  return (
    <div className="relative w-full py-8 px-6">
      {/* Accent glow behind header */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[120px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${accentColor}20 0%, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />

      <div className="relative flex items-center gap-6 max-w-4xl mx-auto">
        {/* Mascot */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          className="relative flex-shrink-0"
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl animate-float"
            style={{
              background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}08)`,
              border: `1px solid ${accentColor}40`,
              boxShadow: `0 0 20px ${accentColor}30, inset 0 0 20px ${accentColor}05`,
            }}
          >
            {mascot}
          </div>
          {/* Stage number badge */}
          <div
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-orbitron"
            style={{
              background: accentColor,
              color: "#050510",
              boxShadow: `0 0 10px ${accentColor}80`,
            }}
          >
            {stageNumber}
          </div>
        </motion.div>

        {/* Title block */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1"
        >
          <div className="flex items-baseline gap-3 mb-1">
            <span
              className="text-xs font-orbitron font-bold tracking-widest uppercase"
              style={{ color: accentColor }}
            >
              Stage {stageNumber}
            </span>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${accentColor}40, transparent)` }} />
          </div>
          <h1
            className="text-3xl font-orbitron font-black mb-1"
            style={{ color: accentColor, textShadow: `0 0 20px ${accentColor}60` }}
          >
            {stageName}
          </h1>
          <p className="text-sm font-space" style={{ color: "rgba(255,255,255,0.55)" }}>
            {tagline}
          </p>
        </motion.div>

        {/* XP display */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-shrink-0 text-right hidden sm:block"
        >
          <div className="text-xs font-orbitron mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            STAGE XP
          </div>
          <div className="text-2xl font-orbitron font-bold text-neon-gold">
            {xp.toLocaleString()}
          </div>
          <div className="text-xs font-space mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
            / {maxXP.toLocaleString()}
          </div>
          {/* Mini progress bar */}
          <div className="mt-2 w-32 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`, boxShadow: `0 0 8px ${accentColor}60` }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
