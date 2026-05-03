"use client"

import { motion } from "framer-motion"

interface XPBarProps {
  current: number
  max: number
  label?: string
  accentColor?: string
  showNumbers?: boolean
}

export function XPBar({ current, max, label = "Stage Progress", accentColor = "#00d4ff", showNumbers = true }: XPBarProps) {
  const pct = Math.min(100, (current / max) * 100)

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-orbitron font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
          {label}
        </span>
        {showNumbers && (
          <span className="text-xs font-space font-medium" style={{ color: accentColor }}>
            {current.toLocaleString()} / {max.toLocaleString()} XP
          </span>
        )}
      </div>

      {/* Track */}
      <div
        className="relative h-3 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Fill */}
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accentColor}cc, ${accentColor})`,
            boxShadow: `0 0 10px ${accentColor}60, 0 0 20px ${accentColor}30`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Shimmer overlay on the fill */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["-200% center", "200% center"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Milestone markers */}
      <div className="relative h-1">
        {[25, 50, 75].map((milestone) => (
          <div
            key={milestone}
            className="absolute top-0 w-px h-1"
            style={{
              left: `${milestone}%`,
              background: pct >= milestone ? `${accentColor}80` : "rgba(255,255,255,0.1)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  )
}
