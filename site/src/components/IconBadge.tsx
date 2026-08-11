import type { CatalogKind } from "../types/kind"
import { KindIcon } from "./KindIcon"

interface IconBadgeProps {
  kind: CatalogKind
  isInteractive?: boolean
}

export function IconBadge({ kind, isInteractive = false }: IconBadgeProps) {
  const hover = isInteractive
    ? " transition-colors group-hover:border-pink-border group-hover:bg-pink-tint group-hover:text-pink"
    : ""
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-muted text-ink-muted${hover}`}
    >
      <KindIcon kind={kind} size={14} />
    </span>
  )
}
