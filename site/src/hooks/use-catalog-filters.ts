import { useCallback } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { CATALOG_KINDS } from "../constants/registry"
import type { CatalogFilters } from "../types/filters"
import type { CatalogKind } from "../types/kind"

interface CatalogFiltersApi {
  filters: CatalogFilters
  isCatalog: boolean
  setQuery: (q: string) => void
  setType: (type: CatalogKind | null) => void
  toggleTag: (tag: string) => void
  clearFilters: () => void
}

function parseKind(raw: string | null): CatalogKind | null {
  return CATALOG_KINDS.find((kind) => kind === raw) ?? null
}

export function useCatalogFilters(): CatalogFiltersApi {
  const [params] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const isCatalog = location.pathname === "/"
  const filters: CatalogFilters = {
    q: params.get("q") ?? "",
    type: parseKind(params.get("type")),
    tag: params.get("tag"),
  }

  const apply = useCallback(
    (next: CatalogFilters, replace: boolean) => {
      const search = new URLSearchParams()
      if (next.q) search.set("q", next.q)
      if (next.type) search.set("type", next.type)
      if (next.tag) search.set("tag", next.tag)
      navigate({ pathname: "/", search: search.toString() }, { replace })
    },
    [navigate]
  )

  return {
    filters,
    isCatalog,
    setQuery: (q) => apply({ ...filters, q }, isCatalog),
    setType: (type) => apply({ ...filters, type }, false),
    toggleTag: (tag) => apply({ ...filters, tag: filters.tag === tag ? null : tag }, false),
    clearFilters: () => apply({ q: "", type: null, tag: null }, false),
  }
}
