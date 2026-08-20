import type { ReactNode } from "react"
import type { CatalogKind } from "../types/kind"

const ICON_PATHS: Record<CatalogKind | "all", ReactNode> = {
  pack: (
    <>
      <path d="m12 3.5-8.5 4.5 8.5 4.5 8.5-4.5-8.5-4.5z" />
      <path d="m3.5 12.5 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
    </>
  ),
  agent: (
    <>
      <rect x="4.5" y="9.5" width="15" height="10.5" rx="3" />
      <path d="M12 9.5v-3" />
      <circle cx="12" cy="4.75" r="1.25" />
      <path d="M9.25 13.5v2.25M14.75 13.5v2.25" />
    </>
  ),
  skill: <path d="M13 2.5 4 14h6.5L11 21.5 20 10h-6.5L13 2.5z" />,
  rule: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <circle cx="4.5" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="18" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  hook: (
    <>
      <circle cx="14" cy="4.75" r="1.75" />
      <path d="M14 6.5v9a4.5 4.5 0 0 1-9 0v-1.5" />
      <path d="m3 15.5 2-1.5 2 1.5" />
    </>
  ),
  fragment: <path d="m9 6.5-5.5 5.5L9 17.5M15 6.5l5.5 5.5-5.5 5.5" />,
  all: (
    <>
      <rect x="4" y="4" width="6.75" height="6.75" rx="1.5" />
      <rect x="13.25" y="4" width="6.75" height="6.75" rx="1.5" />
      <rect x="4" y="13.25" width="6.75" height="6.75" rx="1.5" />
      <rect x="13.25" y="13.25" width="6.75" height="6.75" rx="1.5" />
    </>
  ),
}

interface KindIconProps {
  kind: CatalogKind | "all"
  size?: number
}

export function KindIcon({ kind, size = 14 }: KindIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[kind]}
    </svg>
  )
}
