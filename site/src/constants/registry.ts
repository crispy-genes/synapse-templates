export const TEMPLATE_TYPES = ["agent", "rule", "skill"] as const

export const FRAGMENT_KINDS = ["convention", "template"] as const

export const CATALOG_KINDS = ["pack", "agent", "skill", "rule", "fragment"] as const

export const KIND_SEGMENTS = {
  pack: "packs",
  agent: "agents",
  skill: "skills",
  rule: "rules",
  fragment: "fragments",
} as const

export const KIND_LABELS = {
  pack: "Packs",
  agent: "Agents",
  skill: "Skills",
  rule: "Rules",
  fragment: "Fragments",
} as const
