"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"

const AnimatedBackground = dynamic(
  () => import("@/components/layout/AnimatedBackground").then((m) => m.AnimatedBackground),
  { ssr: false }
)
import { WebBuilder } from "@/components/builder/WebBuilder"
import { CompanionBuilder } from "@/components/builder/CompanionBuilder"
import { getStageById } from "@/stages"
import { getProfile } from "@/lib/profile"
import type { ChildProfile } from "@/types/profile"

const STAGE_COLORS: Record<string, string> = {
  "stage-1": "#ffb800",
  "stage-2": "#ff0080",
  "stage-3": "#00d4ff",
  "stage-4": "#00ff88",
  "stage-5": "#7c3aed",
  "stage-6": "#ff6b35",
  "stage-7": "#00d4ff",
  "stage-8": "#a855f7",
}

export default function BuildPage({ params }: { params: Promise<{ stageId: string }> }) {
  const { stageId } = use(params)
  const stage       = getStageById(stageId)
  const router      = useRouter()

  const [profile, setProfile]   = useState<ChildProfile | null | "loading">("loading")
  const [showHelp, setShowHelp] = useState(false)

  // Check profile on mount — redirect to onboarding if missing
  useEffect(() => {
    const p = getProfile()
    if (!p) {
      router.replace(`/child/onboarding`)
    } else {
      setProfile(p)
    }
  }, [router])

  if (!stage || !stage.project) notFound()

  const color = STAGE_COLORS[stageId] ?? "#00d4ff"

  // Show nothing while checking localStorage
  if (profile === "loading") {
    return <div className="min-h-screen" style={{ background: "#050510" }} suppressHydrationWarning />
  }

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Top bar */}
      <header
        className="relative z-20 flex-shrink-0 flex items-center justify-between px-4 h-14 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(5,5,16,0.88)", backdropFilter: "blur(16px)" }}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="flex items-center gap-1.5 text-sm font-space" style={{ color: "rgba(255,255,255,0.4)" }}>
              ← Back
            </button>
          </Link>
          <div className="hidden sm:block w-px h-4" style={{ background: "rgba(255,255,255,0.12)" }} />
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-lg">{stage.mascot}</span>
            <div>
              <p className="text-xs font-orbitron font-bold" style={{ color }}>Stage {stage.number}</p>
              <p className="text-xs font-space" style={{ color: "rgba(255,255,255,0.4)" }}>{stage.project!.theme}</p>
            </div>
          </div>
        </div>

        {/* Centre: who's building */}
        {profile && typeof profile === "object" && profile.name && (
          <p className="text-xs font-orbitron font-bold hidden md:block" style={{ color: "rgba(255,255,255,0.3)" }}>
            {profile.name}&apos;s builder
          </p>
        )}

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHelp((v) => !v)}
            className="text-xs font-orbitron font-bold px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
          >
            ? Help
          </button>
        </div>
      </header>

      {/* Help overlay */}
      {showHelp && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center p-6"
          style={{ background: "rgba(5,5,16,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowHelp(false)}
        >
          <div
            className="max-w-md w-full rounded-2xl p-6 space-y-4"
            style={{ background: "rgba(10,15,40,0.95)", border: `1px solid ${color}30`, boxShadow: `0 0 40px ${color}15` }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-orbitron font-bold text-lg text-white">
              {stage.project!.builderType === "companion" ? "How to build your companion" : "How to use the builder"}
            </h2>

            {stage.project!.builderType === "companion" ? (
              <div className="space-y-3 text-sm font-space" style={{ color: "rgba(255,255,255,0.7)" }}>
                {[
                  { icon: "🎨", title: "Design steps", desc: "Pick a type, name, personality, and special skill — one step at a time!" },
                  { icon: "✨", title: "Bring to life", desc: "Hit the big button and your companion will appear, ready to chat!" },
                  { icon: "💬", title: "Chat away", desc: "Ask anything! Your companion will stay in character. Use the suggestion buttons for ideas." },
                  { icon: "📥", title: "Profile card", desc: "Download your companion's profile card to keep or show your friends." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <p><strong style={{ color }}>{title}</strong> — {desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 text-sm font-space" style={{ color: "rgba(255,255,255,0.7)" }}>
                {[
                  { icon: "💬", title: "Chat panel", desc: "Type what you want to change and press Enter. Byte will update your code!" },
                  { icon: "💻", title: "Code editor", desc: "Edit the HTML directly. Your preview updates as you type. Tab = indent." },
                  { icon: "👁",  title: "Live preview", desc: "See your page in real time. Hit Download to save it to your computer!" },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <p><strong style={{ color }}>{title}</strong> — {desc}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 space-y-1">
              <p className="text-xs font-orbitron font-bold" style={{ color }}>
                {stage.project!.builderType === "companion" ? "Try asking your companion:" : "Try saying to Byte:"}
              </p>
              {stage.project!.builderType === "companion" ? (
                ["Tell me the most surprising fact you know!", "What&apos;s your favourite thing about yourself?", "Tell me a story about your biggest adventure."].map((ex) => (
                  <p key={ex} className="text-xs font-space px-3 py-1.5 rounded-lg" style={{ background: `${color}10`, color: "rgba(255,255,255,0.6)" }}>{ex}</p>
                ))
              ) : (
                ["make the background dark blue", "add a section about speed records", "change the heading colour to orange"].map((ex) => (
                  <p key={ex} className="text-xs font-space px-3 py-1.5 rounded-lg" style={{ background: `${color}10`, color: "rgba(255,255,255,0.6)" }}>&quot;{ex}&quot;</p>
                ))
              )}
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="w-full py-3 rounded-xl font-orbitron font-bold text-sm"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, color: "#050510" }}
            >
              Got it — let&apos;s build! 🚀
            </button>
          </div>
        </div>
      )}

      {/* Builder */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        {stage.project!.builderType === "companion" ? (
          <CompanionBuilder
            project={stage.project!}
            accentColor={color}
            profile={typeof profile === "object" ? profile : null}
          />
        ) : (
          <WebBuilder
            project={stage.project!}
            accentColor={color}
            profile={typeof profile === "object" ? profile : null}
          />
        )}
      </div>
    </div>
  )
}
