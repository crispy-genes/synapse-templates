import { Link } from "react-router-dom"
import { DOCS_URL, GITHUB_URL, SITE_VERSION } from "../constants/site"
import synapseLogo from "../local-assets/synapse-logo.png"

interface MenuToggleIconProps {
  isOpen: boolean
}

function MenuToggleIcon({ isOpen }: MenuToggleIconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      {isOpen ? (
        <>
          <path d="M4 4l10 10" />
          <path d="M14 4L4 14" />
        </>
      ) : (
        <>
          <path d="M3 5h12" />
          <path d="M3 9h12" />
          <path d="M3 13h12" />
        </>
      )}
    </svg>
  )
}

interface SiteHeaderProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export function SiteHeader({ isSidebarOpen, onToggleSidebar }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-20 h-16 border-b border-border bg-[rgba(251,250,249,0.88)] backdrop-blur-[10px]">
      <div className="relative flex h-full items-center justify-between px-4 md:px-6">
        <button
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={isSidebarOpen}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink md:hidden"
        >
          <MenuToggleIcon isOpen={isSidebarOpen} />
        </button>
        <Link
          to="/"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5 no-underline md:static md:translate-x-0"
        >
          <img src={synapseLogo} alt="Synapse" className="h-8 w-8" />
          <span className="hidden font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-subtle! md:inline">
            Templates
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <span className="hidden rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-ink-muted md:inline">
            {SITE_VERSION}
          </span>
          <a
            href={DOCS_URL}
            className="hidden text-[13.5px] text-ink-muted! transition-colors hover:text-ink! md:inline"
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
