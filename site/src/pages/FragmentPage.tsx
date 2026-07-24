import { useParams } from "react-router-dom"
import type { Member } from "../types/member"
import { usedBy } from "../lib/catalog"
import { useFragmentBody } from "../hooks/use-fragment-body"
import { useManifest } from "../hooks/use-manifest"
import { DetailHeader } from "../components/DetailHeader"
import { Markdown } from "../components/Markdown"
import { MemberList } from "../components/MemberList"
import { NotFound } from "../components/NotFound"
import { Panel } from "../components/Panel"
import { TagPill } from "../components/TagPill"

export function FragmentPage() {
  const manifest = useManifest()
  const { id } = useParams()
  const entry = manifest.fragments.find((fragment) => fragment.id === id)

  const { body, error } = useFragmentBody(entry)

  if (!entry) return <NotFound what={`fragment "${id}"`} />

  const references = usedBy(manifest, entry.id)
  const members: Member[] = [
    ...references.templates.map((t) => ({
      type: t.type,
      name: t.name,
      to: `/${t.type}/${t.name}`,
    })),
    ...references.fragments.map((f) => ({
      type: "fragment" as const,
      name: f.id,
      to: `/fragment/${f.id}`,
    })),
  ]

  return (
    <div>
      <DetailHeader type="fragment" name={entry.id} description={entry.description} />
      {entry.kind && (
        <div className="mb-2">
          <TagPill tag={`kind: ${entry.kind}`} />
        </div>
      )}

      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
      {!error && body === null && <p className="text-zinc-500">Loading…</p>}
      {!error && body !== null && <Markdown source={body} />}

      <Panel title="Used by">
        {members.length > 0 ? (
          <MemberList members={members} />
        ) : (
          <p className="text-sm text-zinc-400">Nothing embeds this fragment yet.</p>
        )}
      </Panel>
    </div>
  )
}
