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
      className="group flex items-center gap-3.5 rounded-lg border border-transparent border-b-divider px-2.5 py-[11px] no-underline transition-colors hover:border-pink-border hover:bg-pink-wash"
    >
      <IconBadge kind={kind} isInteractive />
      <span className="w-[210px] shrink-0 truncate font-mono text-[13.5px] text-ink!">{name}</span>
      <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink-muted">{description}</span>
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
