import type { Manifest } from "../types/manifest"
import type { TemplateType } from "../types/template"
import type { UsedBy } from "../types/used-by"

const INSTALL_COMMANDS: Record<TemplateType | "pack", (name: string) => string> = {
  agent: (name) => `synapse agents create -n ${name}`,
  rule: (name) => `synapse rules create -n ${name}`,
  skill: (name) => `synapse skills create -n ${name}`,
  pack: (name) => `synapse packs add --name ${name} --yes`,
}

export function installCommand(kind: TemplateType | "pack", name: string): string {
  return INSTALL_COMMANDS[kind](name)
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
