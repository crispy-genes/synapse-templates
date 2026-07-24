import type { FragmentEntry } from "../types/fragment"
import { fetchText } from "./files"
import { EMBED_REGEX, extractBody, mapOutsideCode } from "./markdown"

export function closureIds(startIds: string[], fragments: FragmentEntry[]): string[] {
  const byId = new Map(fragments.map((fragment) => [fragment.id, fragment]))
  const seen = new Set<string>()
  const queue = [...startIds]
  while (queue.length > 0) {
    const id = queue.shift()!
    if (seen.has(id)) continue
    seen.add(id)
    const entry = byId.get(id)
    if (entry) queue.push(...(entry.usesFragments ?? []))
  }
  return [...seen]
}

export async function loadFragmentBodies(
  ids: string[],
  fragments: FragmentEntry[]
): Promise<Map<string, string>> {
  const byId = new Map(fragments.map((fragment) => [fragment.id, fragment]))
  const bodies = new Map<string, string>()
  await Promise.all(
    ids.map(async (id) => {
      const entry = byId.get(id)
      if (!entry) return
      bodies.set(id, extractBody(await fetchText(entry.path)))
    })
  )
  return bodies
}

export function inlineEmbeds(
  body: string,
  bodies: Map<string, string>,
  expanding: string[] = []
): string {
  return mapOutsideCode(body, (text) =>
    text.replace(EMBED_REGEX, (token, rawId: string) => {
      const id = rawId.trim()
      if (!bodies.has(id) || expanding.includes(id)) return token
      return inlineEmbeds(bodies.get(id)!.trim(), bodies, [...expanding, id])
    })
  )
}
