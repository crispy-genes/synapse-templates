import { useState } from "react"
import { TEMPLATE_TYPES } from "../constants/registry"
import type { TemplateType } from "../types/template"
import { allTags } from "../lib/catalog"
import { useManifest } from "../hooks/use-manifest"
import { CatalogCard } from "../components/CatalogCard"
import { CatalogSection } from "../components/CatalogSection"
import { TagFilter } from "../components/TagFilter"

export function CatalogPage() {
  const manifest = useManifest()
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())

  function toggleTag(tag: string) {
    const next = new Set(activeTags)
    next.has(tag) ? next.delete(tag) : next.add(tag)
    setActiveTags(next)
  }

  const matches = (tags: string[]) =>
    activeTags.size === 0 || tags.some((tag) => activeTags.has(tag))

  const packs = manifest.packs.filter((pack) => matches(pack.tags))
  const templatesOfType = (type: TemplateType) =>
    manifest.templates.filter((t) => t.type === type && matches(t.tags))
  const fragments = activeTags.size === 0 ? manifest.fragments : []

  return (
    <div>
      <div className="mt-2">
        <TagFilter tags={allTags(manifest)} activeTags={activeTags} onToggle={toggleTag} />
      </div>

      <CatalogSection title="Packs" count={packs.length}>
        {packs.map((pack) => (
          <CatalogCard
            key={pack.name}
            to={`/pack/${pack.name}`}
            name={pack.name}
            type="pack"
            description={pack.description}
            tags={pack.tags}
          />
        ))}
      </CatalogSection>

      {TEMPLATE_TYPES.map((type) => {
        const templates = templatesOfType(type)
        return (
          <CatalogSection
            key={type}
            title={`${type[0].toUpperCase()}${type.slice(1)}s`}
            count={templates.length}
          >
            {templates.map((template) => (
              <CatalogCard
                key={template.name}
                to={`/${template.type}/${template.name}`}
                name={template.name}
                type={template.type}
                description={template.description}
                tags={template.tags}
              />
            ))}
          </CatalogSection>
        )
      })}

      <CatalogSection title="Fragments" count={fragments.length}>
        {fragments.map((fragment) => (
          <CatalogCard
            key={fragment.id}
            to={`/fragment/${fragment.id}`}
            name={fragment.id}
            type="fragment"
            description={fragment.description}
          />
        ))}
      </CatalogSection>
    </div>
  )
}
