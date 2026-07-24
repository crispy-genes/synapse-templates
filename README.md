# synapse-templates

Template registry for the synapse CLI.

## Layout

```
templates/
├── agents/       # Subagent definitions
├── rules/        # Project rule documents
├── skills/       # Skill / slash-command definitions
├── fragments/    # Reusable content blocks embedded by templates
└── packs/        # Named bundles of agents + skills + rules + hooks
v1/
└── index.json    # Generated manifest — do not edit by hand
site/             # Static catalog website (GitHub Pages)
scripts/
└── build-index.mjs
```

## Template format

Every template is one `.md` file. The filename (without `.md`) is the template's
canonical name. Frontmatter requirements:

```markdown
---
description: One-line summary shown in catalogs and CLI listings   # required
tags: [api, backend]                                               # optional, inline array
---

Template body in markdown.
```

- `description` is required and should fit on one line.
- `tags` power catalog filtering. Use lowercase kebab-case, keep the vocabulary small —
  check existing templates for a tag before inventing a near-duplicate.
- Templates may carry additional passthrough fields the consuming tool understands
  (`name`, `model`, `argument-hint` on agents/skills; `globs` block lists on rules).
  If `name` is present it must match the filename.
- Frontmatter supports `key: value` lines and block lists of scalars — no nested YAML.

## Fragments

Fragments are reusable content blocks under `templates/fragments/`, optionally
organized into subfolders (e.g. `fragments/api/`). The filename is the fragment's
id and must be unique across all subfolders. Templates (and other fragments) embed
fragments with Obsidian-style transclusion syntax in the body:

```markdown
![[fragment-id]]
```

Fragment frontmatter:

```markdown
---
id: rest-route-design              # must match the filename
description: One-line summary      # required
kind: convention                   # optional: convention | template
---
```

Embeds inside code fences or inline code spans are ignored. The build fails on
embeds of unknown fragment ids and on transclusion cycles between fragments.

## Packs

Packs are named bundles under `templates/packs/`. The frontmatter lists the member
templates by name; the body is optional prose:

```markdown
---
description: One-line summary          # required
tags: [backend, express]               # optional, inline array
agents:
  - backend
skills:
  - add-api-route
rules:
  - api-conventions
hooks:
  - docs-drift
---
```

Every listed agent/skill/rule must exist in this repo (the build fails otherwise).
Hooks are exempt — hook templates ship inside the synapse CLI.

## Manifest

`v1/index.json` maps every template to `{ name, type, description, tags, path, sha256 }`,
plus `usesFragments` (directly embedded fragment ids) when a template embeds fragments.
Fragments appear in a top-level `fragments` array as
`{ id, description, kind, path, sha256, usesFragments }`; packs in a top-level `packs`
array as `{ name, description, tags, path, sha256, agents, skills, rules, hooks }`.
The `v1/` path segment is the manifest schema version.

Regenerate locally with:

```bash
node scripts/build-index.mjs
```

CI rebuilds the manifest on every push to `main` and fails pull requests whose manifest
is stale or whose frontmatter is invalid, so run the script before pushing.

## Catalog website

`site/` is a React + Vite + TypeScript + Tailwind app that reads the same
`v1/index.json` the CLI uses. It shows the segmented catalog with tag filtering,
per-template Source/Resolved views (fragments expanded), fragment pages with a
"Used by" panel, pack pages with member links, and copyable install commands.

Deployed to GitHub Pages by `.github/workflows/deploy-site.yml` on every push to
`main` (enable Pages with source "GitHub Actions" in the repo settings). Develop
locally:

```bash
cd site
pnpm install
pnpm dev        # dev server — serves ../v1 and ../templates automatically
pnpm test       # lib unit tests
pnpm build      # production build to site/dist
```

## Contributing

1. Add or edit a `.md` file under the right `templates/` subfolder.
2. Run `node scripts/build-index.mjs` (validates frontmatter, rebuilds the manifest).
3. Open a PR.
