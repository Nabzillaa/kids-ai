"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XPPopup } from "@/components/gamification/XPPopup"
import type { Lesson } from "@/types/stage"

// ── Simple markdown renderer ──────────────────────────────────────────────────
// Handles the subset of markdown used in lesson content:
// headings, bold/italic, inline code, fenced code blocks, lists, tables, blockquotes.

function renderInline(text: string): React.ReactNode[] {
  // Split on **, *, `  in order. Returns array of ReactNode.
  const parts: React.ReactNode[] = []
  let i = 0
  let buf = ""

  while (i < text.length) {
    // Bold: **...**
    if (text[i] === "*" && text[i + 1] === "*") {
      const end = text.indexOf("**", i + 2)
      if (end !== -1) {
        if (buf) { parts.push(buf); buf = "" }
        parts.push(<strong key={i} style={{ color: "white", fontWeight: 700 }}>{text.slice(i + 2, end)}</strong>)
        i = end + 2
        continue
      }
    }
    // Italic: *...*
    if (text[i] === "*" && text[i + 1] !== "*") {
      const end = text.indexOf("*", i + 1)
      if (end !== -1) {
        if (buf) { parts.push(buf); buf = "" }
        parts.push(<em key={i}>{text.slice(i + 1, end)}</em>)
        i = end + 1
        continue
      }
    }
    // Inline code: `...`
    if (text[i] === "`") {
      const end = text.indexOf("`", i + 1)
      if (end !== -1) {
        if (buf) { parts.push(buf); buf = "" }
        parts.push(
          <code
            key={i}
            className="font-mono text-xs px-1.5 py-0.5 rounded"
            style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)" }}
          >
            {text.slice(i + 1, end)}
          </code>
        )
        i = end + 1
        continue
      }
    }
    buf += text[i]
    i++
  }
  if (buf) parts.push(buf)
  return parts
}

function renderTable(lines: string[], accentColor: string): React.ReactNode {
  const rows = lines.map((l) =>
    l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim())
  )
  const header = rows[0]
  // row[1] is the separator row (|---|---|) — skip it
  const body = rows.slice(2)
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {header.map((cell, ci) => (
              <th
                key={ci}
                className="px-3 py-2 text-left font-orbitron font-bold text-xs"
                style={{ borderBottom: `2px solid ${accentColor}40`, color: accentColor }}
              >
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-xs font-space" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function renderMarkdown(content: string, accentColor: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const lines = content.split("\n")
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim() || "text"
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      nodes.push(
        <div key={i} className="my-4 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
          {lang !== "text" && (
            <div className="px-4 py-1.5 text-xs font-mono font-bold" style={{ background: "rgba(0,212,255,0.08)", color: "#00d4ff", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
              {lang}
            </div>
          )}
          <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed" style={{ background: "#07071a", color: "#a5f3fc", margin: 0 }}>
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>
      )
      i++
      continue
    }

    // Heading
    const h3 = line.match(/^### (.+)/)
    const h2 = line.match(/^## (.+)/)
    const h1 = line.match(/^# (.+)/)
    if (h1) {
      nodes.push(
        <h1 key={i} className="text-2xl font-orbitron font-black text-white mt-6 mb-3 first:mt-0">
          {renderInline(h1[1])}
        </h1>
      )
      i++; continue
    }
    if (h2) {
      nodes.push(
        <h2 key={i} className="text-lg font-orbitron font-bold mt-5 mb-2" style={{ color: accentColor }}>
          {renderInline(h2[1])}
        </h2>
      )
      i++; continue
    }
    if (h3) {
      nodes.push(
        <h3 key={i} className="text-sm font-orbitron font-bold uppercase tracking-widest mt-4 mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
          {renderInline(h3[1])}
        </h3>
      )
      i++; continue
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [line.slice(2)]
      i++
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2))
        i++
      }
      nodes.push(
        <blockquote
          key={i}
          className="my-3 pl-4 py-3 rounded-r-xl font-space text-sm leading-relaxed italic"
          style={{ borderLeft: `3px solid ${accentColor}`, background: `${accentColor}08`, color: "rgba(255,255,255,0.75)" }}
        >
          {quoteLines.map((ql, qi) => <p key={qi}>{renderInline(ql)}</p>)}
        </blockquote>
      )
      continue
    }

    // Table (starts with |)
    if (line.startsWith("|")) {
      const tableLines: string[] = [line]
      i++
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i])
        i++
      }
      nodes.push(<div key={i}>{renderTable(tableLines, accentColor)}</div>)
      continue
    }

    // Unordered list
    if (line.match(/^[-*] /)) {
      const items: string[] = [line.slice(2)]
      i++
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        items.push(lines[i].slice(2))
        i++
      }
      nodes.push(
        <ul key={i} className="my-3 space-y-2 pl-1">
          {items.map((item, ii) => (
            <li key={ii} className="flex gap-2 text-sm font-space" style={{ color: "rgba(255,255,255,0.75)" }}>
              <span className="flex-shrink-0 mt-0.5" style={{ color: accentColor }}>▸</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Empty line
    if (!line.trim()) {
      i++; continue
    }

    // Paragraph
    const paraLines: string[] = [line]
    i++
    while (i < lines.length && lines[i].trim() && !lines[i].match(/^[#>|`\-*]/) && !lines[i].startsWith("```")) {
      paraLines.push(lines[i])
      i++
    }
    nodes.push(
      <p key={i} className="text-sm font-space leading-relaxed my-2" style={{ color: "rgba(255,255,255,0.75)" }}>
        {renderInline(paraLines.join(" "))}
      </p>
    )
  }

  return nodes
}

// ── Component ────────────────────────────────────────────────────────────────

interface LessonViewerProps {
  lesson: Lesson
  lessonIndex: number
  totalLessons: number
  accentColor: string
  isCompleted: boolean
  onComplete: (xp: number) => void
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  unlockedActivityTitles?: string[]
}

export function LessonViewer({
  lesson,
  lessonIndex,
  totalLessons,
  accentColor,
  isCompleted,
  onComplete,
  onClose,
  onNext,
  onPrev,
  unlockedActivityTitles = [],
}: LessonViewerProps) {
  const [showXP, setShowXP] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)

  const handleComplete = () => {
    if (isCompleted || justCompleted) return
    setJustCompleted(true)
    setShowXP(true)
    onComplete(lesson.xpReward)
  }

  const done = isCompleted || justCompleted

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-5"
    >
      {/* Back + breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-space"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          ← All Lessons
        </button>
        <span className="text-xs font-orbitron font-bold" style={{ color: "rgba(255,255,255,0.25)" }}>
          {lessonIndex + 1} / {totalLessons}
        </span>
      </div>

      {/* Lesson header */}
      <div
        className="p-5 rounded-2xl"
        style={{ background: `${accentColor}08`, border: `1px solid ${accentColor}20` }}
      >
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-orbitron font-black text-sm flex-shrink-0"
            style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}35`, color: accentColor }}
          >
            {lessonIndex + 1}
          </div>
          <div>
            <p className="text-xs font-orbitron font-bold tracking-widest uppercase mb-1" style={{ color: accentColor }}>
              Lesson · {lesson.durationMinutes} min · +{lesson.xpReward} XP
            </p>
            <h2 className="text-xl font-orbitron font-bold text-white">{lesson.title}</h2>
            <p className="text-sm font-space mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{lesson.summary}</p>
          </div>
        </div>

        {/* Key concept */}
        <div className="flex gap-3 items-start p-3 rounded-xl mt-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-base flex-shrink-0">🔑</span>
          <div>
            <p className="text-xs font-orbitron font-bold mb-0.5" style={{ color: accentColor }}>Key Concept</p>
            <p className="text-xs font-space leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              {lesson.keyConcept}
            </p>
          </div>
        </div>
      </div>

      {/* Lesson content */}
      <div
        className="p-5 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="prose-kids">
          {renderMarkdown(lesson.content, accentColor)}
        </div>
      </div>

      {/* Unlocked activities */}
      {unlockedActivityTitles.length > 0 && (
        <div
          className="p-4 rounded-2xl"
          style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)" }}
        >
          <p className="text-xs font-orbitron font-bold mb-2" style={{ color: "#00ff88" }}>
            🔓 Completes this lesson to unlock:
          </p>
          <div className="flex flex-wrap gap-2">
            {unlockedActivityTitles.map((title) => (
              <span
                key={title}
                className="text-xs font-space px-2.5 py-1 rounded-lg"
                style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "rgba(0,255,136,0.8)" }}
              >
                {title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Complete button + nav */}
      <div className="flex gap-3 flex-wrap">
        {onPrev && (
          <button
            onClick={onPrev}
            className="px-4 py-3 rounded-xl text-sm font-orbitron font-bold flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
          >
            ← Prev
          </button>
        )}

        <button
          onClick={handleComplete}
          disabled={done}
          className="flex-1 py-3 rounded-xl font-orbitron font-bold text-sm tracking-wide transition-all"
          style={
            done
              ? { background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.3)", color: "#00ff88" }
              : {
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                  color: "#050510",
                  boxShadow: `0 0 20px ${accentColor}40`,
                }
          }
        >
          {done ? "✅ Lesson Complete!" : `✅ Mark Complete  +${lesson.xpReward} XP`}
        </button>

        {onNext && (
          <button
            onClick={onNext}
            className="px-4 py-3 rounded-xl text-sm font-orbitron font-bold flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
          >
            Next →
          </button>
        )}
      </div>

      <XPPopup xp={lesson.xpReward} show={showXP} accentColor={accentColor} />
    </motion.div>
  )
}
