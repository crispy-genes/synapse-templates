import type { FragmentEntry } from "./fragment"
import type { TemplateEntry } from "./template"

export interface UsedBy {
  templates: TemplateEntry[]
  fragments: FragmentEntry[]
}
