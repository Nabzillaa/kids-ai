"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Experience } from "@/types/profile"

export type TutorialHighlight = "preview" | "code" | "chat" | "none"
export type TutorialWaitFor  = "next" | "prompt" | "code-edit"

export interface TutorialStep {
  title:     string
  message:   string
  highlight: TutorialHighlight
  waitFor:   TutorialWaitFor
  byteFace:  string
  isLast?:   boolean
}

export function getTutorialSteps(experience: Experience): TutorialStep[] {
  if (experience === "lots") {
    return [
      {
        title:     "Quick tour 👋",
        message:   "Three panels: Chat (prompt AI to change the code), Code editor (edit HTML directly), Preview (live result). Both prompting and coding do the same thing. Go build!",
        highlight: "none",
        waitFor:   "next",
        byteFace:  "🤖",
        isLast:    true,
      },
    ]
  }

  if (experience === "some") {
    return [
      {
        title:     "Your page is live! 🎉",
        message:   "You've got 3 panels: Chat (left), Code (middle), Preview (right). Both prompting and coding update the preview instantly. Let me show you each one!",
        highlight: "none",
        waitFor:   "next",
        byteFace:  "🤖",
      },
      {
        title:     "This is your Preview 👉",
        message:   "The preview shows what your page looks like in real time — just like opening it in a browser. Every change you make appears here instantly!",
        highlight: "preview",
        waitFor:   "next",
        byteFace:  "🤩",
      },
      {
        title:     "Try a prompt! 💬",
        message:   "Type something in the Chat panel and press Enter. Try: \"make the background dark blue\" or \"add a fun fact about speed\".",
        highlight: "chat",
        waitFor:   "prompt",
        byteFace:  "🤖",
      },
      {
        title:     "Now try the code! 💻",
        message:   "Find a word in the code editor and change it — watch the preview update instantly. Both tools are yours now!",
        highlight: "code",
        waitFor:   "code-edit",
        byteFace:  "😎",
        isLast:    true,
      },
    ]
  }

  // experience === "none" — full tutorial
  return [
    {
      title:     "Your page is ready! 🎉",
      message:   "AI just built this from your words! First, look at the PREVIEW panel — that's what your webpage looks like right now, just like opening it in a browser!",
      highlight: "preview",
      waitFor:   "next",
      byteFace:  "🤩",
    },
    {
      title:     "This is CODE 💻",
      message:   "Now look at the CODE panel — AI wrote every single line of this! Code is just instructions that tell the browser what to show. That <h1> tag makes the big heading!",
      highlight: "code",
      waitFor:   "next",
      byteFace:  "🤖",
    },
    {
      title:     "Talk to me! 💬",
      message:   "This is where you talk to me. Type something to change your page and press Enter. Try: \"make the background blue\" — I'll update the code for you!",
      highlight: "chat",
      waitFor:   "prompt",
      byteFace:  "🤖",
    },
    {
      title:     "You changed your page with WORDS! 🌟",
      message:   "Did you see the code change too? I translated your words into HTML! Now let's try the other way: find the heading in the code and change the words yourself!",
      highlight: "code",
      waitFor:   "code-edit",
      byteFace:  "🤩",
    },
    {
      title:     "You're a web builder! 🎊",
      message:   "You just used BOTH tools: prompting (talking to AI) and coding (editing HTML). They both change the same page — use whichever feels right! Keep building!",
      highlight: "none",
      waitFor:   "next",
      byteFace:  "🎉",
      isLast:    true,
    },
  ]
}

interface Props {
  step:        TutorialStep
  stepIndex:   number
  maxSteps:    number
  onNext:      () => void
  onSkip:      () => void
  accentColor: string
  name?:       string
}

export function TutorialOverlay({
  step,
  stepIndex,
  maxSteps,
  onNext,
  onSkip,
  accentColor,
  name,
}: Props) {
  const isWaiting = step.waitFor !== "next"
  const actionHint: Record<TutorialWaitFor, string> = {
    "next":       "",
    "prompt":     "Type in the Chat panel and press Enter to continue →",
    "code-edit":  "Edit something in the Code editor to continue →",
  }

  return (
    <AnimatePresence>
      <motion.div
        key={`tut-step-${stepIndex}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 left-1/2 z-50 w-full max-w-lg px-4"
        style={{ transform: "translateX(-50%)" }}
      >
        <div
          className="rounded-2xl p-4"
          style={{
            background: "rgba(8,8,26,0.96)",
            border:     `1px solid ${accentColor}40`,
            boxShadow:  `0 0 30px ${accentColor}20, 0 8px 32px rgba(0,0,0,0.6)`,
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <motion.span
                className="text-3xl flex-shrink-0"
                animate={{ rotate: isWaiting ? [0, -8, 8, -4, 4, 0] : 0 }}
                transition={{ repeat: isWaiting ? Infinity : 0, duration: 2.5, repeatDelay: 1 }}
              >
                {step.byteFace}
              </motion.span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-orbitron font-bold" style={{ color: accentColor }}>
                    Byte
                  </span>
                  <span className="text-xs font-space" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Step {stepIndex + 1} of {maxSteps}
                  </span>
                </div>
                <p className="text-sm font-orbitron font-bold text-white mt-0.5">
                  {step.title}
                </p>
              </div>
            </div>

            <button
              onClick={onSkip}
              className="text-xs font-space flex-shrink-0 mt-1"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Skip tutorial
            </button>
          </div>

          {/* Message */}
          <p className="text-sm font-space leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.75)" }}>
            {name && step.message.includes("[Name]")
              ? step.message.replace("[Name]", name)
              : step.message}
          </p>

          {/* Action area */}
          {isWaiting ? (
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-space"
              style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}25`, color: accentColor }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                ✨
              </motion.span>
              {actionHint[step.waitFor]}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              {/* Progress dots */}
              <div className="flex gap-1">
                {Array.from({ length: maxSteps }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:  i === stepIndex ? "16px" : "5px",
                      height: "5px",
                      background: i <= stepIndex ? accentColor : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={onNext}
                className="px-5 py-2 rounded-xl font-orbitron font-bold text-sm transition-all"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
                  color: "#050510",
                  boxShadow: `0 0 15px ${accentColor}30`,
                }}
              >
                {step.isLast ? "Let's build! 🚀" : "Got it →"}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
