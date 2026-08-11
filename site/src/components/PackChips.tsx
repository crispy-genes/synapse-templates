import { Link } from "react-router-dom"
import type { PackEntry } from "../types/pack"
import { itemRoute } from "../lib/catalog"
import { SectionHeader } from "./SectionHeader"

interface PackChipsProps {
  packs: PackEntry[]
}

export function PackChips({ packs }: PackChipsProps) {
  if (packs.length === 0) return null
  return (
    <section>
      <SectionHeader label="Shipped in packs" count={packs.length} />
      <div className="mt-4 flex flex-wrap gap-2">
        {packs.map((pack) => (
          <Link
            key={pack.name}
            to={itemRoute("pack", pack.name)}
            className="rounded-md bg-pink-chip px-2.5 py-1 font-mono text-[12.5px] text-pink-ink! no-underline transition-colors hover:bg-pink hover:text-white!"
          >
            {pack.name}
          </Link>
        ))}
      </div>
    </section>
  )
}
