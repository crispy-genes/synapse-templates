#!/usr/bin/env node
// Builds v1/index.json from templates/**/*.md.
// Zero dependencies; output is deterministic so CI can diff it for staleness.
import { createHash } from "node:crypto"
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const TEMPLATES_DIR = join(ROOT, "templates")
const OUT_FILE = join(ROOT, "v1", "index.json")

const FOLDER_TO_TYPE = {
  agents: "agent",
  rules: "rule",
  skills: "skill",
  hooks: "hook",
  talismans: "talisman",
}

const HOOK_EVENTS = [
  "SessionStart", "SessionEnd", "UserPromptSubmit", "PreToolUse", "PostToolUse", "PostToolUseFailure",
  "PermissionRequest", "Notification", "SubagentStart", "SubagentStop", "Stop", "StopFailure",
  "PreCompact", "PostCompact", "ConfigChange", "InstructionsLoaded", "TaskCompleted",
  "WorktreeCreate", "WorktreeRemove", "Elicitation", "ElicitationResult",
]

const FRAGMENTS_FOLDER = "fragments"
const FRAGMENT_KINDS = ["convention", "template"]
const PACKS_FOLDER = "packs"

const errors = []

function parseFrontmatter(content, relPath) {
  if (!content.startsWith("---\n")) {
    errors.push(`${relPath}: missing frontmatter block`)
    return {}
  }
  const end = content.indexOf("\n---", 4)
  if (end === -1) {
    errors.push(`${relPath}: unterminated frontmatter block`)
    return {}
  }
  const fields = {}
  let listKey = null
  for (const line of content.slice(4, end).split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue
    const isListItem = /^\s+- /.test(line)
    if (isListItem && listKey !== null) {
      fields[listKey].push(line.trim().slice(2).trim().replace(/^["']|["']$/g, ""))
      continue
    }
    const sep = line.indexOf(":")
    if (sep === -1 || line.startsWith(" ")) {
      errors.push(
        `${relPath}: unsupported frontmatter line "${line}" (only "key: value" and block lists of scalars are supported)`
      )
      listKey = null
      continue
    }
    const key = line.slice(0, sep).trim()
    const value = line.slice(sep + 1).trim()
    if (value === "") {
      listKey = key
      fields[key] = []
    } else {
      listKey = null
      fields[key] = value
    }
  }
  return fields
}

function parseTags(raw, relPath) {
  if (raw === undefined || raw === "") return []
  if (!raw.startsWith("[") || !raw.endsWith("]")) {
    errors.push(`${relPath}: tags must be an inline array, e.g. tags: [api, backend]`)
    return []
  }
  return raw
    .slice(1, -1)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
}

function extractBody(content) {
  if (content.startsWith("---\n")) {
    const end = content.indexOf("\n---", 4)
    if (end !== -1) return content.slice(end + 4)
  }
  return content
}

function hookFields(fields, content, relPath) {
  const hook = {}
  if (!HOOK_EVENTS.includes(fields.event)) {
    errors.push(
      `${relPath}: hook "event" is missing or unknown (got ${JSON.stringify(fields.event)}; expected one of ${HOOK_EVENTS.join(", ")})`
    )
  } else {
    hook.event = fields.event
  }
  if (fields.matcher !== undefined && fields.matcher !== "") hook.matcher = fields.matcher
  if (fields.async !== undefined) {
    if (fields.async !== "true" && fields.async !== "false") {
      errors.push(`${relPath}: hook "async" must be true or false`)
    } else if (fields.async === "true") {
      hook.async = true
    }
  }
  if (fields.timeout !== undefined) {
    const timeout = Number(fields.timeout)
    if (!Number.isInteger(timeout) || timeout <= 0) {
      errors.push(`${relPath}: hook "timeout" must be a positive integer (seconds)`)
    } else {
      hook.timeout = timeout
    }
  }
  const script = extractBody(content).match(/^```[^\n]*\n([\s\S]*?)\n```/m)
  if (!script || !script[1].trim()) {
    errors.push(`${relPath}: hook body must contain the script in a fenced code block`)
  }
  return hook
}

function extractEmbeds(content) {
  const withoutCode = extractBody(content)
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]*`/g, "")
  const regex = /!\[\[([^\]|#\n]+)(?:#[^\]|\n]+)?(?:\|[^\]\n]+)?\]\]/g
  const ids = []
  const seen = new Set()
  let match
  while ((match = regex.exec(withoutCode)) !== null) {
    const id = match[1].trim()
    if (id && !seen.has(id)) {
      seen.add(id)
      ids.push(id)
    }
  }
  return ids
}

// Fragments may be organized in subfolders (e.g. fragments/api/); ids are the
// filename and must stay unique across the whole tree.
function findMarkdownFiles(dir, prefix = "") {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name)
  )) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(join(dir, entry.name), rel))
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(rel)
    }
  }
  return files
}

const entries = []
const fragments = []
const packs = []
for (const folder of readdirSync(TEMPLATES_DIR).sort()) {
  if (folder === PACKS_FOLDER) {
    for (const file of readdirSync(join(TEMPLATES_DIR, folder)).sort()) {
      if (!file.endsWith(".md")) continue
      const relPath = `templates/${folder}/${file}`
      const content = readFileSync(join(TEMPLATES_DIR, folder, file), "utf-8")
      const fields = parseFrontmatter(content, relPath)
      if (!fields.description) {
        errors.push(`${relPath}: frontmatter is missing required "description"`)
      }
      packs.push({
        name: file.slice(0, -3),
        description: fields.description ?? "",
        tags: parseTags(fields.tags, relPath),
        path: relPath,
        sha256: createHash("sha256").update(content).digest("hex"),
        agents: fields.agents ?? [],
        skills: fields.skills ?? [],
        rules: fields.rules ?? [],
        hooks: fields.hooks ?? [],
      })
    }
    continue
  }

  if (folder === FRAGMENTS_FOLDER) {
    for (const file of findMarkdownFiles(join(TEMPLATES_DIR, folder))) {
      const relPath = `templates/${folder}/${file}`
      const content = readFileSync(join(TEMPLATES_DIR, folder, file), "utf-8")
      const fields = parseFrontmatter(content, relPath)
      if (!fields.description) {
        errors.push(`${relPath}: frontmatter is missing required "description"`)
      }
      const id = file.split("/").pop().slice(0, -3)
      if (fields.id !== undefined && fields.id !== id) {
        errors.push(`${relPath}: frontmatter id "${fields.id}" does not match filename "${id}"`)
      }
      if (fields.kind !== undefined && !FRAGMENT_KINDS.includes(fields.kind)) {
        errors.push(`${relPath}: kind must be one of ${FRAGMENT_KINDS.join(" | ")}`)
      }
      const fragment = {
        id,
        description: fields.description ?? "",
        path: relPath,
        sha256: createHash("sha256").update(content).digest("hex"),
      }
      if (fields.kind !== undefined) fragment.kind = fields.kind
      const usesFragments = extractEmbeds(content)
      if (usesFragments.length > 0) fragment.usesFragments = usesFragments
      fragments.push(fragment)
    }
    continue
  }

  const type = FOLDER_TO_TYPE[folder]
  if (!type) {
    errors.push(`templates/${folder}: unknown template type folder`)
    continue
  }
  const dir = join(TEMPLATES_DIR, folder)
  for (const file of readdirSync(dir).sort()) {
    if (!file.endsWith(".md")) continue
    const relPath = `templates/${folder}/${file}`
    const content = readFileSync(join(dir, file), "utf-8")
    const fields = parseFrontmatter(content, relPath)
    if (!fields.description) {
      errors.push(`${relPath}: frontmatter is missing required "description"`)
    }
    const name = file.slice(0, -3)
    if (fields.name !== undefined && fields.name !== name) {
      errors.push(`${relPath}: frontmatter name "${fields.name}" does not match filename "${name}"`)
    }
    const entry = {
      name,
      type,
      description: fields.description ?? "",
      tags: parseTags(fields.tags, relPath),
      path: relPath,
      sha256: createHash("sha256").update(content).digest("hex"),
    }
    const usesFragments = extractEmbeds(content)
    if (usesFragments.length > 0) entry.usesFragments = usesFragments
    if (type === "hook") Object.assign(entry, hookFields(fields, content, relPath))
    entries.push(entry)
  }
}

const seen = new Set()
for (const entry of entries) {
  const key = `${entry.type}/${entry.name}`
  if (seen.has(key)) errors.push(`duplicate template: ${key}`)
  seen.add(key)
}

const fragmentIds = new Set()
for (const fragment of fragments) {
  if (fragmentIds.has(fragment.id)) errors.push(`duplicate fragment: ${fragment.id}`)
  fragmentIds.add(fragment.id)
}

for (const item of [...entries, ...fragments]) {
  for (const id of item.usesFragments ?? []) {
    if (!fragmentIds.has(id)) {
      errors.push(`${item.path}: embeds unknown fragment "${id}"`)
    }
  }
}

const templateNamesByType = new Map()
for (const entry of entries) {
  if (!templateNamesByType.has(entry.type)) templateNamesByType.set(entry.type, new Set())
  templateNamesByType.get(entry.type).add(entry.name)
}
const packNames = new Set()
for (const pack of packs) {
  if (packNames.has(pack.name)) errors.push(`duplicate pack: ${pack.name}`)
  packNames.add(pack.name)
  for (const [field, type] of [
    ["agents", "agent"],
    ["skills", "skill"],
    ["rules", "rule"],
    ["hooks", "hook"],
  ]) {
    if (!Array.isArray(pack[field])) {
      errors.push(`${pack.path}: "${field}" must be a block list`)
      pack[field] = []
      continue
    }
    for (const name of pack[field]) {
      if (!templateNamesByType.get(type)?.has(name)) {
        errors.push(`${pack.path}: references unknown ${type} "${name}"`)
      }
    }
  }
}

const fragmentUses = new Map(fragments.map((f) => [f.id, f.usesFragments ?? []]))
function findCycle(id, trail) {
  if (trail.includes(id)) return [...trail.slice(trail.indexOf(id)), id]
  for (const next of fragmentUses.get(id) ?? []) {
    const cycle = findCycle(next, [...trail, id])
    if (cycle) return cycle
  }
  return null
}
for (const fragment of fragments) {
  const cycle = findCycle(fragment.id, [])
  if (cycle) {
    errors.push(`fragment transclusion cycle: ${cycle.join(" → ")}`)
    break
  }
}

if (errors.length > 0) {
  console.error(`index build failed with ${errors.length} error(s):`)
  for (const error of errors) console.error(`  - ${error}`)
  process.exit(1)
}

entries.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name))
fragments.sort((a, b) => a.id.localeCompare(b.id))
packs.sort((a, b) => a.name.localeCompare(b.name))
const manifest = { schemaVersion: 1, templates: entries, fragments, packs }
writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n")
console.log(
  `v1/index.json: ${entries.length} templates, ${fragments.length} fragments, ${packs.length} packs`
)
