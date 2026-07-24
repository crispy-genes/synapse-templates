import { useEffect, useState } from "react"
import type { FragmentEntry } from "../types/fragment"
import type { TemplateEntry } from "../types/template"
import { fetchText } from "../lib/files"
import { extractBody } from "../lib/markdown"
import { closureIds, inlineEmbeds, loadFragmentBodies } from "../lib/resolve"

interface TemplateContent {
  source: string | null
  resolved: string | null
  error: string | null
}

export function useTemplateContent(
  entry: TemplateEntry | undefined,
  fragments: FragmentEntry[]
): TemplateContent {
  const [source, setSource] = useState<string | null>(null)
  const [resolved, setResolved] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!entry) return
    setSource(null)
    setResolved(null)
    ;(async () => {
      const body = extractBody(await fetchText(entry.path))
      const bodies = await loadFragmentBodies(
        closureIds(entry.usesFragments ?? [], fragments),
        fragments
      )
      setSource(body)
      setResolved(inlineEmbeds(body, bodies))
    })().catch((cause: Error) => setError(cause.message))
  }, [entry, fragments])

  return { source, resolved, error }
}
