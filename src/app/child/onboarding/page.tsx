"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { saveProfile } from "@/lib/profile"
import type { AgeGroup } from "@/types/profile"

const AnimatedBackground = dynamic(
  () => import("@/components/layout/AnimatedBackground").then((m) => m.AnimatedBackground),
  { ssr: false }
)

const ACCENT = "#ffb800"

const ALL_INTERESTS = [
  { emoji: "🦁", label: "Animals",  key: "animals"  },
  { emoji: "⚽", label: "Sports",   key: "sports"   },
  { emoji: "🎮", label: "Gaming",   key: "gaming"   },
  { emoji: "🎨", label: "Art",      key: "art"      },
  { emoji: "🔬", label: "Science",  key: "science"  },
  { emoji: "🎵", label: "Music",    key: "music"    },
  { emoji: "🚀", label: "Space",    key: "space"    },
  { emoji: "🍕", label: "Food",     key: "food"     },
  { emoji: "🎬", label: "Movies",   key: "movies"   },
  { emoji: "🌿", label: "Nature",   key: "nature"   },
  { emoji: "🚗", label: "Cars",     key: "cars"     },
  { emoji: "📚", label: "Books",    key: "books"    },
]

const AGE_OPTIONS: { label: string; value: AgeGroup; emoji: string }[] = [
  { label: "7 or 8",      value: "7-8",   emoji: "🌱" },
  { label: "9 or 10",     value: "9-10",  emoji: "🌿" },
  { label: "11 or 12",    value: "11-12", emoji: "🌳" },
  { label: "13 or older", value: "13+",   emoji: "🚀" },
]

// ── Quiz ───────────────────────────────────────────────────────────────────
const QUIZ = [
  {
    code: `<p>Cats are the best!</p>`,
    question: "What does this code show on a webpage?",
    options: [
      "🖼️  A picture of a cat",
      "📝  The words 'Cats are the best!'",
      "🔘  A clickable button",
      "❌  An error message",
    ],
    correct: 1,
    explanation: "The <p> tag creates a paragraph — it shows the words exactly as written inside it!",
  },
  {
    code: `animal = "shark"\nprint("My pet is a " + animal)`,
    question: "What appears on screen when this runs?",
    options: [
      "My pet is a shark",
      "My pet is a animal",
      "animal = shark",
      "Nothing — it crashes",
    ],
    correct: 0,
    explanation: 'The variable `animal` stores "shark", so the sentence becomes "My pet is a shark"!',
  },
  {
    code: `lives = 3\nif lives > 0:\n    print("Keep playing!")\nelse:\n    print("Game over!")`,
    question: "What does this program print?",
    options: [
      '"Game over!"',
      '"Both messages"',
      '"Keep playing!"',
      "Nothing at all",
    ],
    correct: 2,
    explanation: "Since lives (3) is bigger than 0, the 'if' part runs and prints 'Keep playing!'",
  },
]

// ── Spark idea prefills by interest ────────────────────────────────────────
const SPARK_IDEAS: Record<string, string> = {
  animals:  "a magical dragon that speaks 10 different languages",
  sports:   "a superhero athlete who can run faster than lightning",
  gaming:   "a secret final boss that no player has ever defeated",
  art:      "a painting that comes alive and changes every hour",
  science:  "a potion that makes plants grow ten times faster",
  music:    "a song that makes everyone who hears it start dancing",
  space:    "a rocket that can travel to another galaxy in one minute",
  food:     "a magical cookie that tastes like whatever you wish for",
  movies:   "a movie with a twist ending nobody has ever seen before",
  nature:   "a flower that only blooms during thunderstorms at midnight",
  cars:     "a car that transforms into a submarine when it hits water",
  books:    "a book where the story changes every single time you read it",
}

// ── Stage placement logic ──────────────────────────────────────────────────
function placeKid(ageGroup: AgeGroup, quizScore: number): string {
  if (ageGroup === "7-8")   return "stage-1"
  if (ageGroup === "9-10")  return quizScore >= 2 ? "stage-2" : "stage-1"
  // 11-12 and 13+
  return quizScore >= 1 ? "stage-2" : "stage-1"
}

// ── Stage result cards ─────────────────────────────────────────────────────
const STAGE_RESULTS: Record<string, {
  number: number; emoji: string; name: string; tagline: string
  color: string; route: string
}> = {
  "stage-1": {
    number:  1,
    emoji:   "🤖",
    name:    "AI Companion Creator",
    tagline: "Design and chat with your very own AI companion — a robot, dragon, alien, or anything you dream up!",
    color:   "#ffb800",
    route:   "/child/build/stage-1",
  },
  "stage-2": {
    number:  2,
    emoji:   "🧠",
    name:    "AI Builder",
    tagline: "Master the art of prompting and build a full Character Portfolio with your own AI creations!",
    color:   "#ff0080",
    route:   "/child/stages/stage-2",
  },
}

const slide = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x:  0 },
  exit:    { opacity: 0, x: -40 },
}

const TOTAL_STEPS = 7  // 0=welcome 1=name 2=age 3=interests 4=quiz 5=spark 6=result

export default function OnboardingPage() {
  const router = useRouter()

  // ── Core answers ─────────────────────────────────────────────────────────
  const [step,       setStep]      = useState(0)
  const [name,       setName]      = useState("")
  const [ageGroup,   setAgeGroup]  = useState<AgeGroup | null>(null)
  const [interests,  setInterests] = useState<string[]>([])

  // ── Quiz ─────────────────────────────────────────────────────────────────
  const [quizSub,          setQuizSub]          = useState(0)   // 0-2 = questions, 3 = score reveal
  const [quizAnswers,      setQuizAnswers]      = useState<boolean[]>([])
  const [selectedOption,   setSelectedOption]   = useState<number | null>(null)
  const [showFeedback,     setShowFeedback]     = useState(false)
  const [lastCorrect,      setLastCorrect]      = useState<boolean | null>(null)

  // ── Spark (Try AI) ────────────────────────────────────────────────────────
  const [sparkIdea,    setSparkIdea]    = useState("")
  const [sparkReply,   setSparkReply]   = useState<string | null>(null)
  const [sparkLoading, setSparkLoading] = useState(false)

  // ── Derived ───────────────────────────────────────────────────────────────
  const quizScore = quizAnswers.filter(Boolean).length
  const recommended = ageGroup ? placeKid(ageGroup, quizScore) : "stage-1"
  const stageData   = STAGE_RESULTS[recommended]

  const defaultSparkIdea = interests.length > 0
    ? (SPARK_IDEAS[interests[0]] ?? "a robot that can do anything you imagine")
    : "a robot that can do anything you imagine"

  const progressPct = Math.round((step / (TOTAL_STEPS - 1)) * 100)

  const next = useCallback(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1)), [])

  // Pre-fill spark idea when arriving at step 5
  useEffect(() => {
    if (step === 5 && !sparkIdea) setSparkIdea(defaultSparkIdea)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const toggleInterest = (key: string) =>
    setInterests((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key])

  const handleQuizAnswer = (optionIdx: number) => {
    if (showFeedback) return
    const correct = optionIdx === QUIZ[quizSub].correct
    setSelectedOption(optionIdx)
    setLastCorrect(correct)
    setShowFeedback(true)
    setQuizAnswers((prev) => [...prev, correct])

    setTimeout(() => {
      setShowFeedback(false)
      setSelectedOption(null)
      setLastCorrect(null)
      if (quizSub < 2) {
        setQuizSub((s) => s + 1)
      } else {
        setQuizSub(3)  // score reveal
      }
    }, 1600)
  }

  const resetQuiz = () => {
    setQuizSub(0)
    setQuizAnswers([])
    setSelectedOption(null)
    setShowFeedback(false)
    setLastCorrect(null)
  }

  const handleSpark = async () => {
    const idea = sparkIdea.trim() || defaultSparkIdea
    setSparkLoading(true)
    try {
      const res = await fetch("/api/ai/spark", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ idea }),
      })
      const data = await res.json() as { response?: string }
      setSparkReply(data.response || "Wow, what an idea! AI is going to love this. Let's go build! 🚀")
    } catch {
      setSparkReply("Wow — what an amazing idea! When you get started, AI is going to help you make it real! 🚀")
    } finally {
      setSparkLoading(false)
    }
  }

  const finish = () => {
    saveProfile({
      name:             name.trim() || undefined,
      ageGroup:         ageGroup!,
      experience:       quizScore >= 3 ? "lots" : quizScore >= 1 ? "some" : "none",
      interests,
      tutorialDone:     false,
      createdAt:        new Date().toISOString(),
      recommendedStage: recommended,
      quizScore,
    })
    router.push(stageData.route)
  }

  // ── Byte message ──────────────────────────────────────────────────────────
  const byteMsg = (() => {
    if (step === 0) return "Hi! I'm Byte 🤖 — I'll guide you through a quick adventure to find your perfect starting point!"
    if (step === 1) return "What should I call you? This is completely optional!"
    if (step === 2) return "This helps me pitch everything at exactly the right level for you!"
    if (step === 3) return "Pick what you're into — your projects will always be about the stuff YOU love!"
    if (step === 4 && quizSub < 3) return `Question ${quizSub + 1} of 3: Can you figure out what this code does? 🔍`
    if (step === 4 && quizSub === 3) return "Quiz done! Here's how you did! ⭐"
    if (step === 5) return "Now watch real AI in action — type an idea and see what it creates! ✨"
    if (step === 6) return `${name.trim() ? `You crushed it, ${name.trim().split(" ")[0]}!` : "You crushed it!"} Here's the path I've picked for you 🗺️`
    return ""
  })()

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

        {/* Byte avatar */}
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
              key={`byte-${step}-${quizSub}`}
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
              {byteMsg}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step content */}
        <div className="flex-1 flex flex-col items-center justify-start px-4 pb-12">
          <div className="w-full max-w-xl">
            <AnimatePresence mode="wait">

              {/* ── Step 0: Welcome ── */}
              {step === 0 && (
                <motion.div key="s0" {...slide} className="space-y-5">
                  <div className="text-center">
                    <h1 className="text-3xl font-orbitron font-black text-white mb-2">
                      Welcome to Cyber Academy!
                    </h1>
                    <p className="font-space text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
                      Where kids learn to build amazing things with AI.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { icon: "📋", text: "Tell me a little about yourself" },
                      { icon: "🧩", text: "Read some real code with me" },
                      { icon: "🤖", text: "Try talking to real AI" },
                      { icon: "🗺️", text: "Get your personalised learning path!" },
                    ].map(({ icon, text }) => (
                      <div
                        key={text}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-space"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)" }}
                      >
                        <span className="text-base">{icon}</span>
                        {text}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={next}
                    className="w-full py-4 rounded-2xl font-orbitron font-black text-base"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)`, color: "#050510" }}
                  >
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
                    placeholder="Your name… e.g. Alex, Sam, Jordan"
                    className="w-full px-5 py-4 rounded-2xl text-lg font-space outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderWidth: "2px", borderStyle: "solid", borderColor: name ? ACCENT : "rgba(255,255,255,0.12)",
                      color: "white", caretColor: ACCENT,
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
                            ? { background: `${ACCENT}20`, borderWidth: "2px", borderStyle: "solid", borderColor: ACCENT, boxShadow: `0 0 20px ${ACCENT}25` }
                            : { background: "rgba(255,255,255,0.04)", borderWidth: "2px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.1)" }
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

              {/* ── Step 3: Interests ── */}
              {step === 3 && (
                <motion.div key="s3" {...slide} className="space-y-5">
                  <div className="text-center">
                    <h2 className="text-2xl font-orbitron font-black text-white">What are you into?</h2>
                    <p className="text-sm font-space mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Pick as many as you like!</p>
                  </div>
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
                              ? { background: `${ACCENT}18`, borderWidth: "2px", borderStyle: "solid", borderColor: ACCENT }
                              : { background: "rgba(255,255,255,0.04)", borderWidth: "2px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.08)" }
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

              {/* ── Step 4: Quiz ── */}
              {step === 4 && (
                <motion.div key={`s4-${quizSub}`} {...slide} className="space-y-4">
                  {quizSub < 3 ? (
                    <>
                      {/* Question progress */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-orbitron font-bold" style={{ color: ACCENT }}>
                          Question {quizSub + 1} of 3
                        </span>
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="h-1.5 rounded-full transition-all duration-300"
                              style={{
                                width: i === quizSub ? "24px" : "8px",
                                background: i < quizSub ? ACCENT : i === quizSub ? `${ACCENT}99` : "rgba(255,255,255,0.12)",
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Code block */}
                      <div
                        className="rounded-xl overflow-hidden font-mono text-xs sm:text-sm"
                        style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        <div
                          className="px-3 py-1.5 border-b flex items-center gap-1.5"
                          style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
                        >
                          <div className="w-2 h-2 rounded-full" style={{ background: "#ff5f56" }} />
                          <div className="w-2 h-2 rounded-full" style={{ background: "#ffbd2e" }} />
                          <div className="w-2 h-2 rounded-full" style={{ background: "#27c93f" }} />
                          <span className="text-xs ml-2 font-space" style={{ color: "rgba(255,255,255,0.25)" }}>
                            {quizSub === 0 ? "index.html" : "script.py"}
                          </span>
                        </div>
                        <pre
                          className="p-4 text-xs sm:text-sm leading-relaxed whitespace-pre"
                          style={{ color: "#7dd3fc", fontFamily: "ui-monospace, monospace" }}
                        >
                          {QUIZ[quizSub].code}
                        </pre>
                      </div>

                      {/* Question */}
                      <p className="font-orbitron font-bold text-sm text-white">
                        {QUIZ[quizSub].question}
                      </p>

                      {/* Answer options */}
                      <div className="space-y-2">
                        {QUIZ[quizSub].options.map((opt, i) => {
                          const isCorrect  = i === QUIZ[quizSub].correct
                          const isSelected = selectedOption === i
                          let bg     = "rgba(255,255,255,0.04)"
                          let border = "rgba(255,255,255,0.1)"
                          let textColor = "rgba(255,255,255,0.85)"
                          if (showFeedback) {
                            if (isSelected && isCorrect)  { bg = "rgba(34,197,94,0.18)";  border = "#22c55e" }
                            else if (isSelected)           { bg = "rgba(239,68,68,0.18)";  border = "#ef4444" }
                            else if (isCorrect)            { bg = "rgba(34,197,94,0.08)";  border = "#22c55e50" }
                          }
                          return (
                            <button
                              key={i}
                              onClick={() => handleQuizAnswer(i)}
                              disabled={showFeedback}
                              className="w-full p-3 rounded-xl text-left text-sm font-space transition-all duration-150 flex items-center gap-3"
                              style={{ background: bg, borderWidth: "1.5px", borderStyle: "solid", borderColor: border, color: textColor }}
                            >
                              <span
                                className="shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-orbitron font-bold"
                                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                              >
                                {String.fromCharCode(65 + i)}
                              </span>
                              <span className="flex-1">{opt}</span>
                              {showFeedback && isSelected && (
                                <span style={{ color: isCorrect ? "#22c55e" : "#ef4444" }}>
                                  {isCorrect ? "✓" : "✗"}
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>

                      {/* Feedback explanation */}
                      <AnimatePresence>
                        {showFeedback && (
                          <motion.p
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs font-space px-3 py-2.5 rounded-xl"
                            style={{
                              background: lastCorrect ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
                              border: `1px solid ${lastCorrect ? "#22c55e30" : "#ef444430"}`,
                              color: "rgba(255,255,255,0.7)",
                            }}
                          >
                            {lastCorrect ? "✅  " : "❌  "}{QUIZ[quizSub].explanation}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    /* Score reveal */
                    <div className="text-center space-y-5 py-4">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="text-6xl"
                      >
                        {quizScore === 3 ? "🏆" : quizScore === 2 ? "⭐" : quizScore === 1 ? "💡" : "🌱"}
                      </motion.div>

                      <div>
                        <h2 className="text-2xl font-orbitron font-black text-white">
                          You got {quizScore}/3!
                        </h2>
                        <p className="text-sm font-space mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {quizScore === 3
                            ? "Incredible — you really know your code!"
                            : quizScore === 2
                            ? "Great job — you're already getting the hang of it!"
                            : quizScore === 1
                            ? "Nice try! That's exactly what we're here to teach."
                            : "No worries at all — everyone starts somewhere. Let's learn together!"}
                        </p>
                      </div>

                      <div className="flex justify-center gap-2">
                        {quizAnswers.map((correct, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.12, type: "spring", bounce: 0.4 }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold"
                            style={{
                              background: correct ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.12)",
                              border: `1px solid ${correct ? "#22c55e50" : "#ef444450"}`,
                              color:  correct ? "#22c55e" : "#ef4444",
                            }}
                          >
                            {correct ? "✓" : "✗"}
                          </motion.div>
                        ))}
                      </div>

                      <button
                        onClick={next}
                        className="w-full py-4 rounded-2xl font-orbitron font-black text-sm"
                        style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)`, color: "#050510" }}
                      >
                        Next: Try real AI! ✨
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Step 5: Try AI (Spark) ── */}
              {step === 5 && (
                <motion.div key="s5" {...slide} className="space-y-5">
                  <div className="text-center">
                    <h2 className="text-2xl font-orbitron font-black text-white">Try talking to AI!</h2>
                    <p className="text-sm font-space mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                      Tell AI what to create — then watch the magic happen.
                    </p>
                  </div>

                  {/* Prompt input box */}
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderWidth: "1px", borderStyle: "solid", borderColor: sparkReply ? `${ACCENT}40` : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      className="px-4 py-2 border-b flex items-center gap-2 text-xs font-space"
                      style={{ borderColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}
                    >
                      <span>💬</span> Your prompt to AI:
                    </div>
                    <div className="px-4 py-3 flex items-start gap-2">
                      <span className="text-sm font-orbitron font-bold mt-0.5 shrink-0" style={{ color: ACCENT }}>Create</span>
                      <textarea
                        value={sparkIdea}
                        onChange={(e) => setSparkIdea(e.target.value)}
                        placeholder={defaultSparkIdea}
                        rows={2}
                        disabled={sparkLoading || !!sparkReply}
                        className="flex-1 bg-transparent outline-none text-sm font-space resize-none"
                        style={{ color: "white", caretColor: ACCENT, opacity: sparkLoading || sparkReply ? 0.6 : 1 }}
                      />
                    </div>
                  </div>

                  {/* Ask button */}
                  {!sparkReply && !sparkLoading && (
                    <button
                      onClick={handleSpark}
                      className="w-full py-4 rounded-2xl font-orbitron font-black text-sm"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)`, color: "#050510" }}
                    >
                      Ask AI! ✨
                    </button>
                  )}

                  {/* Loading dots */}
                  {sparkLoading && (
                    <div className="flex justify-center items-center gap-2 py-3">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15 }}
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: ACCENT }}
                        />
                      ))}
                      <span className="text-sm font-space ml-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                        AI is thinking…
                      </span>
                    </div>
                  )}

                  {/* AI reply */}
                  <AnimatePresence>
                    {sparkReply && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div
                          className="p-4 rounded-2xl"
                          style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}28` }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">🤖</span>
                            <span className="text-xs font-orbitron font-bold" style={{ color: ACCENT }}>
                              AI responded!
                            </span>
                          </div>
                          <p className="text-sm font-space leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                            {sparkReply}
                          </p>
                        </div>
                        <p className="text-xs font-space text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
                          Pretty cool, right? You&apos;ll learn to make AI create things like this yourself!
                        </p>
                        <button
                          onClick={next}
                          className="w-full py-4 rounded-2xl font-orbitron font-black text-sm"
                          style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)`, color: "#050510" }}
                        >
                          See my learning path! 🗺️
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* ── Step 6: Result ── */}
              {step === 6 && (
                <motion.div key="s6" {...slide} className="space-y-5 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.45 }}
                    className="text-5xl"
                  >
                    🗺️
                  </motion.div>

                  <div>
                    <h2 className="text-2xl font-orbitron font-black text-white mb-1">
                      Your Perfect Path
                    </h2>
                    <p className="text-sm font-space" style={{ color: "rgba(255,255,255,0.45)" }}>
                      Based on your age, interests, and quiz results
                    </p>
                  </div>

                  {/* Stage card */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-5 rounded-2xl text-left"
                    style={{
                      background: `${stageData.color}0c`,
                      borderWidth: "1.5px", borderStyle: "solid", borderColor: `${stageData.color}40`,
                      boxShadow: `0 0 40px ${stageData.color}12`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{stageData.emoji}</span>
                      <div>
                        <p className="text-xs font-orbitron font-bold mb-0.5" style={{ color: stageData.color }}>
                          STARTING AT
                        </p>
                        <p className="text-lg font-orbitron font-black text-white">
                          Stage {stageData.number}
                        </p>
                      </div>
                    </div>
                    <p className="font-orbitron font-bold text-sm text-white mb-1.5">
                      {stageData.name}
                    </p>
                    <p className="text-sm font-space leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {stageData.tagline}
                    </p>
                  </motion.div>

                  {/* Score chips */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="flex flex-wrap justify-center gap-2 text-xs font-space"
                  >
                    <span
                      className="px-3 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
                    >
                      🧩 Quiz: {quizScore}/3
                    </span>
                    <span
                      className="px-3 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
                    >
                      🎂 Age: {ageGroup}
                    </span>
                    {interests.length > 0 && (
                      <span
                        className="px-3 py-1 rounded-full"
                        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
                      >
                        ❤️ {interests.length} interest{interests.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={finish}
                    className="w-full py-4 rounded-2xl font-orbitron font-black text-base"
                    style={{
                      background: `linear-gradient(135deg, ${stageData.color}, ${stageData.color}bb)`,
                      color: "#050510",
                      boxShadow: `0 0 30px ${stageData.color}40`,
                    }}
                  >
                    Start my adventure! 🚀
                  </motion.button>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Back button — available steps 1–4 only */}
            {step > 0 && step <= 4 && (
              <div className="mt-5 text-center">
                <button
                  onClick={() => {
                    if (step === 4) resetQuiz()
                    setStep((s) => s - 1)
                  }}
                  className="text-sm font-space"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  ← Back
                </button>
              </div>
            )}

            {/* Step dots */}
            <div className="flex justify-center gap-1.5 mt-7">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
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
