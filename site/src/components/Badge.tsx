import type { BadgeType } from "../types/badge"

const COLORS: Record<BadgeType, string> = {
  agent: "text-cyan-700 bg-cyan-50 dark:text-cyan-300 dark:bg-cyan-950",
  rule: "text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-950",
  skill: "text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-950",
  fragment: "text-violet-700 bg-violet-50 dark:text-violet-300 dark:bg-violet-950",
  pack: "text-green-700 bg-green-50 dark:text-green-300 dark:bg-green-950",
}

interface BadgeProps {
  type: BadgeType
}

export function Badge({ type }: BadgeProps) {
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${COLORS[type]}`}
    >
      {type}
    </span>
  )
}
