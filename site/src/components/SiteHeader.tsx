import { Link } from "react-router-dom"
import { DOCS_URL, GITHUB_URL, SITE_VERSION } from "../constants/site"
import synapseLogo from "../local-assets/synapse-logo.png"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 h-16 border-b border-border bg-[rgba(251,250,249,0.88)] backdrop-blur-[10px]">
      <div className="flex h-full items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <img src={synapseLogo} alt="Synapse" className="h-8 w-8" />
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-subtle!">
            Templates
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-ink-muted">
            {SITE_VERSION}
          </span>
          <a
            href={DOCS_URL}
            className="text-[13.5px] text-ink-muted! transition-colors hover:text-ink!"
          >
            Docs
          </a>
          <a
            href={GITHUB_URL}
            className="text-[13.5px] text-ink-muted! transition-colors hover:text-ink!"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}
