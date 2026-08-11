import type { ReactNode } from "react"
import { SectionHeader } from "./SectionHeader"

interface CatalogSectionProps {
  label: string
  count: number
  hint?: string
  showAllLabel?: string
  onShowAll?: () => void
  children: ReactNode
}

export function CatalogSection({
  label,
  count,
  hint,
  showAllLabel,
  onShowAll,
  children,
}: CatalogSectionProps) {
  if (count === 0) return null
  return (
    <section className="mt-10">
      <SectionHeader label={label} count={count} hint={hint} />
      {children}
      {onShowAll && (
        <button
          onClick={onShowAll}
          className="mt-4 rounded-[9px] border border-border bg-surface px-3.5 py-1.5 text-[13.5px] text-ink-body transition-colors hover:border-pink-border hover:bg-pink-wash hover:text-pink-ink"
        >
          {showAllLabel}
        </button>
      )}
    </section>
  )
}
