import { useState } from "react"
import { useParams } from "react-router-dom"
import { TEMPLATE_VIEWS } from "../constants/views"
import type { TemplateType } from "../types/template"
import type { TemplateView } from "../types/view"
import { hookBinding, installCommand, packsContaining } from "../lib/catalog"
import { useManifest } from "../hooks/use-manifest"
import { useTemplateContent } from "../hooks/use-template-content"
import { DetailHeader } from "../components/DetailHeader"
import { InstallCommand } from "../components/InstallCommand"
import { Markdown } from "../components/Markdown"
import { NotFound } from "../components/NotFound"
import { PackChips } from "../components/PackChips"
import { ViewToggle } from "../components/ViewToggle"

interface TemplatePageProps {
  type: TemplateType
}

export function TemplatePage({ type }: TemplatePageProps) {
  const manifest = useManifest()
  const { name } = useParams()
  const entry = manifest.templates.find((t) => t.type === type && t.name === name)

  const [activeView, setActiveView] = useState<TemplateView>("Resolved")
  const { source, resolved, error } = useTemplateContent(entry, manifest.fragments)

  if (!entry) return <NotFound what={`${type} "${name}"`} />

  const hasEmbeds = (entry.usesFragments?.length ?? 0) > 0
  const binding = hookBinding(entry)
  const shippingPacks = packsContaining(manifest, type, entry.name)

  return (
    <div>
      <DetailHeader kind={type} name={entry.name} description={entry.description} tags={entry.tags} />

      {binding.length > 0 && (
        <dl className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
          {binding.map(([label, value]) => (
            <div key={label} className="flex items-baseline gap-2">
              <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-faint">
                {label}
              </dt>
              <dd className="font-mono text-[13px] text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-7">
        {type === "hook" ? (
          <div className="flex flex-col gap-4">
            <p className="text-[13.5px] text-ink-muted">
              Hooks have no standalone install — they come with the packs that ship them.
              {shippingPacks.length === 0 && " This hook is not in a pack yet."}
            </p>
            <PackChips packs={shippingPacks} />
          </div>
        ) : (
          <InstallCommand command={installCommand(type, entry.name)} />
        )}
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

      {type !== "hook" && (
        <div className="mt-10">
          <PackChips packs={shippingPacks} />
        </div>
      )}
    </div>
  )
}
