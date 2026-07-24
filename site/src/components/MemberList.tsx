import { Link } from "react-router-dom"
import type { Member } from "../types/member"
import { Badge } from "./Badge"

interface MemberListProps {
  members: Member[]
}

export function MemberList({ members }: MemberListProps) {
  return (
    <ul className="flex flex-col gap-1.5">
      {members.map((member) => (
        <li key={`${member.type}-${member.name}`} className="flex items-baseline gap-2">
          <Badge type={member.type} />
          {member.to ? (
            <Link to={member.to} className="text-brand-600 hover:underline dark:text-brand-400">
              {member.name}
            </Link>
          ) : (
            <span>{member.name}</span>
          )}
          {member.note && <span className="text-sm text-zinc-400">{member.note}</span>}
        </li>
      ))}
    </ul>
  )
}
