import { useState } from "react"
import { useParams } from "react-router-dom"
import { TEMPLATE_VIEWS } from "../constants/views"
import type { TemplateType } from "../types/template"
import type { TemplateView } from "../types/view"
import { installCommand, packsContaining } from "../lib/catalog"
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

  return (
    <div>
      <DetailHeader kind={type} name={entry.name} description={entry.description} tags={entry.tags} />

      <div className="mt-7">
        <InstallCommand command={installCommand(type, entry.name)} />
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
        <PackChips packs={packsContaining(manifest, type, entry.name)} />
      </div>
    </div>
  )
}
