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

const entries = []
for (const folder of readdirSync(TEMPLATES_DIR).sort()) {
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
    entries.push({
      name,
      type,
      description: fields.description ?? "",
      tags: parseTags(fields.tags, relPath),
      path: relPath,
      sha256: createHash("sha256").update(content).digest("hex"),
    })
  }
}

const seen = new Set()
for (const entry of entries) {
  const key = `${entry.type}/${entry.name}`
  if (seen.has(key)) errors.push(`duplicate template: ${key}`)
  seen.add(key)
}

if (errors.length > 0) {
  console.error(`index build failed with ${errors.length} error(s):`)
  for (const error of errors) console.error(`  - ${error}`)
  process.exit(1)
}

entries.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name))
const manifest = { schemaVersion: 1, templates: entries }
writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n")
console.log(`v1/index.json: ${entries.length} templates`)
