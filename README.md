# synapse-templates

Template registry for the synapse CLI.

## Layout

```
templates/
├── agents/       # Subagent definitions
├── rules/        # Project rule documents
└── skills/       # Skill / slash-command definitions
v1/
└── index.json    # Generated manifest — do not edit by hand
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

## Manifest

`v1/index.json` maps every template to `{ name, type, description, tags, path, sha256 }`.
The `v1/` path segment is the manifest schema version.

Regenerate locally with:

```bash
node scripts/build-index.mjs
```

CI rebuilds the manifest on every push to `main` and fails pull requests whose manifest
is stale or whose frontmatter is invalid, so run the script before pushing.

## Contributing

1. Add or edit a `.md` file under the right `templates/` subfolder.
2. Run `node scripts/build-index.mjs` (validates frontmatter, rebuilds the manifest).
3. Open a PR.
