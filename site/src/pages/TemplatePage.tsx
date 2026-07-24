import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { TEMPLATE_VIEWS } from "../constants/views"
import type { TemplateType } from "../types/template"
import type { TemplateView } from "../types/view"
import { installCommand } from "../lib/catalog"
import { useManifest } from "../hooks/use-manifest"
import { useTemplateContent } from "../hooks/use-template-content"
import { DetailHeader } from "../components/DetailHeader"
import { InstallCommand } from "../components/InstallCommand"
import { Markdown } from "../components/Markdown"
import { NotFound } from "../components/NotFound"
import { TagPill } from "../components/TagPill"
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

  return (
    <div>
      <DetailHeader type={type} name={entry.name} description={entry.description} />

      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        {entry.tags.map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
        {entry.usesFragments?.map((id) => (
          <Link
            key={id}
            to={`/fragment/${id}`}
            className="rounded bg-indigo-50 px-1.5 py-0.5 font-mono text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
          >
            ![[{id}]]
          </Link>
        ))}
      </div>

      <InstallCommand command={installCommand(type, entry.name)} />

      <ViewToggle views={TEMPLATE_VIEWS} activeView={activeView} onSelect={setActiveView} />

      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
      {!error && source === null && <p className="text-zinc-500">Loading…</p>}
      {!error && source !== null && resolved !== null && (
        <Markdown source={activeView === "Source" ? source : resolved} />
      )}
    </div>
  )
}
