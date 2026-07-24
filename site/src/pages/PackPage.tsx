import { useParams } from "react-router-dom"
import type { Member } from "../types/member"
import { installCommand } from "../lib/catalog"
import { useManifest } from "../hooks/use-manifest"
import { DetailHeader } from "../components/DetailHeader"
import { InstallCommand } from "../components/InstallCommand"
import { MemberList } from "../components/MemberList"
import { NotFound } from "../components/NotFound"
import { Panel } from "../components/Panel"
import { TagPill } from "../components/TagPill"

export function PackPage() {
  const manifest = useManifest()
  const { name } = useParams()
  const entry = manifest.packs.find((pack) => pack.name === name)

  if (!entry) return <NotFound what={`pack "${name}"`} />

  const members: Member[] = [
    ...entry.agents.map((n) => ({ type: "agent" as const, name: n, to: `/agent/${n}` })),
    ...entry.rules.map((n) => ({ type: "rule" as const, name: n, to: `/rule/${n}` })),
    ...entry.skills.map((n) => ({ type: "skill" as const, name: n, to: `/skill/${n}` })),
    ...entry.hooks.map((n) => ({ type: "pack" as const, name: n, note: "(hook — bundled in the CLI)" })),
  ]

  return (
    <div>
      <DetailHeader type="pack" name={entry.name} description={entry.description} />
      <div className="mb-2 flex flex-wrap gap-1.5">
        {entry.tags.map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>

      <InstallCommand command={installCommand("pack", entry.name)} />

      <Panel title="Includes">
        <MemberList members={members} />
      </Panel>
    </div>
  )
}
