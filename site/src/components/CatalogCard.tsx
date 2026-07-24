import { Link } from "react-router-dom"
import type { BadgeType } from "../types/badge"
import { Badge } from "./Badge"
import { TagPill } from "./TagPill"

interface CatalogCardProps {
  to: string
  name: string
  type: BadgeType
  description: string
  tags?: string[]
}

export function CatalogCard({ to, name, type, description, tags = [] }: CatalogCardProps) {
  return (
    <Link
      to={to}
      className="block rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-brand-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500"
    >
      <div className="mb-1 flex items-center gap-2 font-semibold">
        {name} <Badge type={type} />
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
      {tags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      )}
    </Link>
  )
}
