---
name: phase-plan
description: Evaluate a feature request and create a phased implementation plan for manageable PRs with cross-session context. Use for ANY new feature request (every feature gets a plan regardless of size), when a session starts with active entries in .claude/phases/PHASES.md, or to check progress on a phased feature. Do not use for refactors, cleanups, renames, bug fixes, documentation-only changes, or when the user explicitly wants everything in one PR.
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

4. Locate the project root (the directory containing `.git/`). All `.claude/phases/` paths are relative to this root. Create `<project-root>/.claude/phases/` if it does not exist yet — never create it at the filesystem root or home directory.
5. Write the phase plan to `<project-root>/.claude/phases/{slug}.md` and update `<project-root>/.claude/phases/PHASES.md` using the formats below.
6. Show the plan to the user and ask for confirmation before starting phase 1.

## Phase completion

When you finish the implementation work for a phase, follow this protocol exactly — do not skip or reorder:

![[phase-completion-protocol]]

## Plan formats

![[phase-plan-format]]

## Assumptions to verify

Inspect the project to confirm — do not assume:

- Where the project root is (the directory containing `.git/`)
- Whether `.claude/phases/PHASES.md` already tracks this feature
- Whether the request is genuinely new functionality rather than a refactor or bug fix

## Conventions

- Phase plan slugs are kebab-case derived from the feature name; branches are named `feat/{slug}-{phase-short-name}`.
- Context handoff sections are mandatory — they are the cross-session bridge.
- Work on ONE feature at a time — only one feature has an in-progress (→) phase at any point.
- NEVER commit without showing the user what changed and getting explicit confirmation first.
- Remove a plan file and its `PHASES.md` entry once every phase is completed.
