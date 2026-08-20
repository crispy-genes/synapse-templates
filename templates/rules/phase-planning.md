---
description: Evaluates incoming requests and decomposes all new features into phased PRs with cross-session context
provides:
  - phase-criteria
  - phase-requirements
  - phase-completion-protocol
uses:
  - phase-plan-format
---
## Phase enforcement

**CRITICAL**: For any new feature that meets the criteria below:
- You MUST create a phase plan file under `.claude/phases/` BEFORE writing code.
- Implement ONLY ONE phase per session/PR — stop after completing a phase and wait for review.
- Do NOT use the built-in plan mode as a substitute for the phasing system.
- Do NOT implement multiple phases in a single session, even if the plan covers all phases.

## When to phase

![[phase-criteria]]

Even a small feature gets a plan — the plan still provides the tracking, branch naming, and context handoff structure.

## How to phase

All `.claude/phases/` paths are relative to the project root (the directory containing `.git/`). Never create `.claude/phases/` at the filesystem root or home directory. Create the directory if it does not exist yet.

1. Before writing any code, analyze the request and determine if phasing applies.
2. If it does, create a phase plan file in `<project-root>/.claude/phases/` and update `<project-root>/.claude/phases/PHASES.md`.
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

When starting a new session, check `<project-root>/.claude/phases/PHASES.md` for active plans. If one exists, read the full plan file and the context handoff from the previous phase before beginning work. Do not ask the user to re-explain — the plan has the context.
