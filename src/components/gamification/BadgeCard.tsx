"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Badge } from "@/types/stage"

interface BadgeCardProps {
  badge: Badge
  earned: boolean
  accentColor?: string
  size?: "sm" | "md" | "lg"
}

export function BadgeCard({ badge, earned, accentColor = "#00d4ff", size = "md" }: BadgeCardProps) {
  const sizes = {
    sm: { outer: "w-14 h-14", emoji: "text-2xl", name: "text-xs" },
    md: { outer: "w-20 h-20", emoji: "text-3xl", name: "text-xs" },
    lg: { outer: "w-28 h-28", emoji: "text-5xl", name: "text-sm" },
  }

  const s = sizes[size]

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className={cn("relative rounded-2xl flex items-center justify-center", s.outer)}
        whileHover={earned ? { scale: 1.08 } : {}}
        style={
          earned
            ? {
                background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}08)`,
                border: `1px solid ${accentColor}50`,
                boxShadow: `0 0 20px ${accentColor}30, inset 0 0 15px ${accentColor}05`,
              }
            : {
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                filter: "grayscale(100%)",
              }
        }
      >
        <span className={cn(s.emoji, !earned && "opacity-25")}>{badge.emoji}</span>

        {/* Glow pulse for earned */}
        {earned && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ border: `1px solid ${accentColor}` }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Lock icon if not earned */}
        {!earned && (
          <div className="absolute inset-0 flex items-end justify-end p-1.5">
            <span className="text-sm opacity-30">🔒</span>
          </div>
        )}
      </motion.div>

      <div className="text-center">
        <p
          className={cn(s.name, "font-orbitron font-bold leading-tight")}
          style={{ color: earned ? accentColor : "rgba(255,255,255,0.25)" }}
        >
          {badge.name}
        </p>
        {size !== "sm" && (
          <p className="text-xs font-space mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
            {badge.description}
          </p>
        )}
      </div>
    </div>
  )
}

// Full-screen badge unlock celebration
export function BadgeUnlockOverlay({ badge, onDismiss, accentColor = "#00d4ff" }: { badge: Badge; onDismiss: () => void; accentColor?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(5,5,16,0.92)", backdropFilter: "blur(10px)" }}
      onClick={onDismiss}
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex flex-col items-center gap-6 p-10 rounded-3xl max-w-sm mx-4"
        style={{
          background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`,
          border: `1px solid ${accentColor}50`,
          boxShadow: `0 0 60px ${accentColor}40, 0 0 120px ${accentColor}15`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Badge */}
        <motion.div
          className="w-36 h-36 rounded-3xl flex items-center justify-center text-6xl"
          style={{
            background: `linear-gradient(135deg, ${accentColor}25, ${accentColor}08)`,
            border: `2px solid ${accentColor}60`,
            boxShadow: `0 0 40px ${accentColor}50`,
          }}
          animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {badge.emoji}
        </motion.div>

        {/* Text */}
        <div className="text-center space-y-2">
          <p className="text-xs font-orbitron font-bold tracking-widest uppercase" style={{ color: accentColor }}>
            Badge Unlocked!
          </p>
          <h2 className="text-2xl font-orbitron font-black text-white">{badge.name}</h2>
          <p className="text-sm font-space" style={{ color: "rgba(255,255,255,0.6)" }}>
            {badge.description}
          </p>
        </div>

        <button
          onClick={onDismiss}
          className="px-8 py-3 rounded-xl font-orbitron font-bold text-sm"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
            color: "#050510",
            boxShadow: `0 0 20px ${accentColor}40`,
          }}
        >
          Awesome! ✨
        </button>
      </motion.div>
    </motion.div>
  )
}
