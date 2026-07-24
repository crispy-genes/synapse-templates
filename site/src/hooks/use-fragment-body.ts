import { useEffect, useState } from "react"
import type { FragmentEntry } from "../types/fragment"
import { fetchText } from "../lib/files"
import { extractBody } from "../lib/markdown"

interface FragmentBody {
  body: string | null
  error: string | null
}

export function useFragmentBody(entry: FragmentEntry | undefined): FragmentBody {
  const [body, setBody] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!entry) return
    setBody(null)
    fetchText(entry.path)
      .then((content) => setBody(extractBody(content)))
      .catch((cause: Error) => setError(cause.message))
  }, [entry])

  return { body, error }
}
