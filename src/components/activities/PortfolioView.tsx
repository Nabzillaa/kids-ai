"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "@/components/layout/GlassCard"
import { getStories, type StoryEntry } from "@/lib/storybook"
import type { Stage } from "@/types/stage"

interface PortfolioViewProps {
  stage: Stage
  accentColor: string
  completedActivityIds: string[]
}

function buildPortfolioHTML(title: string, entries: StoryEntry[], accentHex: string): string {
  const sections = entries
    .map(
      (e) => `
      <section class="section">
        <h2 class="section-title">${e.activityTitle}</h2>
        <div class="section-content">${e.content.replace(/\n/g, "<br>")}</div>
      </section>`
    )
    .join("")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Georgia, serif; background: #0f0f1a; color: #e2e8f0; max-width: 800px; margin: 0 auto; padding: 40px 24px; }
    .cover { text-align: center; padding: 60px 0 40px; border-bottom: 2px solid ${accentHex}40; margin-bottom: 40px; }
    .badge { display: inline-block; font-family: monospace; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: ${accentHex}; border: 1px solid ${accentHex}40; border-radius: 20px; padding: 6px 16px; margin-bottom: 20px; }
    .cover h1 { font-size: 2.4rem; color: white; line-height: 1.2; margin-bottom: 12px; }
    .cover p { font-size: 1rem; color: rgba(255,255,255,0.5); }
    .section { margin-bottom: 48px; padding: 28px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; }
    .section-title { font-family: monospace; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; color: ${accentHex}; margin-bottom: 16px; }
    .section-content { font-size: 1rem; line-height: 1.8; color: rgba(255,255,255,0.8); white-space: pre-wrap; }
    .footer { text-align: center; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 0.8rem; color: rgba(255,255,255,0.3); }
  </style>
</head>
<body>
  <div class="cover">
    <div class="badge">Character Portfolio</div>
    <h1>${title}</h1>
    <p>Created with AI · Cyber Academy</p>
  </div>
  ${sections}
  <div class="footer">Built with Cyber Academy · Stage 2: AI Builders</div>
</body>
</html>`
}

export function PortfolioView({ stage, accentColor, completedActivityIds }: PortfolioViewProps) {
  const [entries, setEntries] = useState<StoryEntry[]>([])
  const [mounted, setMounted] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [portfolioTitle, setPortfolioTitle] = useState("My Character Portfolio")
  const [editingTitle, setEditingTitle] = useState(false)

  useEffect(() => {
    setMounted(true)
    const all = getStories()
    const portfolioActivityIds = new Set(stage.output.activityIds)
    const filtered = all.filter(
      (s) => s.stageId === stage.id && portfolioActivityIds.has(s.activityId)
    )
    setEntries(filtered)
  }, [stage.id, stage.output.activityIds])

  if (!mounted) return null

  const required = stage.output.minActivitiesRequired
  const doneCount = stage.output.activityIds.filter((aid) => completedActivityIds.includes(aid)).length
  const savedCount = entries.length
  const canDownload = savedCount >= required

  const handleDownload = () => {
    const html = buildPortfolioHTML(portfolioTitle, entries, accentColor)
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${portfolioTitle.replace(/\s+/g, "-").toLowerCase()}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-5">
      {/* Portfolio header */}
      <GlassCard className="p-5" glow>
        <div className="flex items-start gap-4">
          <div className="text-4xl flex-shrink-0">🦊</div>
          <div className="flex-1">
            {editingTitle ? (
              <input
                autoFocus
                type="text"
                value={portfolioTitle}
                onChange={(e) => setPortfolioTitle(e.target.value)}
                onBlur={() => setEditingTitle(false)}
                onKeyDown={(e) => { if (e.key === "Enter") setEditingTitle(false) }}
                className="w-full bg-transparent text-xl font-orbitron font-bold text-white outline-none"
                style={{ borderBottom: `2px solid ${accentColor}` }}
              />
            ) : (
              <button
                onClick={() => setEditingTitle(true)}
                className="text-left group"
              >
                <h2 className="text-xl font-orbitron font-bold text-white group-hover:opacity-70 transition-opacity">
                  {portfolioTitle} ✏️
                </h2>
              </button>
            )}
            <p className="text-sm font-space mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
              {stage.output.description}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs font-orbitron font-bold mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
            <span>SECTIONS SAVED</span>
            <span style={{ color: accentColor }}>{savedCount} / {required} min</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`, boxShadow: `0 0 8px ${accentColor}60` }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((savedCount / required) * 100, 100)}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-xs font-space mt-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>
            <span>{doneCount} activities completed</span>
            <span>{canDownload ? "Ready to download!" : `${required - savedCount} more sections needed`}</span>
          </div>
        </div>
      </GlassCard>

      {/* Empty state */}
      {entries.length === 0 && (
        <GlassCard className="p-10 text-center">
          <div className="text-4xl mb-4">📝</div>
          <p className="font-orbitron font-bold text-white mb-2">Portfolio is empty</p>
          <p className="text-sm font-space mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>
            Complete activities in the Activities tab and save them to build your portfolio.
          </p>
          <p className="text-xs font-space mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>
            Activities marked ✦ contribute to this portfolio
          </p>
        </GlassCard>
      )}

      {/* Portfolio sections */}
      <div className="space-y-3">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                className="w-full p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-orbitron font-black flex-shrink-0"
                    style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}30`, color: accentColor }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-orbitron font-bold text-white truncate">{entry.activityTitle}</p>
                    <p className="text-xs font-space mt-0.5 line-clamp-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {entry.content.slice(0, 80)}...
                    </p>
                  </div>
                  <span className="text-sm flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {expanded === entry.id ? "▲" : "▼"}
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {expanded === entry.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3">
                      <div className="h-px" style={{ background: `${accentColor}20` }} />
                      <p className="text-sm font-space leading-relaxed whitespace-pre-wrap" style={{ color: "rgba(255,255,255,0.8)" }}>
                        {entry.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Download button */}
      {canDownload && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleDownload}
          className="w-full py-4 rounded-xl font-orbitron font-bold text-sm tracking-wide"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
            color: "#050510",
            boxShadow: `0 0 25px ${accentColor}40`,
          }}
        >
          📥 Download My Portfolio
        </motion.button>
      )}

      {/* How to add sections hint */}
      <GlassCard className="p-4">
        <p className="text-xs font-orbitron font-bold mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          HOW TO ADD SECTIONS
        </p>
        <p className="text-xs font-space leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
          Go to <strong style={{ color: accentColor }}>Activities</strong> → complete any activity → hit{" "}
          <strong style={{ color: accentColor }}>"Save to Story Book"</strong>. Portfolio activities automatically appear here.
        </p>
      </GlassCard>
    </div>
  )
}
