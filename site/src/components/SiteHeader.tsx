import { Link } from "react-router-dom"

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-bold">
          synapse<span className="text-indigo-600 dark:text-indigo-400">-templates</span>
        </Link>
        <a
          href="https://github.com/crispy-genes/synapse-templates"
          className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          GitHub
        </a>
      </div>
    </header>
  )
}
