import { Link } from "react-router-dom"

import synapseLogo from "../local-assets/synapse-logo.png"

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-end gap-1">
          <img
            src={synapseLogo}
            alt="Synapse"
            className="h-8 w-8 dark:rounded-md dark:bg-zinc-100 dark:p-0.5"
          />
          <span className="text-[10px] font-semibold uppercase leading-none tracking-widest text-ink dark:text-zinc-300">
            Templates
          </span>
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
