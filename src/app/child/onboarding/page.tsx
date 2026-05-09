"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { saveProfile } from "@/lib/profile"
import type { AgeGroup, Experience } from "@/types/profile"

const AnimatedBackground = dynamic(
  () => import("@/components/layout/AnimatedBackground").then((m) => m.AnimatedBackground),
  { ssr: false }
)

const ACCENT = "#ffb800"

const ALL_INTERESTS = [
  { emoji: "🦁", label: "Animals",   key: "animals" },
  { emoji: "⚽", label: "Sports",    key: "sports" },
  { emoji: "🎮", label: "Gaming",    key: "gaming" },
  { emoji: "🎨", label: "Art",       key: "art" },
  { emoji: "🔬", label: "Science",   key: "science" },
  { emoji: "🎵", label: "Music",     key: "music" },
  { emoji: "🚀", label: "Space",     key: "space" },
  { emoji: "🍕", label: "Food",      key: "food" },
  { emoji: "🎬", label: "Movies",    key: "movies" },
  { emoji: "🌿", label: "Nature",    key: "nature" },
  { emoji: "🚗", label: "Cars",      key: "cars" },
  { emoji: "📚", label: "Books",     key: "books" },
]

const AGE_OPTIONS: { label: string; value: AgeGroup; emoji: string }[] = [
  { label: "7 or 8",       value: "7-8",   emoji: "🌱" },
  { label: "9 or 10",      value: "9-10",  emoji: "🌿" },
  { label: "11 or 12",     value: "11-12", emoji: "🌳" },
  { label: "13 or older",  value: "13+",   emoji: "🚀" },
]

const EXP_OPTIONS: { label: string; sub: string; value: Experience; emoji: string }[] = [
  { label: "Never tried it!",   sub: "This will be my first time!",       value: "none", emoji: "🌱" },
  { label: "A little bit!",     sub: "I've played around with code before", value: "some", emoji: "🌿" },
  { label: "I code a lot!",     sub: "HTML, CSS, JS — I know my stuff!",   value: "lots", emoji: "🌳" },
]

const BYTE_MESSAGES: Record<number, string> = {
  0: "Hi! I'm Byte 🤖 — your AI coding buddy. Before we start building something amazing, I'd love to get to know you a little bit!",
  1: "Give me a name to call you by. You can skip this if you want!",
  2: "This helps me pitch things at just the right level for you!",
  3: "Don't worry if the answer is no — everyone starts somewhere, and I'll guide you either way!",
  4: "Pick as many as you like — this helps me suggest cool topics for your projects!",
  5: "",  // filled dynamically
}

function getReadyMessage(name: string | undefined, experience: Experience): string {
  const n = name ? `${name}` : "there"
  if (experience === "none")
    return `I'll guide you through every single step, ${n} — we'll learn prompting and coding together! By the end you'll have a real webpage!`
  if (experience === "some")
    return `I'll give you a quick tour of the builder, ${n}, then you're free to experiment. You'll be building in no time!`
  return `I'll show you how the builder works, ${n}, then I'll get out of your way. You've got this!`
}

const slide = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -40 },
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  // Answers
  const [name, setName]           = useState("")
  const [ageGroup, setAgeGroup]   = useState<AgeGroup | null>(null)
  const [experience, setExperience] = useState<Experience | null>(null)
  const [interests, setInterests] = useState<string[]>([])

  const totalSteps = 6
  const progressPct = Math.round((step / (totalSteps - 1)) * 100)

  const canContinue = {
    0: true,
    1: true,       // name is optional
    2: ageGroup !== null,
    3: experience !== null,
    4: interests.length > 0,
    5: true,
  }[step] ?? true

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1))

  const toggleInterest = (key: string) =>
    setInterests((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )

  const finish = () => {
    saveProfile({
      name:         name.trim() || undefined,
      ageGroup:     ageGroup!,
      experience:   experience!,
      interests,
      tutorialDone: false,
      createdAt:    new Date().toISOString(),
    })
    router.push("/child/build/stage-1")
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Progress bar */}
        <div className="h-1 w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            className="h-full"
            style={{ background: ACCENT }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Byte header — always visible */}
        <div className="flex justify-center pt-8 pb-2">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-6xl select-none"
          >
            🤖
          </motion.div>
        </div>

        {/* Byte speech bubble */}
        <div className="flex justify-center px-4 mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`byte-msg-${step}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="max-w-md text-center text-sm font-space leading-relaxed px-4 py-3 rounded-2xl"
              style={{
                background: "rgba(255,184,0,0.08)",
                border: `1px solid ${ACCENT}25`,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {step === 5 && experience
                ? getReadyMessage(name.trim() || undefined, experience)
                : BYTE_MESSAGES[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step content */}
        <div className="flex-1 flex flex-col items-center justify-start px-4 pb-12">
          <div className="w-full max-w-xl">
            <AnimatePresence mode="wait">

              {/* ── Step 0: Welcome ── */}
              {step === 0 && (
                <motion.div key="s0" {...slide} className="text-center space-y-6">
                  <div>
                    <h1 className="text-3xl font-orbitron font-black text-white mb-2">
                      Welcome to Cyber Academy!
                    </h1>
                    <p className="font-space text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
                      Where kids learn to build with AI and code.
                    </p>
                  </div>
                  <button onClick={next} className="w-full py-4 rounded-2xl font-orbitron font-black text-base" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)`, color: "#050510" }}>
                    Let&apos;s go! →
                  </button>
                </motion.div>
              )}

              {/* ── Step 1: Name ── */}
              {step === 1 && (
                <motion.div key="s1" {...slide} className="space-y-6">
                  <h2 className="text-2xl font-orbitron font-black text-white text-center">
                    What should I call you?
                  </h2>
                  <input
                    type="text"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && next()}
                    placeholder="Your name... e.g. Alex, Sam, Jordan"
                    className="w-full px-5 py-4 rounded-2xl text-lg font-space outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `2px solid ${name ? ACCENT : "rgba(255,255,255,0.12)"}`,
                      color: "white",
                      caretColor: ACCENT,
                    }}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={next}
                      className="flex-shrink-0 px-6 py-3.5 rounded-2xl font-orbitron font-bold text-sm"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
                    >
                      Skip
                    </button>
                    <button
                      onClick={next}
                      className="flex-1 py-3.5 rounded-2xl font-orbitron font-black text-sm"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)`, color: "#050510" }}
                    >
                      {name.trim() ? `Nice to meet you, ${name.trim().split(" ")[0]}! →` : "Continue →"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 2: Age ── */}
              {step === 2 && (
                <motion.div key="s2" {...slide} className="space-y-5">
                  <h2 className="text-2xl font-orbitron font-black text-white text-center">
                    How old are you?
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {AGE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setAgeGroup(opt.value); setTimeout(next, 180) }}
                        className="p-5 rounded-2xl text-center transition-all duration-150"
                        style={
                          ageGroup === opt.value
                            ? { background: `${ACCENT}20`, border: `2px solid ${ACCENT}`, boxShadow: `0 0 20px ${ACCENT}25` }
                            : { background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.1)" }
                        }
                      >
                        <div className="text-4xl mb-2">{opt.emoji}</div>
                        <p className="font-orbitron font-bold text-sm" style={{ color: ageGroup === opt.value ? ACCENT : "white" }}>
                          {opt.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Experience ── */}
              {step === 3 && (
                <motion.div key="s3" {...slide} className="space-y-5">
                  <h2 className="text-2xl font-orbitron font-black text-white text-center">
                    Have you ever made a website or written code?
                  </h2>
                  <div className="space-y-3">
                    {EXP_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setExperience(opt.value); setTimeout(next, 180) }}
                        className="w-full p-4 rounded-2xl text-left transition-all duration-150 flex items-center gap-4"
                        style={
                          experience === opt.value
                            ? { background: `${ACCENT}18`, border: `2px solid ${ACCENT}` }
                            : { background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.1)" }
                        }
                      >
                        <span className="text-3xl">{opt.emoji}</span>
                        <div>
                          <p className="font-orbitron font-bold text-sm" style={{ color: experience === opt.value ? ACCENT : "white" }}>
                            {opt.label}
                          </p>
                          <p className="text-xs font-space mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {opt.sub}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Step 4: Interests ── */}
              {step === 4 && (
                <motion.div key="s4" {...slide} className="space-y-5">
                  <h2 className="text-2xl font-orbitron font-black text-white text-center">
                    What are you into?
                  </h2>
                  <p className="text-sm font-space text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Pick as many as you like!
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {ALL_INTERESTS.map((item) => {
                      const on = interests.includes(item.key)
                      return (
                        <button
                          key={item.key}
                          onClick={() => toggleInterest(item.key)}
                          className="p-3 rounded-xl text-center transition-all duration-150"
                          style={
                            on
                              ? { background: `${ACCENT}18`, border: `2px solid ${ACCENT}` }
                              : { background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.08)" }
                          }
                        >
                          <div className="text-2xl mb-1">{item.emoji}</div>
                          <p className="text-xs font-orbitron font-bold" style={{ color: on ? ACCENT : "rgba(255,255,255,0.7)" }}>
                            {item.label}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                  <button
                    onClick={next}
                    disabled={interests.length === 0}
                    className="w-full py-4 rounded-2xl font-orbitron font-black text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)`, color: "#050510" }}
                  >
                    {interests.length === 0 ? "Pick at least one!" : `Continue with ${interests.length} interest${interests.length > 1 ? "s" : ""} →`}
                  </button>
                </motion.div>
              )}

              {/* ── Step 5: Ready ── */}
              {step === 5 && (
                <motion.div key="s5" {...slide} className="space-y-6 text-center">
                  <div>
                    <div className="text-6xl mb-3">🎉</div>
                    <h2 className="text-3xl font-orbitron font-black text-white mb-2">
                      {name.trim() ? `You're all set, ${name.trim().split(" ")[0]}!` : "You're all set!"}
                    </h2>

                    {/* Summary card */}
                    <div
                      className="mt-5 p-4 rounded-2xl text-left space-y-2"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      {name.trim() && (
                        <div className="flex items-center gap-2 text-sm font-space">
                          <span>👤</span>
                          <span style={{ color: "rgba(255,255,255,0.6)" }}>Name:</span>
                          <span className="font-bold text-white">{name.trim()}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm font-space">
                        <span>🎂</span>
                        <span style={{ color: "rgba(255,255,255,0.6)" }}>Age:</span>
                        <span className="font-bold text-white">{ageGroup}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-space">
                        <span>💻</span>
                        <span style={{ color: "rgba(255,255,255,0.6)" }}>Experience:</span>
                        <span className="font-bold text-white">
                          {experience === "none" ? "First timer!" : experience === "some" ? "Some experience" : "I code a lot!"}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm font-space">
                        <span>❤️</span>
                        <span style={{ color: "rgba(255,255,255,0.6)" }}>Into:</span>
                        <span className="font-bold text-white">{interests.map((k) => ALL_INTERESTS.find((i) => i.key === k)?.label).join(", ")}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={finish}
                    className="w-full py-4 rounded-2xl font-orbitron font-black text-base"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)`,
                      color: "#050510",
                      boxShadow: `0 0 30px ${ACCENT}35`,
                    }}
                  >
                    Let&apos;s build! 🚀
                  </button>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Back button */}
            {step > 0 && step < 5 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="text-sm font-space"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  ← Back
                </button>
              </div>
            )}

            {/* Step dots */}
            <div className="flex justify-center gap-1.5 mt-8">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === step ? "20px" : "6px",
                    height: "6px",
                    background: i <= step ? ACCENT : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
