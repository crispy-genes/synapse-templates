import type { ReactNode } from "react"

interface CatalogSectionProps {
  title: string
  count: number
  children: ReactNode
}

export function CatalogSection({ title, count, children }: CatalogSectionProps) {
  if (count === 0) return null
  return (
    <section className="mt-8">
      <h2 className="mb-3 flex items-baseline gap-2 text-lg font-semibold">
        {title} <span className="text-sm font-normal text-zinc-400">{count}</span>
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  )
}
