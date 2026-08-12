import { useEffect, useRef, useState } from "react"
import { CATALOG_KINDS, KIND_LABELS } from "../constants/registry"
import type { CatalogKind } from "../types/kind"
import { allTags, matchesFilters } from "../lib/catalog"
import { useCatalogFilters } from "../hooks/use-catalog-filters"
import { useCatalogItems } from "../hooks/use-catalog-items"
import { useManifest } from "../hooks/use-manifest"
import { KindIcon } from "./KindIcon"

interface TypeRowProps {
  kind: CatalogKind | "all"
  label: string
  count: number
  isActive: boolean
  onSelect: () => void
}

function TypeRow({ kind, label, count, isActive, onSelect }: TypeRowProps) {
  return (
    <button
      onClick={onSelect}
      className={`flex w-full items-center gap-2.5 rounded-lg px-[9px] py-[7px] text-left text-[13.5px] transition-colors ${
        isActive
          ? "bg-pink-chip font-medium text-pink-ink"
          : "text-ink-body hover:bg-surface-muted"
      }`}
    >
      <KindIcon kind={kind} size={14} />
      <span className="flex-1">{label}</span>
      <span className="font-mono text-[11px] text-ink-faint">{count}</span>
    </button>
  )
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const manifest = useManifest()
  const items = useCatalogItems()
  const { filters, isCatalog, setQuery, setType, toggleTag, clearFilters } = useCatalogFilters()
  const searchRef = useRef<HTMLInputElement>(null)

  const urlQuery = isCatalog ? filters.q : ""
  const [searchValue, setSearchValue] = useState(urlQuery)

  useEffect(() => {
    if (document.activeElement !== searchRef.current) setSearchValue(urlQuery)
  }, [urlQuery])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      const isTyping = target.closest("input, textarea, select, [contenteditable]")
      if (event.key === "/" && !isTyping) {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const matching = items.filter((item) => matchesFilters(item, filters.q, filters.tag))
  const countOf = (kind: CatalogKind) => matching.filter((item) => item.kind === kind).length
  const hasActiveFilter = filters.q !== "" || filters.type !== null || filters.tag !== null

  const selectType = (type: CatalogKind | null) => {
    setType(type)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 top-16 z-30 bg-ink/20 md:hidden"
        />
      )}
      <aside
        className={`fixed bottom-0 left-0 top-16 z-40 w-[280px] shrink-0 overflow-y-auto border-r border-border bg-bg px-[22px] py-[26px] transition-transform duration-200 md:sticky md:z-auto md:h-[calc(100vh-64px)] md:w-[252px] md:translate-x-0 md:transition-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[13px] text-ink-faint">
            /
          </span>
          <input
            ref={searchRef}
            type="text"
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value)
              setQuery(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setSearchValue("")
                setQuery("")
                event.currentTarget.blur()
              }
            }}
            placeholder="Search templates"
            className="h-9 w-full rounded-[9px] border border-border-strong bg-surface pl-8 pr-3 text-[13.5px] text-ink placeholder:text-ink-subtle focus:border-pink focus:shadow-[0_0_0_3px_#FFE9F2] focus:outline-none"
          />
        </div>

        <p className="mb-2 mt-6 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-faint">
          Type
        </p>
        <nav className="flex flex-col gap-0.5">
          <TypeRow
            kind="all"
            label="All templates"
            count={matching.length}
            isActive={isCatalog && filters.type === null}
            onSelect={() => selectType(null)}
          />
          {CATALOG_KINDS.map((kind) => (
            <TypeRow
              key={kind}
              kind={kind}
              label={KIND_LABELS[kind]}
              count={countOf(kind)}
              isActive={isCatalog && filters.type === kind}
              onSelect={() => selectType(kind)}
            />
          ))}
        </nav>

        <p className="mb-2.5 mt-6 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-faint">
          Tags
        </p>
        <div className="flex flex-wrap gap-1.5">
          {allTags(manifest).map((tag) => {
            const isActive = isCatalog && filters.tag === tag
            return (
              <button
                key={tag}
                onClick={() => {
                  toggleTag(tag)
                  onClose()
                }}
                className={`rounded-md px-2 py-0.5 font-mono text-[11px] transition-colors ${
                  isActive
                    ? "bg-pink text-white"
                    : "bg-surface-muted text-ink-muted hover:bg-pink-tint hover:text-pink-ink"
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>

        {hasActiveFilter && (
          <button
            onClick={() => {
              clearFilters()
              onClose()
            }}
            className="mt-5 text-[12.5px] text-pink-ink transition-colors hover:text-pink"
          >
            Clear filters
          </button>
        )}
      </aside>
    </>
  )
}
