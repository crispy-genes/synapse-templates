interface SectionHeaderProps {
  label: string
  count: number
  hint?: string
}

export function SectionHeader({ label, count, hint }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline gap-2.5 border-b border-border pb-2.5">
      <h2 className="font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
        {label}
      </h2>
      <span className="font-mono text-[12px] text-ink-faint">{count}</span>
      {hint && <span className="ml-auto text-[12.5px] text-ink-subtle">{hint}</span>}
    </div>
  )
}
