"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"
const AnimatedBackground = dynamic(
  () => import("@/components/layout/AnimatedBackground").then((m) => m.AnimatedBackground),
  { ssr: false }
)
import { GlassCard } from "@/components/layout/GlassCard"
import { XPBar } from "@/components/gamification/XPBar"
import { StreakCounter } from "@/components/gamification/StreakCounter"
import { stages } from "@/stages"

const STAGE_COLORS: Record<number, string> = {
  1: "#ffb800",
  2: "#ff0080",
  3: "#00d4ff",
  4: "#00ff88",
  5: "#7c3aed",
  6: "#ff6b35",
  7: "#00d4ff",
  8: "#a855f7",
}

const COMING_SOON = [
  { n: 3, name: "AI Creators",    mascot: "🐉", ages: "9–10",  tagline: "Chain prompts and use roles to build bigger ideas" },
  { n: 4, name: "AI Engineers",   mascot: "🦅", ages: "10–11", tagline: "Structure your prompts like a pro engineer" },
  { n: 5, name: "AI Innovators",  mascot: "🚀", ages: "11–12", tagline: "Build real workflows and understand AI ethics" },
  { n: 6, name: "AI Designers",   mascot: "🎨", ages: "12–13", tagline: "Direct text, images, and audio like a creative director" },
  { n: 7, name: "AI Developers",  mascot: "💻", ages: "13–14", tagline: "Use AI to write, debug, and ship code" },
  { n: 8, name: "AI Architects",  mascot: "🏛️", ages: "14–15", tagline: "Design and build complete AI-powered products" },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="min-h-screen" suppressHydrationWarning />
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10 space-y-12">

        {/* Hero */}
        <section className="text-center space-y-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-orbitron font-bold tracking-widest uppercase"
              style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)", color: "#00d4ff" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse-slow" />
              Cyber Academy — Beta
            </div>

            <h1 className="text-5xl sm:text-6xl font-orbitron font-black leading-tight mb-4">
              <span className="text-shimmer">Learn AI.</span>
              <br />
              <span className="text-white/90">Build Anything.</span>
            </h1>

            <p className="text-lg font-space max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
              The AI platform for the next generation.
              Master prompting, creativity, and building — from age 7 to 15.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href={`/child/stages/${stages[0].id}`}>
              <button className="btn-solid-cyan px-8 py-3.5 rounded-xl font-orbitron font-bold text-sm tracking-wide">
                Start Stage 1 🚀
              </button>
            </Link>
            <Link href={`/child/stages/${stages[1].id}`}>
              <button className="btn-cyber-pink px-8 py-3.5 rounded-xl font-orbitron font-bold text-sm tracking-wide">
                Stage 2 🔥
              </button>
            </Link>
          </motion.div>
        </section>

        {/* Quick stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-5 flex flex-wrap gap-6 items-center justify-between">
            <div className="flex gap-6 flex-wrap">
              {[
                { label: "Stages",     value: "8",    icon: "🏆" },
                { label: "Activities", value: "160+", icon: "⚡" },
                { label: "Tip Cards",  value: "120",  icon: "💡" },
                { label: "Age Range",  value: "7–15", icon: "🧠" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="text-xl">{stat.icon}</span>
                  <div>
                    <p className="text-xl font-orbitron font-black text-neon-cyan">{stat.value}</p>
                    <p className="text-xs font-space" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <StreakCounter streak={3} />
          </GlassCard>
        </motion.div>

        {/* Stage cards */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2
              className="text-sm font-orbitron font-bold tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Your Journey
            </h2>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>

          <div className="grid gap-4">
            {/* Published stages */}
            {stages.map((stage, i) => {
              const color = STAGE_COLORS[stage.number]
              const isLatest = stage.number === stages.length
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i + 0.5 }}
                >
                  <Link href={`/child/stages/${stage.id}`}>
                    <GlassCard hover className="p-5 group" glow={isLatest}>
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${color}20, ${color}08)`,
                            border: `1px solid ${color}30`,
                          }}
                        >
                          {stage.mascot}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span
                              className="text-xs font-orbitron font-bold tracking-widest uppercase"
                              style={{ color }}
                            >
                              Stage {stage.number}
                            </span>
                            <span
                              className="text-xs font-space px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }}
                            >
                              Ages {stage.ageRange[0]}–{stage.ageRange[1]}
                            </span>
                            {isLatest && (
                              <span
                                className="text-xs font-orbitron font-bold px-2 py-0.5 rounded-full"
                                style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
                              >
                                NEW
                              </span>
                            )}
                          </div>
                          <h3 className="font-orbitron font-bold text-white mb-0.5">{stage.name}</h3>
                          <p className="text-sm font-space truncate" style={{ color: "rgba(255,255,255,0.45)" }}>
                            {stage.tagline}
                          </p>
                        </div>

                        <div className="hidden sm:block flex-shrink-0 text-right">
                          <p className="text-xs font-orbitron mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>XP</p>
                          <p className="text-lg font-orbitron font-black" style={{ color }}>
                            {stage.totalXP.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex-shrink-0 ml-2" style={{ color: "rgba(255,255,255,0.2)" }}>→</div>
                      </div>

                      <div className="mt-3">
                        <XPBar current={0} max={stage.totalXP} accentColor={color} showNumbers={false} label="" />
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              )
            })}

            {/* Coming soon stages */}
            {COMING_SOON.map((info, i) => {
              const color = STAGE_COLORS[info.n]
              return (
                <motion.div
                  key={info.n}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (i + stages.length) + 0.5 }}
                >
                  <GlassCard className="p-5 opacity-40 cursor-not-allowed select-none">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 grayscale"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        {info.mascot}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className="text-xs font-orbitron font-bold tracking-widest uppercase"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                          >
                            Stage {info.n}
                          </span>
                          <span
                            className="text-xs font-space px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.25)" }}
                          >
                            Ages {info.ages}
                          </span>
                          <span
                            className="text-xs font-orbitron font-bold px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}
                          >
                            Coming Soon
                          </span>
                        </div>
                        <h3 className="font-orbitron font-bold" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {info.name}
                        </h3>
                        <p className="text-sm font-space" style={{ color: "rgba(255,255,255,0.2)" }}>
                          {info.tagline}
                        </p>
                      </div>
                      <div className="text-xl flex-shrink-0 opacity-30">🔒</div>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </section>

        <footer className="text-center pb-8 space-y-4">
          <Link href="/child/storybook">
            <button className="px-6 py-2.5 rounded-xl text-sm font-orbitron font-bold transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
              📖 My Story Book
            </button>
          </Link>
          <p className="text-xs font-space" style={{ color: "rgba(255,255,255,0.2)" }}>
            Cyber Academy — Built with imagination and AI ✨
          </p>
        </footer>
      </div>
    </div>
  )
}
