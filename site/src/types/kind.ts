import { CATALOG_KINDS, INSTALLABLE_KINDS } from "../constants/registry"

export type CatalogKind = (typeof CATALOG_KINDS)[number]

export type InstallableKind = (typeof INSTALLABLE_KINDS)[number]
