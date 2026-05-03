"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { DifficultyLevel } from "@/types/stage"

interface DifficultySelectorProps {
  selected: DifficultyLevel
  onChange: (d: DifficultyLevel) => void
  accentColor?: string
}

const LEVELS: { id: DifficultyLevel; label: string; emoji: string; desc: string; color: string }[] = [
  { id: "beginner", label: "Beginner",  emoji: "🌱", desc: "Guided & easy",    color: "#00ff88" },
  { id: "explorer", label: "Explorer",  emoji: "🚀", desc: "More creative",    color: "#00d4ff" },
  { id: "pro",      label: "Pro",       emoji: "⚡", desc: "Full challenge",   color: "#ff0080" },
]

export function DifficultySelector({ selected, onChange }: DifficultySelectorProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      {LEVELS.map((lvl) => {
        const active = selected === lvl.id
        return (
          <motion.button
            key={lvl.id}
            onClick={() => onChange(lvl.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-space font-medium transition-all duration-200",
              active
                ? "text-white"
                : "text-white/50 hover:text-white/80"
            )}
            style={
              active
                ? {
                    background: `linear-gradient(135deg, ${lvl.color}20, ${lvl.color}08)`,
                    border: `1px solid ${lvl.color}60`,
                    boxShadow: `0 0 15px ${lvl.color}30, inset 0 0 10px ${lvl.color}05`,
                  }
                : {
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }
            }
          >
            <span className="text-base">{lvl.emoji}</span>
            <div className="flex flex-col items-start leading-none">
              <span
                className="font-orbitron text-xs font-bold tracking-wide"
                style={active ? { color: lvl.color } : {}}
              >
                {lvl.label}
              </span>
              <span className="text-xs mt-0.5 opacity-60">{lvl.desc}</span>
            </div>
            {active && (
              <motion.div
                layoutId="difficulty-indicator"
                className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full"
                style={{ background: lvl.color, boxShadow: `0 0 8px ${lvl.color}` }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
