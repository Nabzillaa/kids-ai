"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { StageProject } from "@/types/stage"
import type { ChildProfile } from "@/types/profile"
import { markTutorialDone } from "@/lib/profile"
import { TutorialOverlay, getTutorialSteps } from "@/components/builder/TutorialOverlay"

interface Message {
  id: number
  role: "user" | "ai" | "system"
  text: string
}

interface Props {
  project:     StageProject
  accentColor: string
  profile:     ChildProfile | null
}

let _msgId = 0

function getSetupGreeting(profile: ChildProfile | null): string {
  const n = profile?.name ? `, ${profile.name.split(" ")[0]}` : ""
  if (!profile || profile.experience === "none") {
    return `Hi${n}! I'm Byte 🤖 — your AI coding buddy. Today we'll build a real webpage using prompts AND code. First — what's your page going to be about?`
  }
  if (profile.experience === "some") {
    return `Hey${n}! Pick your topic and I'll generate a starter page. Then you can customize it with prompts and code!`
  }
  return `Hey${n}! What should your page be about? I'll generate it and then you can build from there.`
}

export function WebBuilder({ project, accentColor, profile }: Props) {
  // ── Phase & build state ────────────────────────────────────────────────────
  const [phase, setPhase]             = useState<"setup" | "building">("setup")
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null)
  const [customTopic, setCustomTopic] = useState("")
  const [topic, setTopic]             = useState("")
  const [code, setCode]               = useState("")
  const [previewCode, setPreviewCode] = useState("")
  const [messages, setMessages]       = useState<Message[]>([])
  const [promptInput, setPromptInput] = useState("")
  const [isLoading, setIsLoading]     = useState(false)
  const [activePanel, setActivePanel] = useState<"chat" | "code" | "preview">("preview")

  // ── Tutorial state ─────────────────────────────────────────────────────────
  const tutorialSteps    = profile ? getTutorialSteps(profile.experience) : []
  const tutorialAlreadyDone = profile?.tutorialDone ?? true
  const [tutStep, setTutStep] = useState<number>(tutorialAlreadyDone ? tutorialSteps.length : 0)
  const tutActive        = phase === "building" && tutStep < tutorialSteps.length
  const currentTutStep   = tutorialSteps[tutStep]

  // ── Refs ───────────────────────────────────────────────────────────────────
  const chatEndRef     = useRef<HTMLDivElement>(null)
  const previewTimer   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const codeRef        = useRef<HTMLTextAreaElement>(null)
  const isAiEditing    = useRef(false)

  // ── Preview debounce ───────────────────────────────────────────────────────
  useEffect(() => {
    clearTimeout(previewTimer.current)
    previewTimer.current = setTimeout(() => setPreviewCode(code), 400)
    return () => clearTimeout(previewTimer.current)
  }, [code])

  // ── Chat scroll ────────────────────────────────────────────────────────────
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // ── Tutorial: auto-advance on first prompt ─────────────────────────────────
  useEffect(() => {
    if (currentTutStep?.waitFor === "prompt" && messages.some((m) => m.role === "user")) {
      setTutStep((s) => s + 1)
    }
  }, [messages, currentTutStep?.waitFor])

  // ── Tutorial: on complete, mark done ─────────────────────────────────────
  useEffect(() => {
    if (phase === "building" && tutStep >= tutorialSteps.length && !tutorialAlreadyDone) {
      markTutorialDone()
    }
  }, [tutStep, tutorialSteps.length, phase, tutorialAlreadyDone])

  function addMsg(role: Message["role"], text: string) {
    setMessages((prev) => [...prev, { id: ++_msgId, role, text }])
  }

  const effectiveTopic =
    selectedIdea === "__custom__" ? customTopic.trim() : selectedIdea ?? ""
  const canBuild = effectiveTopic.length > 0

  // ── Build page from topic ──────────────────────────────────────────────────
  const buildPage = async () => {
    if (!canBuild || isLoading) return
    setTopic(effectiveTopic)
    setIsLoading(true)
    addMsg("system", `Building your ${effectiveTopic} page...`)

    try {
      const res  = await fetch("/api/ai/build", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ mode: "generate", topic: effectiveTopic }),
      })
      const data = await res.json()

      if (data.html) {
        isAiEditing.current = true
        setCode(data.html)
        setPreviewCode(data.html)
        isAiEditing.current = false
        addMsg("ai", data.message ?? `Your ${effectiveTopic} page is ready!`)
        setPhase("building")
        setActivePanel("preview")
      } else {
        addMsg("ai", data.error ?? "Something went wrong — try again!")
      }
    } catch {
      addMsg("ai", "Couldn't connect to the AI. Check your connection!")
    } finally {
      setIsLoading(false)
    }
  }

  // ── Apply AI edit ──────────────────────────────────────────────────────────
  const applyEdit = useCallback(async () => {
    const instruction = promptInput.trim()
    if (!instruction || isLoading) return
    setPromptInput("")
    addMsg("user", instruction)
    setIsLoading(true)
    isAiEditing.current = true

    try {
      const res  = await fetch("/api/ai/build", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ mode: "edit", code, instruction }),
      })
      const data = await res.json()

      if (data.html) {
        setCode(data.html)
        addMsg("ai", data.message ?? "Done! Check the preview.")
      } else {
        addMsg("ai", data.error ?? "Couldn't apply that change — try describing it differently!")
      }
    } catch {
      addMsg("ai", "Something went wrong — try again!")
    } finally {
      isAiEditing.current = false
      setIsLoading(false)
    }
  }, [promptInput, isLoading, code])

  // ── Direct code edit handler ───────────────────────────────────────────────
  const handleCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCode(e.target.value)
      if (!isAiEditing.current && currentTutStep?.waitFor === "code-edit") {
        setTutStep((s) => s + 1)
      }
    },
    [currentTutStep?.waitFor]
  )

  const handleTabKey = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== "Tab") return
      e.preventDefault()
      const el    = e.currentTarget
      const start = el.selectionStart
      const end   = el.selectionEnd
      const next  = code.substring(0, start) + "  " + code.substring(end)
      setCode(next)
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2
      })
    },
    [code]
  )

  const downloadPage = () => {
    const blob = new Blob([code], { type: "text/html" })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement("a")
    a.href     = url
    a.download = `my-${topic.replace(/\s+/g, "-").toLowerCase()}-page.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ── Panel highlight helper ─────────────────────────────────────────────────
  // Uses long-form border properties to avoid mixing border shorthand with
  // borderColor (which React 19 flags as a styling conflict).
  const panelBorder = (panel: "chat" | "code" | "preview") => {
    if (!tutActive || currentTutStep?.highlight !== panel) return {}
    return {
      borderColor: accentColor,
      borderWidth: "2px",
      borderStyle: "solid",
      boxShadow:   `0 0 24px ${accentColor}35`,
    }
  }

  // ── Interests-based idea highlighting ─────────────────────────────────────
  const matchesInterest = (example: string) => {
    if (!profile?.interests?.length) return false
    return profile.interests.some((i) => example.toLowerCase().includes(i) || i.includes(example.split(" ")[0].toLowerCase()))
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SETUP PHASE
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === "setup") {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl space-y-6"
        >
          {/* Byte greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex gap-3 items-start p-4 rounded-2xl"
            style={{ background: `${accentColor}0c`, border: `1px solid ${accentColor}25` }}
          >
            <motion.span
              className="text-3xl flex-shrink-0"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              🤖
            </motion.span>
            <div>
              <p className="text-xs font-orbitron font-bold mb-1" style={{ color: accentColor }}>
                Byte says:
              </p>
              <p className="text-sm font-space leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                {getSetupGreeting(profile)}
              </p>
            </div>
          </motion.div>

          {/* Idea grid */}
          <div>
            <p className="text-xs font-orbitron font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
              Pick a topic ↓
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.ideas.map((idea, i) => {
                const isSelected  = selectedIdea === idea.example
                const highlighted = matchesInterest(idea.example)
                return (
                  <motion.button
                    key={idea.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.2 }}
                    onClick={() => setSelectedIdea(idea.example)}
                    className="p-4 rounded-2xl text-left transition-all duration-150 relative"
                    style={
                      isSelected
                        ? { background: `${accentColor}18`, border: `2px solid ${accentColor}`, boxShadow: `0 0 20px ${accentColor}25` }
                        : { background: "rgba(255,255,255,0.04)", border: `2px solid ${highlighted ? `${accentColor}40` : "rgba(255,255,255,0.08)"}` }
                    }
                  >
                    {highlighted && !isSelected && (
                      <span className="absolute top-1.5 right-1.5 text-xs">⭐</span>
                    )}
                    <div className="text-3xl mb-2">{idea.emoji}</div>
                    <p className="font-orbitron font-bold text-xs leading-tight" style={{ color: isSelected ? accentColor : "rgba(255,255,255,0.8)" }}>
                      {idea.label}
                    </p>
                    <p className="text-xs font-space mt-1 truncate" style={{ color: "rgba(255,255,255,0.3)" }}>
                      e.g. {idea.example}
                    </p>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Custom topic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl p-4 transition-all duration-150"
            style={
              selectedIdea === "__custom__"
                ? { background: `${accentColor}12`, border: `2px solid ${accentColor}` }
                : { background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.08)" }
            }
          >
            <p className="font-orbitron font-bold text-xs mb-2" style={{ color: selectedIdea === "__custom__" ? accentColor : "rgba(255,255,255,0.5)" }}>
              ✏️ Or type your own idea...
            </p>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => { setCustomTopic(e.target.value); setSelectedIdea("__custom__") }}
              onFocus={() => setSelectedIdea("__custom__")}
              onKeyDown={(e) => { if (e.key === "Enter" && canBuild) buildPage() }}
              placeholder="e.g. my favourite band, cooking, superheroes..."
              className="w-full bg-transparent text-sm font-space outline-none"
              style={{ color: "white", caretColor: accentColor }}
            />
          </motion.div>

          {/* Build button */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={buildPage}
            disabled={isLoading || !canBuild}
            className="w-full py-4 rounded-2xl font-orbitron font-black text-base tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background:  `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
              color:       "#050510",
              boxShadow:   canBuild ? `0 0 30px ${accentColor}35` : "none",
            }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="inline-block animate-spin">⟳</span>
                Building your page...
              </span>
            ) : "🚀 Build My Page!"}
          </motion.button>

          {/* Status messages */}
          <AnimatePresence>
            {messages.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
                {messages.map((msg) => (
                  <p key={msg.id} className="text-sm font-space text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {msg.text}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // BUILDER PHASE
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* Mobile tabs */}
      <div className="flex lg:hidden border-b flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        {(["chat", "code", "preview"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setActivePanel(p)}
            className="flex-1 py-2.5 text-xs font-orbitron font-bold uppercase tracking-wider transition-all"
            style={
              activePanel === p
                ? { color: accentColor, borderBottom: `2px solid ${accentColor}`, background: `${accentColor}08` }
                : { color: "rgba(255,255,255,0.3)" }
            }
          >
            {p === "chat" ? "💬 Chat" : p === "code" ? "💻 Code" : "👁 Preview"}
          </button>
        ))}
      </div>

      {/* 3-panel grid */}
      <div className="flex-1 grid lg:grid-cols-3 overflow-hidden">

        {/* ── CHAT PANEL ───────────────────────────────────────── */}
        <div
          className={`flex flex-col border-r overflow-hidden ${activePanel !== "chat" ? "hidden lg:flex" : "flex"}`}
          style={{ borderColor: "rgba(255,255,255,0.08)", ...panelBorder("chat") }}
        >
          <div className="px-4 py-3 border-b flex items-center gap-2 flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}>
            <span className="text-sm font-orbitron font-bold" style={{ color: accentColor }}>💬 Chat with AI</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-xs font-space text-center py-10" style={{ color: "rgba(255,255,255,0.2)" }}>
                Your conversation will appear here
              </p>
            )}
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "system" ? (
                  <p className="text-xs font-space text-center w-full" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {msg.text}
                  </p>
                ) : (
                  <div
                    className="max-w-[88%] px-3.5 py-2.5 rounded-2xl text-sm font-space leading-relaxed"
                    style={
                      msg.role === "user"
                        ? { background: `${accentColor}20`, border: `1px solid ${accentColor}35`, color: "white" }
                        : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)" }
                    }
                  >
                    {msg.role === "ai" && (
                      <span className="text-xs font-bold block mb-1" style={{ color: accentColor }}>🤖 Byte</span>
                    )}
                    {msg.text}
                  </div>
                )}
              </motion.div>
            ))}
            <AnimatePresence>
              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
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

          <div className="p-3 flex-shrink-0 border-t" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.15)" }}>
            <div
              className="flex gap-2 rounded-xl overflow-hidden transition-all duration-150"
              style={{ border: `1px solid ${isLoading ? "rgba(255,255,255,0.08)" : `${accentColor}50`}`, background: "rgba(255,255,255,0.03)" }}
            >
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); applyEdit() } }}
                disabled={isLoading}
                placeholder="Tell Byte what to change..."
                className="flex-1 bg-transparent px-3 py-2.5 text-sm font-space outline-none"
                style={{ color: "white", caretColor: accentColor }}
              />
              <button
                onClick={applyEdit}
                disabled={isLoading || !promptInput.trim()}
                className="px-3 py-2.5 font-orbitron font-black text-sm transition-all disabled:opacity-30"
                style={{ color: accentColor }}
              >
                →
              </button>
            </div>
            <p className="text-xs font-space mt-1.5 text-center" style={{ color: "rgba(255,255,255,0.18)" }}>
              e.g. &quot;make the background dark blue&quot; · &quot;add a fun fact&quot;
            </p>
          </div>
        </div>

        {/* ── CODE EDITOR ──────────────────────────────────────── */}
        <div
          className={`flex flex-col border-r overflow-hidden ${activePanel !== "code" ? "hidden lg:flex" : "flex"}`}
          style={{ borderColor: "rgba(255,255,255,0.08)", ...panelBorder("code") }}
        >
          <div className="px-4 py-3 border-b flex items-center justify-between flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.3)" }}>
            <span className="text-sm font-orbitron font-bold" style={{ color: accentColor }}>💻 Code Editor</span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
            </div>
          </div>
          <textarea
            ref={codeRef}
            value={code}
            onChange={handleCodeChange}
            onKeyDown={handleTabKey}
            spellCheck={false}
            className="flex-1 p-4 text-xs font-mono resize-none outline-none overflow-auto"
            style={{ background: "#07071a", color: "#e2e8f0", lineHeight: "1.75", tabSize: 2 }}
          />
        </div>

        {/* ── PREVIEW ──────────────────────────────────────────── */}
        <div
          className={`flex flex-col overflow-hidden ${activePanel !== "preview" ? "hidden lg:flex" : "flex"}`}
          style={panelBorder("preview")}
        >
          <div className="px-4 py-3 border-b flex items-center justify-between flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#28c840" }} />
              <span className="text-sm font-orbitron font-bold" style={{ color: accentColor }}>👁 Live Preview</span>
            </div>
            <button
              onClick={downloadPage}
              className="text-xs font-orbitron font-bold px-3 py-1.5 rounded-lg transition-all"
              style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}35`, color: accentColor }}
            >
              ↓ Download
            </button>
          </div>
          <iframe
            srcDoc={previewCode || `<body style="font-family:sans-serif;padding:24px;color:#999;background:#f9f9f9;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0"><p style="text-align:center;font-size:18px">✨ Your page will appear here</p></body>`}
            sandbox="allow-scripts"
            className="flex-1"
            style={{ border: "none", background: "white" }}
            title="Live preview"
          />
        </div>
      </div>

      {/* Tutorial overlay */}
      {tutActive && currentTutStep && (
        <TutorialOverlay
          step={currentTutStep}
          stepIndex={tutStep}
          maxSteps={tutorialSteps.length}
          onNext={() => setTutStep((s) => s + 1)}
          onSkip={() => { setTutStep(tutorialSteps.length); markTutorialDone() }}
          accentColor={accentColor}
          name={profile?.name?.split(" ")[0]}
        />
      )}
    </div>
  )
}
