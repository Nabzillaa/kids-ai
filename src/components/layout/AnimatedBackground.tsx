"use client"

// Cyber animated background — pure CSS, no heavy libraries.
// Renders: gradient orbs + grid pattern + scan line.

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Deep base */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, #0d0630 0%, #050510 60%)" }} />

      {/* Animated orb 1 — cyan */}
      <div
        className="absolute rounded-full"
        style={{
          width: "60vw",
          height: "60vw",
          top: "-20%",
          left: "-15%",
          background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, rgba(0,212,255,0.03) 50%, transparent 70%)",
          animation: "orb-float 14s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />

      {/* Animated orb 2 — pink */}
      <div
        className="absolute rounded-full"
        style={{
          width: "50vw",
          height: "50vw",
          bottom: "-15%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(255,0,128,0.10) 0%, rgba(255,0,128,0.02) 50%, transparent 70%)",
          animation: "orb-float 18s ease-in-out infinite reverse",
          filter: "blur(50px)",
        }}
      />

      {/* Orb 3 — purple mid */}
      <div
        className="absolute rounded-full"
        style={{
          width: "35vw",
          height: "35vw",
          top: "40%",
          left: "40%",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          animation: "orb-float 22s ease-in-out infinite",
          filter: "blur(60px)",
          animationDelay: "-7s",
        }}
      />

      {/* Grid lines — circuit board pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "grid-fade 8s ease-in-out infinite",
        }}
      />

      {/* Subtle scan line */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.15), rgba(0,212,255,0.4), rgba(0,212,255,0.15), transparent)",
          animation: "scan 8s linear infinite",
          filter: "blur(1px)",
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "30vh",
          background: "linear-gradient(to top, #050510, transparent)",
        }}
      />
    </div>
  )
}
