import type { CatalogKind } from "./kind"

export interface CatalogItem {
  kind: CatalogKind
  name: string
  description: string
  tags: string[]
  route: string
}
