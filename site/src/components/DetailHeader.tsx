import { Link } from "react-router-dom"
import type { CatalogKind } from "../types/kind"
import { KindBadge } from "./KindBadge"
import { TagPill } from "./TagPill"

interface DetailHeaderProps {
  kind: CatalogKind
  name: string
  description: string
  tags?: string[]
  plainTags?: string[]
}

export function DetailHeader({ kind, name, description, tags = [], plainTags = [] }: DetailHeaderProps) {
  return (
    <div>
      <Link
        to="/"
        className="text-[13px] text-ink-subtle! no-underline transition-colors hover:text-pink-ink!"
      >
        ← All templates
      </Link>
      <div className="mt-6 flex flex-wrap items-center gap-x-3.5 gap-y-2">
        <h1 className="break-all font-mono text-[22px] font-medium tracking-[-0.02em] text-ink sm:text-[26px]">
          {name}
        </h1>
        <KindBadge kind={kind} hasIcon />
      </div>
      <p className="mt-3.5 max-w-[640px] text-[15.5px] leading-relaxed text-ink-muted">
        {description}
      </p>
      {(tags.length > 0 || plainTags.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <TagPill key={tag} tag={tag} isLink />
          ))}
          {plainTags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      )}
    </div>
  )
}
