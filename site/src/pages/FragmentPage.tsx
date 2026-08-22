import { useState } from "react"
import { useParams } from "react-router-dom"
import { TEMPLATE_VIEWS } from "../constants/views"
import type { TemplateView } from "../types/view"
import { itemRoute, packsShippingFragment, usedBy } from "../lib/catalog"
import { useManifest } from "../hooks/use-manifest"
import { useTemplateContent } from "../hooks/use-template-content"
import { DetailHeader } from "../components/DetailHeader"
import { Markdown } from "../components/Markdown"
import { NotFound } from "../components/NotFound"
import { PackChips } from "../components/PackChips"
import { SectionHeader } from "../components/SectionHeader"
import { TemplateRow } from "../components/TemplateRow"
import { ViewToggle } from "../components/ViewToggle"

export function FragmentPage() {
  const manifest = useManifest()
  const { id } = useParams()
  const entry = manifest.fragments.find((fragment) => fragment.id === id)

  const [activeView, setActiveView] = useState<TemplateView>("Resolved")
  const { source, resolved, error } = useTemplateContent(entry, manifest.fragments)

  if (!entry) return <NotFound what={`fragment "${id}"`} />

  const hasEmbeds = (entry.usesFragments?.length ?? 0) > 0
  const references = usedBy(manifest, entry.id)
  const consumers = [
    ...references.templates.map((t) => ({
      kind: t.type,
      name: t.name,
      description: t.description,
      to: itemRoute(t.type, t.name),
    })),
    ...references.fragments.map((f) => ({
      kind: "fragment" as const,
      name: f.id,
      description: f.description,
      to: itemRoute("fragment", f.id),
    })),
  ]

  return (
    <div>
      <DetailHeader
        kind="fragment"
        name={entry.id}
        description={entry.description}
        plainTags={entry.kind ? [entry.kind] : []}
      />

      <div className="mt-7">
        <p className="text-[13.5px] text-ink-muted">
          Fragments have no standalone install — they are inlined into the agents, skills, and
          rules that embed them, so installing one of those brings this text with it.
          {consumers.length === 0 && " Nothing embeds this fragment yet."}
        </p>
      </div>

      {hasEmbeds && (
        <div className="mt-7">
          <ViewToggle views={TEMPLATE_VIEWS} activeView={activeView} onSelect={setActiveView} />
        </div>
      )}

      <div className="mt-4">
        {error && <p className="text-[13.5px] text-pink-ink">{error}</p>}
        {!error && source === null && <p className="text-[13.5px] text-ink-subtle">Loading…</p>}
        {!error && source !== null && resolved !== null && (
          <Markdown source={activeView === "Source" ? source : resolved} />
        )}
      </div>

      <div className="mt-10">
        <SectionHeader label="Used by" count={consumers.length} />
        {consumers.length > 0 ? (
          <div className="mt-1.5 flex flex-col">
            {consumers.map((consumer) => (
              <TemplateRow
                key={`${consumer.kind}-${consumer.name}`}
                kind={consumer.kind}
                name={consumer.name}
                description={consumer.description}
                to={consumer.to}
              />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-[13.5px] text-ink-subtle">Nothing embeds this fragment yet.</p>
        )}
      </div>

      <div className="mt-10">
        <PackChips packs={packsShippingFragment(manifest, entry.id)} />
      </div>
    </div>
  )
}
