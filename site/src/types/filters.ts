import type { CatalogKind } from "./kind"

export interface CatalogFilters {
  q: string
  type: CatalogKind | null
  tag: string | null
}
