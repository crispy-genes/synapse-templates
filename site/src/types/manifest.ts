import type { FragmentEntry } from "./fragment"
import type { PackEntry } from "./pack"
import type { TemplateEntry } from "./template"

export interface Manifest {
  schemaVersion: number
  templates: TemplateEntry[]
  fragments: FragmentEntry[]
  packs: PackEntry[]
}
