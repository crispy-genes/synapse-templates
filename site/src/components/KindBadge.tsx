import type { CatalogKind } from "../types/kind"
import { KindIcon } from "./KindIcon"

interface KindBadgeProps {
  kind: CatalogKind
  hasIcon?: boolean
  isInteractive?: boolean
}

export function KindBadge({ kind, hasIcon = false, isInteractive = false }: KindBadgeProps) {
  const hover = isInteractive
    ? " transition-colors group-hover:border-pink-border group-hover:bg-pink-tint group-hover:text-pink-ink"
    : ""
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink-subtle${hover}`}
    >
      {hasIcon && <KindIcon kind={kind} size={10} />}
      {kind}
    </span>
  )
}
