import { useMemo } from "react"
import type { CatalogItem } from "../types/catalog-item"
import { buildCatalogItems } from "../lib/catalog"
import { useManifest } from "./use-manifest"

export function useCatalogItems(): CatalogItem[] {
  const manifest = useManifest()
  return useMemo(() => buildCatalogItems(manifest), [manifest])
}
