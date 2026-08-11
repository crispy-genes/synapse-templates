import { createContext } from "react"
import type { Manifest } from "../types/manifest"

export const ManifestContext = createContext<Manifest | null>(null)
