import { FRAGMENT_KINDS } from "../constants/registry"

export type FragmentKind = (typeof FRAGMENT_KINDS)[number]

export interface FragmentEntry {
  id: string
  description: string
  kind?: FragmentKind
  path: string
  sha256: string
  usesFragments?: string[]
}
