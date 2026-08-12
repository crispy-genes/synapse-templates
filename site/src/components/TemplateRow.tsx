import { Link } from "react-router-dom"
import type { CatalogKind } from "../types/kind"
import { CopyIcon } from "./CopyIcon"
import { IconBadge } from "./IconBadge"
import { TagPill } from "./TagPill"

interface TemplateRowProps {
  kind: CatalogKind
  name: string
  description: string
  to: string
  tags?: string[]
  copyCommand?: string
}

export function TemplateRow({
  kind,
  name,
  description,
  to,
  tags = [],
  copyCommand,
}: TemplateRowProps) {
  return (
    <Link
      to={to}
      className="group flex items-start gap-3.5 rounded-lg border border-transparent border-b-divider px-2.5 py-[11px] no-underline transition-colors hover:border-pink-border hover:bg-pink-wash sm:items-center"
    >
      <IconBadge kind={kind} isInteractive />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3.5">
        <span className="truncate font-mono text-[13.5px] text-ink! sm:w-[210px] sm:shrink-0">
          {name}
        </span>
        <span className="line-clamp-2 min-w-0 text-[13.5px] text-ink-muted sm:line-clamp-1 sm:flex-1">
          {description}
        </span>
      </span>
      {tags.length > 0 && (
        <span className="hidden shrink-0 gap-1.5 lg:flex">
          {tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </span>
      )}
      {copyCommand && <CopyIcon command={copyCommand} />}
    </Link>
  )
}
