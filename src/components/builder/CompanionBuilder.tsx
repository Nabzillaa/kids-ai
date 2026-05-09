"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { StageProject } from "@/types/stage"
import type { ChildProfile } from "@/types/profile"

// ── Types ─────────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: number
  role: "user" | "assistant" | "system"
  content: string
}

interface CompanionConfig {
  name: string
  type: string
  typeEmoji: string
  personalities: string[]
  skill: string
}

interface Props {
  project:     StageProject
  accentColor: string
  profile:     ChildProfile | null
}

// ── Design data ───────────────────────────────────────────────────────────────

const COMPANION_TYPES = [
  { emoji: "🤖", label: "Robot" },
  { emoji: "🐉", label: "Dragon" },
  { emoji: "🦊", label: "Fox" },
  { emoji: "👽", label: "Alien" },
  { emoji: "🐺", label: "Wolf" },
  { emoji: "🐱", label: "Cat" },
  { emoji: "🦁", label: "Lion" },
  { emoji: "👾", label: "Monster" },
  { emoji: "🧙", label: "Wizard" },
  { emoji: "🦋", label: "Fairy" },
]

const NAME_SUGGESTIONS: Record<string, string[]> = {
  Robot:   ["Bolt", "Zap", "Pixel", "Nova", "Circuit"],
  Dragon:  ["Ember", "Storm", "Sparks", "Blaze", "Ash"],
  Fox:     ["Rusty", "Blaze", "Pepper", "Zigzag", "Copper"],
  Alien:   ["Zyx", "Glorp", "Nevo", "Quasar", "Fizz"],
  Wolf:    ["Shadow", "Frost", "Storm", "Luna", "Rex"],
  Cat:     ["Biscuit", "Mochi", "Whisper", "Smudge", "Twig"],
  Lion:    ["Roar", "Mane", "Sunny", "Brave", "King"],
  Monster: ["Bumble", "Gloop", "Snorkel", "Ooze", "Fizzy"],
  Wizard:  ["Myst", "Arcane", "Sage", "Glimmer", "Rune"],
  Fairy:   ["Dewdrop", "Twinkle", "Bloom", "Wisp", "Glitter"],
}

const PERSONALITIES = [
  { emoji: "😄", label: "Funny" },
  { emoji: "🦉", label: "Wise" },
  { emoji: "⚡", label: "Energetic" },
  { emoji: "💫", label: "Magical" },
  { emoji: "🌙", label: "Mysterious" },
  { emoji: "🤗", label: "Super Kind" },
  { emoji: "🏆", label: "Competitive" },
  { emoji: "😴", label: "Very Lazy" },
]

let _msgId = 0

// ── Component ─────────────────────────────────────────────────────────────────

export function CompanionBuilder({ project, accentColor, profile }: Props) {
  // ── Design state ───────────────────────────────────────────────────────────
  const [step, setStep] = useState<"type" | "name" | "personality" | "skill" | "ready">("type")
  const [selectedType, setSelectedType] = useState<typeof COMPANION_TYPES[0] | null>(null)
  const [name, setName] = useState("")
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>([])
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [customSkill, setCustomSkill] = useState("")

  // ── Chat state ─────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<"design" | "chat">("design")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [companion, setCompanion] = useState<CompanionConfig | null>(null)

  // ── Refs ───────────────────────────────────────────────────────────────────
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // ── Helpers ────────────────────────────────────────────────────────────────

  function addMsg(role: ChatMessage["role"], content: string) {
    setMessages((prev) => [...prev, { id: ++_msgId, role, content }])
  }

  const togglePersonality = (label: string) => {
    setSelectedPersonalities((prev) => {
      if (prev.includes(label)) return prev.filter((p) => p !== label)
      if (prev.length >= 2) return [...prev.slice(1), label]
      return [...prev, label]
    })
  }

  const effectiveSkill = selectedSkill === "__custom__" ? customSkill.trim() : selectedSkill ?? ""

  // ── Build companion + get first greeting ──────────────────────────────────
  const bringToLife = useCallback(async () => {
    if (!selectedType || !name.trim() || selectedPersonalities.length === 0 || !effectiveSkill) return

    const config: CompanionConfig = {
      name: name.trim(),
      type: selectedType.label,
      typeEmoji: selectedType.emoji,
      personalities: selectedPersonalities,
      skill: effectiveSkill,
    }
    setCompanion(config)
    setPhase("chat")
    setIsLoading(true)

    const childName = profile?.name ?? null

    try {
      const res  = await fetch("/api/ai/companion", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          companion: config,
          childName,
          messages: [
            {
              role: "user",
              content: `Introduce yourself! Tell me your name, what you are, and say something about your special skill: ${config.skill}. Be enthusiastic!`,
            },
          ],
        }),
      })
      const data = await res.json()
      addMsg("assistant", data.text ?? `Hi! I'm ${config.name}! 🎉`)
    } catch {
      addMsg("assistant", `Hi! I'm ${config.name}! Something went wrong but I'm happy to be here! 🎉`)
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }, [selectedType, name, selectedPersonalities, effectiveSkill, profile])

  // ── Send a message ─────────────────────────────────────────────────────────
  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading || !companion) return
    setInput("")
    addMsg("user", text)
    setIsLoading(true)

    const apiMessages = [
      ...messages.filter((m) => m.role !== "system"),
      { role: "user" as const, content: text },
    ].map((m) => ({ role: m.role as "user" | "assistant", content: m.content }))

    try {
      const res  = await fetch("/api/ai/companion", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ companion, childName: profile?.name ?? null, messages: apiMessages }),
      })
      const data = await res.json()
      addMsg("assistant", data.text ?? "Hmm, I lost my train of thought! Ask me again?")
    } catch {
      addMsg("assistant", "Oops — I had a hiccup! Try again?")
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, companion, messages, profile])

  // ── Download profile card ──────────────────────────────────────────────────
  const downloadCard = () => {
    if (!companion) return
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Meet ${companion.name}!</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: #0a0a1a; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
    .card { background: linear-gradient(135deg, #12122a, #1a1a3e); border: 2px solid ${accentColor}40; border-radius: 24px; padding: 40px; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 0 60px ${accentColor}20; }
    .emoji { font-size: 5rem; margin-bottom: 16px; }
    .badge { display: inline-block; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: ${accentColor}; border: 1px solid ${accentColor}40; border-radius: 20px; padding: 6px 16px; margin-bottom: 12px; }
    h1 { font-size: 2.4rem; color: white; font-weight: 900; margin-bottom: 6px; }
    .type { font-size: 1rem; color: rgba(255,255,255,0.5); margin-bottom: 28px; }
    .label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${accentColor}; margin-bottom: 6px; }
    .value { font-size: 1rem; color: rgba(255,255,255,0.85); margin-bottom: 20px; }
    .footer { margin-top: 28px; font-size: 0.75rem; color: rgba(255,255,255,0.25); }
  </style>
</head>
<body>
  <div class="card">
    <div class="emoji">${companion.typeEmoji}</div>
    <div class="badge">AI Companion</div>
    <h1>${companion.name}</h1>
    <p class="type">A ${companion.type}</p>
    <p class="label">Personality</p>
    <p class="value">${companion.personalities.join(" & ")}</p>
    <p class="label">Special Skill</p>
    <p class="value">${companion.skill}</p>
    <p class="footer">Created with Cyber Academy · Stage 1</p>
  </div>
</body>
</html>`
    const blob = new Blob([html], { type: "text/html" })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement("a")
    a.href     = url
    a.download = `meet-${companion.name.toLowerCase().replace(/\s+/g, "-")}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CHAT PHASE
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === "chat" && companion) {
    return (
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* ── COMPANION PROFILE CARD ─────────────────────────── */}
        <div
          className="flex-shrink-0 flex flex-col items-center justify-start p-5 border-b lg:border-b-0 lg:border-r lg:w-64"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}
        >
          {/* Big emoji */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-6xl mb-3"
          >
            {companion.typeEmoji}
          </motion.div>

          <h2 className="text-xl font-orbitron font-black text-white mb-1 text-center">{companion.name}</h2>
          <p className="text-xs font-space mb-4 text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
            A {companion.type}
          </p>

          <div className="w-full space-y-3">
            <div
              className="p-3 rounded-xl text-center"
              style={{ background: `${accentColor}0c`, border: `1px solid ${accentColor}20` }}
            >
              <p className="text-xs font-orbitron font-bold mb-1" style={{ color: accentColor }}>Personality</p>
              <p className="text-xs font-space" style={{ color: "rgba(255,255,255,0.7)" }}>
                {companion.personalities.join(" & ")}
              </p>
            </div>
            <div
              className="p-3 rounded-xl text-center"
              style={{ background: `${accentColor}0c`, border: `1px solid ${accentColor}20` }}
            >
              <p className="text-xs font-orbitron font-bold mb-1" style={{ color: accentColor }}>Special Skill</p>
              <p className="text-xs font-space" style={{ color: "rgba(255,255,255,0.7)" }}>
                {companion.skill}
              </p>
            </div>
          </div>

          {/* Download card */}
          <button
            onClick={downloadCard}
            className="mt-4 w-full py-2.5 text-xs font-orbitron font-bold rounded-xl transition-all"
            style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}35`, color: accentColor }}
          >
            ↓ Profile Card
          </button>

          {/* Redesign */}
          <button
            onClick={() => {
              setPhase("design")
              setStep("type")
              setMessages([])
              setCompanion(null)
              setSelectedType(null)
              setName("")
              setSelectedPersonalities([])
              setSelectedSkill(null)
              setCustomSkill("")
            }}
            className="mt-2 w-full py-2 text-xs font-orbitron font-bold rounded-xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }}
          >
            + New Companion
          </button>
        </div>

        {/* ── CHAT PANEL ─────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b flex items-center gap-2 flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#28c840" }} />
            <span className="text-sm font-orbitron font-bold" style={{ color: accentColor }}>
              Chat with {companion.name}
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && !isLoading && (
              <p className="text-xs font-space text-center py-12" style={{ color: "rgba(255,255,255,0.2)" }}>
                Say hello to {companion.name}!
              </p>
            )}

            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <span className="text-2xl mr-2 flex-shrink-0 self-end mb-1">{companion.typeEmoji}</span>
                )}
                <div
                  className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-space leading-relaxed"
                  style={
                    msg.role === "user"
                      ? { background: `${accentColor}20`, border: `1px solid ${accentColor}35`, color: "white" }
                      : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.88)" }
                  }
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}

            <AnimatePresence>
              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start items-end gap-2">
                  <span className="text-2xl">{companion.typeEmoji}</span>
                  <div className="px-4 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <span className="flex gap-1 items-center">
                      {[0, 150, 300].map((d) => (
                        <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: accentColor, animationDelay: `${d}ms` }} />
                      ))}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 flex-shrink-0 border-t" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.15)" }}>
            <div
              className="flex gap-2 rounded-xl overflow-hidden"
              style={{ border: `1px solid ${isLoading ? "rgba(255,255,255,0.08)" : `${accentColor}50`}`, background: "rgba(255,255,255,0.03)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                disabled={isLoading}
                placeholder={`Talk to ${companion.name}...`}
                className="flex-1 bg-transparent px-3 py-2.5 text-sm font-space outline-none"
                style={{ color: "white", caretColor: accentColor }}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-3 py-2.5 font-orbitron font-black text-sm transition-all disabled:opacity-30"
                style={{ color: accentColor }}
              >
                →
              </button>
            </div>

            {/* Suggested prompts */}
            <div className="flex gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
              {[
                `Tell me a fun fact about ${companion.skill}!`,
                "What do you look like?",
                "What's your favourite thing?",
                "Tell me a joke!",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => { setInput(suggestion); inputRef.current?.focus() }}
                  disabled={isLoading}
                  className="flex-shrink-0 text-xs font-space px-3 py-1.5 rounded-full transition-all disabled:opacity-30"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // DESIGN PHASE
  // ─────────────────────────────────────────────────────────────────────────

  const childFirstName = profile?.name?.split(" ")[0] ?? null
  const canProceedType = !!selectedType
  const canProceedName = name.trim().length > 0
  const canProceedPersonality = selectedPersonalities.length > 0
  const canBringToLife = canProceedType && canProceedName && canProceedPersonality && !!effectiveSkill

  return (
    <div className="flex-1 flex items-start justify-center px-4 py-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl space-y-6"
      >
        {/* ── Progress steps ── */}
        <div className="flex items-center gap-2">
          {(["type", "name", "personality", "skill"] as const).map((s, i) => {
            const steps = ["type", "name", "personality", "skill"]
            const currentIdx = steps.indexOf(step)
            const isDone = i < currentIdx
            const isCurrent = s === step
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-orbitron font-black flex-shrink-0 transition-all duration-300"
                  style={
                    isDone
                      ? { background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.4)", color: "#00ff88" }
                      : isCurrent
                      ? { background: `${accentColor}20`, border: `2px solid ${accentColor}`, color: accentColor }
                      : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.25)" }
                  }
                >
                  {isDone ? "✓" : i + 1}
                </div>
                {i < 3 && <div className="flex-1 h-px" style={{ background: isDone ? "rgba(0,255,136,0.3)" : "rgba(255,255,255,0.08)" }} />}
              </div>
            )
          })}
        </div>

        {/* ── STEP 1: Type ── */}
        <AnimatePresence mode="wait">
          {step === "type" && (
            <motion.div key="type" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <p className="text-xs font-orbitron font-bold tracking-widest uppercase mb-1" style={{ color: accentColor }}>
                  Step 1 of 4
                </p>
                <h2 className="text-2xl font-orbitron font-black text-white">
                  {childFirstName ? `${childFirstName}, w` : "W"}hat type of companion?
                </h2>
                <p className="text-sm font-space mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Pick the one that feels most like YOUR companion.
                </p>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {COMPANION_TYPES.map((t) => (
                  <motion.button
                    key={t.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedType(t)}
                    className="p-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all"
                    style={
                      selectedType?.label === t.label
                        ? { background: `${accentColor}18`, border: `2px solid ${accentColor}`, boxShadow: `0 0 16px ${accentColor}20` }
                        : { background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.08)" }
                    }
                  >
                    <span className="text-3xl">{t.emoji}</span>
                    <span className="text-xs font-orbitron font-bold" style={{ color: selectedType?.label === t.label ? accentColor : "rgba(255,255,255,0.6)" }}>
                      {t.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => { if (canProceedType) setStep("name") }}
                disabled={!canProceedType}
                className="w-full py-4 rounded-2xl font-orbitron font-black text-sm tracking-wide transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: canProceedType ? `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)` : "rgba(255,255,255,0.06)",
                  color: canProceedType ? "#050510" : "rgba(255,255,255,0.3)",
                  boxShadow: canProceedType ? `0 0 25px ${accentColor}30` : "none",
                }}
              >
                {canProceedType ? `${selectedType!.emoji} Choose ${selectedType!.label} →` : "Pick a type first"}
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: Name ── */}
          {step === "name" && selectedType && (
            <motion.div key="name" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <p className="text-xs font-orbitron font-bold tracking-widest uppercase mb-1" style={{ color: accentColor }}>
                  Step 2 of 4
                </p>
                <h2 className="text-2xl font-orbitron font-black text-white">
                  Name your {selectedType.emoji} {selectedType.label}
                </h2>
                <p className="text-sm font-space mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                  This is what everyone will call them!
                </p>
              </div>

              {/* Suggestions */}
              <div>
                <p className="text-xs font-orbitron font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Quick ideas ↓
                </p>
                <div className="flex flex-wrap gap-2">
                  {(NAME_SUGGESTIONS[selectedType.label] ?? []).map((n) => (
                    <button
                      key={n}
                      onClick={() => setName(n)}
                      className="px-3 py-1.5 rounded-xl text-sm font-space transition-all"
                      style={
                        name === n
                          ? { background: `${accentColor}20`, border: `1px solid ${accentColor}50`, color: accentColor }
                          : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }
                      }
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom name input */}
              <div
                className="rounded-2xl p-4 transition-all"
                style={{
                  background: name && !NAME_SUGGESTIONS[selectedType.label]?.includes(name) ? `${accentColor}0c` : "rgba(255,255,255,0.04)",
                  border: `2px solid ${name ? `${accentColor}50` : "rgba(255,255,255,0.1)"}`,
                }}
              >
                <p className="text-xs font-orbitron font-bold mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                  ✏️ Or type your own name
                </p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && canProceedName) setStep("personality") }}
                  placeholder={`e.g. ${NAME_SUGGESTIONS[selectedType.label]?.[0] ?? "Sparky"}`}
                  maxLength={20}
                  className="w-full bg-transparent text-sm font-space outline-none"
                  style={{ color: "white", caretColor: accentColor }}
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep("type")} className="px-5 py-3 rounded-2xl text-sm font-orbitron font-bold" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
                  ← Back
                </button>
                <button
                  onClick={() => { if (canProceedName) setStep("personality") }}
                  disabled={!canProceedName}
                  className="flex-1 py-3 rounded-2xl font-orbitron font-black text-sm tracking-wide transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: canProceedName ? `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)` : "rgba(255,255,255,0.06)",
                    color: canProceedName ? "#050510" : "rgba(255,255,255,0.3)",
                    boxShadow: canProceedName ? `0 0 25px ${accentColor}30` : "none",
                  }}
                >
                  {canProceedName ? `${name} sounds great! →` : "Type a name first"}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Personality ── */}
          {step === "personality" && (
            <motion.div key="personality" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <p className="text-xs font-orbitron font-bold tracking-widest uppercase mb-1" style={{ color: accentColor }}>
                  Step 3 of 4
                </p>
                <h2 className="text-2xl font-orbitron font-black text-white">
                  What&apos;s {name}&apos;s personality?
                </h2>
                <p className="text-sm font-space mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Pick up to 2 traits. They&apos;ll shape how {name} talks to you!
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PERSONALITIES.map((p) => {
                  const selected = selectedPersonalities.includes(p.label)
                  return (
                    <motion.button
                      key={p.label}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => togglePersonality(p.label)}
                      className="p-4 rounded-2xl flex flex-col items-center gap-2 transition-all"
                      style={
                        selected
                          ? { background: `${accentColor}18`, border: `2px solid ${accentColor}`, boxShadow: `0 0 16px ${accentColor}20` }
                          : { background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.08)" }
                      }
                    >
                      <span className="text-3xl">{p.emoji}</span>
                      <span className="text-xs font-orbitron font-bold" style={{ color: selected ? accentColor : "rgba(255,255,255,0.65)" }}>
                        {p.label}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              {selectedPersonalities.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 flex-wrap">
                  {selectedPersonalities.map((p) => (
                    <span key={p} className="text-xs font-orbitron font-bold px-3 py-1.5 rounded-full" style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}35`, color: accentColor }}>
                      ✓ {p}
                    </span>
                  ))}
                </motion.div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep("name")} className="px-5 py-3 rounded-2xl text-sm font-orbitron font-bold" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
                  ← Back
                </button>
                <button
                  onClick={() => { if (canProceedPersonality) setStep("skill") }}
                  disabled={!canProceedPersonality}
                  className="flex-1 py-3 rounded-2xl font-orbitron font-black text-sm tracking-wide transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: canProceedPersonality ? `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)` : "rgba(255,255,255,0.06)",
                    color: canProceedPersonality ? "#050510" : "rgba(255,255,255,0.3)",
                    boxShadow: canProceedPersonality ? `0 0 25px ${accentColor}30` : "none",
                  }}
                >
                  {canProceedPersonality ? "Pick their skill →" : "Choose at least 1 trait"}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: Skill ── */}
          {step === "skill" && (
            <motion.div key="skill" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <p className="text-xs font-orbitron font-bold tracking-widest uppercase mb-1" style={{ color: accentColor }}>
                  Step 4 of 4 — Almost there!
                </p>
                <h2 className="text-2xl font-orbitron font-black text-white">
                  What does {name} know everything about?
                </h2>
                <p className="text-sm font-space mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                  This is their superpower — {name} will be the world&apos;s greatest expert on it!
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.ideas.map((idea, i) => {
                  const isSelected = selectedSkill === idea.example
                  return (
                    <motion.button
                      key={idea.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedSkill(idea.example)}
                      className="p-4 rounded-2xl flex flex-col items-center gap-2 transition-all"
                      style={
                        isSelected
                          ? { background: `${accentColor}18`, border: `2px solid ${accentColor}`, boxShadow: `0 0 16px ${accentColor}20` }
                          : { background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.08)" }
                      }
                    >
                      <span className="text-3xl">{idea.emoji}</span>
                      <span className="text-xs font-orbitron font-bold text-center leading-tight" style={{ color: isSelected ? accentColor : "rgba(255,255,255,0.65)" }}>
                        {idea.label}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              {/* Custom skill */}
              <div
                className="rounded-2xl p-4 transition-all"
                style={
                  selectedSkill === "__custom__"
                    ? { background: `${accentColor}0c`, border: `2px solid ${accentColor}` }
                    : { background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.08)" }
                }
              >
                <p className="text-xs font-orbitron font-bold mb-2" style={{ color: selectedSkill === "__custom__" ? accentColor : "rgba(255,255,255,0.4)" }}>
                  ✏️ Something else — type it here
                </p>
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => { setCustomSkill(e.target.value); setSelectedSkill("__custom__") }}
                  onFocus={() => setSelectedSkill("__custom__")}
                  onKeyDown={(e) => { if (e.key === "Enter" && canBringToLife) bringToLife() }}
                  placeholder="e.g. cooking, football, Harry Potter, sharks..."
                  className="w-full bg-transparent text-sm font-space outline-none"
                  style={{ color: "white", caretColor: accentColor }}
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep("personality")} className="px-5 py-3 rounded-2xl text-sm font-orbitron font-bold" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
                  ← Back
                </button>
                <button
                  onClick={bringToLife}
                  disabled={!canBringToLife || isLoading}
                  className="flex-1 py-3 rounded-2xl font-orbitron font-black text-sm tracking-wide transition-all disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden"
                  style={{
                    background: canBringToLife ? `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)` : "rgba(255,255,255,0.06)",
                    color: canBringToLife ? "#050510" : "rgba(255,255,255,0.3)",
                    boxShadow: canBringToLife ? `0 0 30px ${accentColor}40` : "none",
                  }}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block animate-spin">⟳</span>
                      Bringing {name} to life...
                    </span>
                  ) : canBringToLife ? (
                    `✨ Bring ${name} to Life!`
                  ) : (
                    "Pick a skill first"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
