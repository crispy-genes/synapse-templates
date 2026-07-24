import type { ReactNode } from "react"

interface PanelProps {
  title: string
  children: ReactNode
}

export function Panel({ title, children }: PanelProps) {
  return (
    <section className="my-4 rounded-xl border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-2.5 text-base font-semibold">{title}</h2>
      {children}
    </section>
  )
}
