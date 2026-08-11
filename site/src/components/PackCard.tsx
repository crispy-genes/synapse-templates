import { Link } from "react-router-dom"
import type { PackEntry } from "../types/pack"
import { itemRoute, packComposition } from "../lib/catalog"
import { KindBadge } from "./KindBadge"

interface PackCardProps {
  pack: PackEntry
}

export function PackCard({ pack }: PackCardProps) {
  return (
    <Link
      to={itemRoute("pack", pack.name)}
      className="group flex flex-col gap-2.5 rounded-[14px] border border-border bg-surface p-[18px] no-underline transition-colors hover:border-pink-border hover:bg-pink-card"
    >
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[15px] font-medium text-ink">{pack.name}</span>
        <KindBadge kind="pack" hasIcon isInteractive />
      </div>
      <p className="text-[13.5px] leading-relaxed text-ink-muted">{pack.description}</p>
      <p className="mt-auto pt-1 font-mono text-[11.5px] text-ink-faint">
        {packComposition(pack)}
      </p>
    </Link>
  )
}
