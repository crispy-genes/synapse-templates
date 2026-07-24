import { TEMPLATE_TYPES } from "../constants/registry"

export type TemplateType = (typeof TEMPLATE_TYPES)[number]

export interface TemplateEntry {
  name: string
  type: TemplateType
  description: string
  tags: string[]
  path: string
  sha256: string
  usesFragments?: string[]
}
