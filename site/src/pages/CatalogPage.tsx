import { CATALOG_KINDS, KIND_LABELS } from "../constants/registry"
import type { CatalogItem } from "../types/catalog-item"
import type { CatalogKind } from "../types/kind"
import { installCommand, matchesFilters } from "../lib/catalog"
import { useCatalogFilters } from "../hooks/use-catalog-filters"
import { useCatalogItems } from "../hooks/use-catalog-items"
import { useManifest } from "../hooks/use-manifest"
import { CatalogSection } from "../components/CatalogSection"
import { PackCard } from "../components/PackCard"
import { TemplateRow } from "../components/TemplateRow"

const PACK_CAP = 6
const ROW_CAP = 8

const SECTION_HINTS: Record<CatalogKind, string> = {
  pack: "One command installs the whole set",
  agent: "Full personas with tools and scope",
  skill: "Single procedures an agent can invoke",
  rule: "Always-on conventions and constraints",
  hook: "Scripts bound to Claude Code events",
  fragment: "Snippets embedded into any file",
}

export function CatalogPage() {
  const manifest = useManifest()
  const items = useCatalogItems()
  const { filters, setType, clearFilters } = useCatalogFilters()

  const matching = items.filter((item) => matchesFilters(item, filters.q, filters.tag))
  const ofKind = (kind: CatalogKind) => matching.filter((item) => item.kind === kind)

  const hasActiveFilter = filters.q !== "" || filters.type !== null || filters.tag !== null
  const isCapped = !hasActiveFilter
  const visibleKinds = filters.type ? [filters.type] : [...CATALOG_KINDS]
  const totalVisible = visibleKinds.reduce((sum, kind) => sum + ofKind(kind).length, 0)

  const packsByName = new Map(manifest.packs.map((pack) => [pack.name, pack]))

  function sectionProps(kind: CatalogKind, kindItems: CatalogItem[], cap: number) {
    const isTruncated = isCapped && kindItems.length > cap
    return {
      label: KIND_LABELS[kind],
      count: kindItems.length,
      hint: SECTION_HINTS[kind],
      showAllLabel: isTruncated
        ? `Show all ${kindItems.length} ${KIND_LABELS[kind].toLowerCase()}`
        : undefined,
      onShowAll: isTruncated ? () => setType(kind) : undefined,
    }
  }

  return (
    <div>
      {!hasActiveFilter && (
        <div className="max-w-[620px]">
          <h1 className="text-[24px] font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-[29px]">
            Drop-in markdown for coding agents.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
            Agents, skills, rules, and hooks you install with one command. Fragments keep the
            shared parts in a single file, and packs bundle what belongs together.
          </p>
        </div>
      )}

      {totalVisible === 0 && (
        <div className="mt-16 flex flex-col items-start gap-3">
          <p className="font-mono text-[13.5px] text-ink-muted">No templates match that filter.</p>
          <button
            onClick={clearFilters}
            className="text-[13.5px] text-pink-ink transition-colors hover:text-pink"
          >
            Reset
          </button>
        </div>
      )}

      {visibleKinds.map((kind) => {
        const kindItems = ofKind(kind)
        const cap = kind === "pack" ? PACK_CAP : ROW_CAP
        const visibleItems = isCapped ? kindItems.slice(0, cap) : kindItems

        if (kind === "pack") {
          return (
            <CatalogSection key={kind} {...sectionProps(kind, kindItems, cap)}>
              <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(min(292px,100%),1fr))] gap-3.5">
                {visibleItems.map((item) => (
                  <PackCard key={item.name} pack={packsByName.get(item.name)!} />
                ))}
              </div>
            </CatalogSection>
          )
        }

        return (
          <CatalogSection key={kind} {...sectionProps(kind, kindItems, cap)}>
            <div className="mt-1.5 flex flex-col">
              {visibleItems.map((item) => (
                <TemplateRow
                  key={item.name}
                  kind={item.kind}
                  name={item.name}
                  description={item.description}
                  to={item.route}
                  tags={item.tags}
                  copyCommand={item.kind === "hook" ? undefined : installCommand(item.kind, item.name)}
                />
              ))}
            </div>
          </CatalogSection>
        )
      })}
    </div>
  )
}
