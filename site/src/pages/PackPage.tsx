import { useParams } from "react-router-dom"
import { TEMPLATE_TYPES } from "../constants/registry"
import { installCommand, itemRoute } from "../lib/catalog"
import { useManifest } from "../hooks/use-manifest"
import { DetailHeader } from "../components/DetailHeader"
import { InstallCommand } from "../components/InstallCommand"
import { NotFound } from "../components/NotFound"
import { SectionHeader } from "../components/SectionHeader"
import { TemplateRow } from "../components/TemplateRow"

export function PackPage() {
  const manifest = useManifest()
  const { name } = useParams()
  const entry = manifest.packs.find((pack) => pack.name === name)

  if (!entry) return <NotFound what={`pack "${name}"`} />

  const members = TEMPLATE_TYPES.flatMap((type) =>
    entry[`${type}s`].map((memberName) => {
      const template = manifest.templates.find((t) => t.type === type && t.name === memberName)
      return { type, name: memberName, description: template?.description ?? "" }
    })
  )
  const includesCount = members.length

  return (
    <div>
      <DetailHeader kind="pack" name={entry.name} description={entry.description} tags={entry.tags} />

      <div className="mt-7">
        <InstallCommand command={installCommand("pack", entry.name)} />
      </div>

      <div className="mt-10">
        <SectionHeader label="Includes" count={includesCount} />
        <div className="mt-1.5 flex flex-col">
          {members.map((member) => (
            <TemplateRow
              key={`${member.type}-${member.name}`}
              kind={member.type}
              name={member.name}
              description={member.description}
              to={itemRoute(member.type, member.name)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
