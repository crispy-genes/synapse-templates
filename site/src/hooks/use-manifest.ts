import { useContext } from "react"
import type { Manifest } from "../types/manifest"
import { ManifestContext } from "../lib/manifest-context"

export function useManifest(): Manifest {
  const manifest = useContext(ManifestContext)
  if (!manifest) throw new Error("useManifest must be used inside ManifestProvider")
  return manifest
}
