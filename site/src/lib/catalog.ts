import { KIND_SEGMENTS } from "../constants/registry"
import type { CatalogItem } from "../types/catalog-item"
import type { CatalogKind } from "../types/kind"
import type { Manifest } from "../types/manifest"
import type { PackEntry } from "../types/pack"
import type { TemplateType } from "../types/template"
import type { UsedBy } from "../types/used-by"
import { closureIds } from "./resolve"

export function installCommand(kind: CatalogKind, name: string): string {
  return `synapse ${KIND_SEGMENTS[kind]} add --name ${name}`
}

export function itemRoute(kind: CatalogKind, name: string): string {
  return `/${KIND_SEGMENTS[kind]}/${name}`
}

export function buildCatalogItems(manifest: Manifest): CatalogItem[] {
  return [
    ...manifest.packs.map((pack) => ({
      kind: "pack" as const,
      name: pack.name,
      description: pack.description,
      tags: pack.tags,
      route: itemRoute("pack", pack.name),
    })),
    ...manifest.templates.map((template) => ({
      kind: template.type,
      name: template.name,
      description: template.description,
      tags: template.tags,
      route: itemRoute(template.type, template.name),
    })),
    ...manifest.fragments.map((fragment) => ({
      kind: "fragment" as const,
      name: fragment.id,
      description: fragment.description,
      tags: [],
      route: itemRoute("fragment", fragment.id),
    })),
  ]
}

export function matchesFilters(item: CatalogItem, q: string, tag: string | null): boolean {
  if (tag && !item.tags.includes(tag)) return false
  if (!q) return true
  const query = q.toLowerCase()
  return [item.name, item.description, ...item.tags].some((text) =>
    text.toLowerCase().includes(query)
  )
}

export function allTags(manifest: Manifest): string[] {
  const tags = new Set<string>()
  for (const item of [...manifest.templates, ...manifest.packs]) {
    for (const tag of item.tags) tags.add(tag)
  }
  return [...tags].sort()
}

export function usedBy(manifest: Manifest, fragmentId: string): UsedBy {
  return {
    templates: manifest.templates.filter((t) => t.usesFragments?.includes(fragmentId)),
    fragments: manifest.fragments.filter((f) => f.usesFragments?.includes(fragmentId)),
  }
}

export function packComposition(pack: PackEntry): string {
  const parts: Array<[number, string]> = [
    [pack.agents.length, "agent"],
    [pack.skills.length, "skill"],
    [pack.rules.length, "rule"],
    [pack.hooks.length, "hook"],
  ]
  return parts
    .filter(([count]) => count > 0)
    .map(([count, label]) => `${count} ${label}${count === 1 ? "" : "s"}`)
    .join(" · ")
}

export function packsContaining(manifest: Manifest, type: TemplateType, name: string): PackEntry[] {
  const memberKey = `${type}s` as const
  return manifest.packs.filter((pack) => pack[memberKey].includes(name))
}

export function packsShippingFragment(manifest: Manifest, fragmentId: string): PackEntry[] {
  return manifest.packs.filter((pack) => {
    const members = manifest.templates.filter((t) => pack[`${t.type}s`].includes(t.name))
    return members.some((t) =>
      closureIds(t.usesFragments ?? [], manifest.fragments).includes(fragmentId)
    )
  })
}
