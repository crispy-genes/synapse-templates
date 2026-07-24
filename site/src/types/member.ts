import type { BadgeType } from "./badge"

export interface Member {
  type: BadgeType
  name: string
  to?: string
  note?: string
}
