import { Link } from "react-router-dom"

interface TagPillProps {
  tag: string
  isLink?: boolean
}

const CHIP_CLASSES =
  "rounded-md bg-surface-muted px-2 py-0.5 font-mono text-[11px] text-ink-muted no-underline"

export function TagPill({ tag, isLink = false }: TagPillProps) {
  if (!isLink) return <span className={CHIP_CLASSES}>{tag}</span>
  return (
    <Link
      to={`/?tag=${encodeURIComponent(tag)}`}
      className={`${CHIP_CLASSES} text-ink-muted! transition-colors hover:bg-pink-tint hover:text-pink-ink!`}
    >
      {tag}
    </Link>
  )
}
