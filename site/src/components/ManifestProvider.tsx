import { useEffect, useState, type ReactNode } from "react"
import type { Manifest } from "../types/manifest"
import { fetchText } from "../lib/files"
import { ManifestContext } from "../lib/manifest-context"

interface ManifestProviderProps {
  children: ReactNode
}

export function ManifestProvider({ children }: ManifestProviderProps) {
  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchText("v1/index.json")
      .then((raw) => setManifest(JSON.parse(raw) as Manifest))
      .catch((cause: Error) => setError(cause.message))
  }, [])

  if (error) {
    return <p className="text-red-600 dark:text-red-400">Could not load the catalog manifest: {error}</p>
  }
  if (!manifest) {
    return <p className="text-zinc-500">Loading catalog…</p>
  }
  return <ManifestContext.Provider value={manifest}>{children}</ManifestContext.Provider>
}
