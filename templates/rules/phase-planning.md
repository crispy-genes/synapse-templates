---
description: Evaluates incoming requests and decomposes all new features into phased PRs with cross-session context
provides:
  - phase-criteria
  - phase-requirements
  - phase-completion-protocol
uses:
  - phase-plan-format
---
## When to phase

![[phase-criteria]]

Even a small feature gets a plan — the plan still provides the tracking, branch naming, and context handoff structure.

## How to phase

All `.synapse/` paths are relative to the project root (the directory containing `.git/`). Never create `.synapse/` at the filesystem root or home directory.

1. Before writing any code, analyze the request and determine if phasing applies.
2. If it does, create a phase plan file in `<project-root>/.synapse/phases/` and update `<project-root>/.synapse/phases/PHASES.md`.
3. Write a context handoff in each phase — what the next session needs to know.

![[phase-requirements]]

## Completing a phase

![[phase-completion-protocol]]

## Phase plan file format

![[phase-plan-format]]

## Ordering across features

When a user's request contains multiple features, create a plan file for each, but work on them **one feature at a time**. Only the feature currently being worked on should have an in-progress (→) phase — all other features remain planned (○) until you get to them.

Pick the order based on dependencies between features, or if independent, by complexity (simpler first). Within `PHASES.md`, the first listed feature is the active one.

## Resuming a phase

When starting a new session, check `<project-root>/.synapse/phases/PHASES.md` for active plans. If one exists, read the full plan file and the context handoff from the previous phase before beginning work. Do not ask the user to re-explain — the plan has the context.
