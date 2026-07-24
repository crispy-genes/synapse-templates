import { Link } from "react-router-dom"
import type { BadgeType } from "../types/badge"
import { Badge } from "./Badge"

interface DetailHeaderProps {
  type: BadgeType
  name: string
  description: string
}

export function DetailHeader({ type, name, description }: DetailHeaderProps) {
  return (
    <div className="mb-4">
      <Link to="/" className="text-sm text-brand-600 hover:underline dark:text-brand-400">
        ← catalog
      </Link>
      <h1 className="mt-2 mb-1 flex items-center gap-3 text-2xl font-bold">
        {name} <Badge type={type} />
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
  )
}
