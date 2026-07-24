---
name: phase-plan
description: Evaluate a feature request and create a phased implementation plan for manageable PRs with cross-session context. Use for ANY new feature request (every feature gets a plan regardless of size), when a session starts with active entries in .synapse/phases/PHASES.md, or to check progress on a phased feature. Do not use for refactors, cleanups, renames, bug fixes, documentation-only changes, or when the user explicitly wants everything in one PR.
provides:
  - phase-plan-format
uses:
  - phase-criteria
  - phase-requirements
  - phase-completion-protocol
---
## Steps

1. Read the user's request and identify each distinct feature.
2. Decide whether phasing applies:

![[phase-criteria]]

3. For every new feature, create a phase plan — 1 phase for small features, 2-5 for larger ones (maximum 5) — meeting these requirements:

![[phase-requirements]]

4. Locate the project root (the directory containing `.git/`). All `.synapse/` paths are relative to this root. The `<project-root>/.synapse/phases/` directory is created by `synapse phases init` and should already exist — do NOT run `mkdir` yourself.
5. Write the phase plan to `<project-root>/.synapse/phases/{slug}.md` and update `<project-root>/.synapse/phases/PHASES.md` using the formats below.
6. Show the plan to the user and ask for confirmation before starting phase 1.

## Phase completion

When you finish the implementation work for a phase, follow this protocol exactly — do not skip or reorder:

![[phase-completion-protocol]]

## Plan formats

![[phase-plan-format]]

## Conventions

- Phase plan slugs are kebab-case derived from the feature name; branches are named `feat/{slug}-{phase-short-name}`.
- Context handoff sections are mandatory — they are the cross-session bridge.
- Work on ONE feature at a time — only one feature has an in-progress (→) phase at any point.
- NEVER commit without showing the user what changed and getting explicit confirmation first.
