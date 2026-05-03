import { cn } from "@/lib/utils"

type GlassVariant = "default" | "pink" | "gold" | "green" | "elevated"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: GlassVariant
  glow?: boolean
  hover?: boolean
  onClick?: () => void
}

const variantStyles: Record<GlassVariant, string> = {
  default:  "glass",
  pink:     "glass-pink",
  gold:     "glass-gold",
  green:    "bg-[rgba(0,40,20,0.65)] border border-[rgba(0,255,136,0.2)] backdrop-blur-xl",
  elevated: "bg-[rgba(15,20,55,0.8)] border border-[rgba(0,212,255,0.25)] backdrop-blur-2xl",
}

const glowStyles: Record<GlassVariant, string> = {
  default:  "border-glow-cyan",
  pink:     "border-glow-pink",
  gold:     "border-glow-gold",
  green:    "shadow-[0_0_15px_rgba(0,255,136,0.2),inset_0_0_15px_rgba(0,255,136,0.05)]",
  elevated: "border-glow-cyan",
}

export function GlassCard({
  children,
  className,
  variant = "default",
  glow = false,
  hover = false,
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl",
        variantStyles[variant],
        glow && glowStyles[variant],
        hover && "cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:brightness-110",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  )
}
