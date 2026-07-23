---
name: phase-plan
description: Evaluate a feature request and create a phased implementation plan for manageable PRs with cross-session context
tags: [workflow, planning]
---

## Steps

1. Read the user's request and identify each distinct feature
2. If the request is ONLY a refactor, bug fix, or documentation change, tell the user and proceed normally — no phase plan needed
3. For EVERY new feature (regardless of size), create a phase plan. Use 1 phase for small features, 2-5 for larger ones:
   - Each phase must be independently deployable
   - Each phase targets 200-400 lines of meaningful changes
   - Order: schema → backend → API → frontend (tests with each phase)
4. Locate the project root (the directory containing `.git/`). All `.synapse/` paths below are relative to this root. The `<project-root>/.synapse/phases/` directory is created by `synapse phases init` and should already exist — do NOT run `mkdir` yourself.
5. Write the phase plan to `<project-root>/.synapse/phases/{slug}.md` using the format defined in the phase-planning rule
6. Write or update `<project-root>/.synapse/phases/PHASES.md` with a summary entry for this plan
7. Show the plan to the user and ask for confirmation before starting phase 1

## Phase completion checklist

When you finish the implementation work for a phase, follow these steps IN ORDER. Do not skip or reorder.

1. **STOP writing code.** The implementation for this phase is done.
2. **Show the user a summary** of what was built — key files changed, components added, decisions made. Ask the user to review and confirm the phase is complete. **WAIT for explicit confirmation before continuing.**
3. **After the user confirms**, do ALL of the following:
   a. Fill in the "What was done" section in the plan file with key artifacts and decisions
   b. Fill in the "Context for next phase" section with everything the next session needs
   c. Update the phase status to `completed` and advance `current_phase`
   d. Update PHASES.md to reflect the new current phase
   e. Commit all changes (implementation + plan file updates) and push the branch to the remote
4. **STOP.** Do not switch branches. Do not start the next phase. The session is done for this phase. The next phase starts in a new session.

## Use this skill when

- The user gives ANY new feature request — every feature gets a phase plan, regardless of size
- A session starts and `<project-root>/.synapse/phases/PHASES.md` has active entries
- The user asks to check progress on a phased feature

## Do not use this skill when

- The request is a refactor, code cleanup, or rename
- The request is a bug fix
- The request is documentation-only
- The user explicitly says to do everything in one PR

## Assumptions to verify

- The project uses git for version control
- The user is comfortable with multi-PR workflows
- Previous phases (if resuming) have been merged or are on the main branch

## Conventions

- Phase plan slugs are kebab-case derived from the feature name
- Branch naming: `feat/{slug}-{phase-short-name}`
- Context handoff sections are mandatory — they are the cross-session bridge
- PHASES.md stays minimal — plan title plus one line per phase with status icon (✓ → ○)

## Constraints

- Maximum 5 phases per plan
- Each phase must be independently deployable — no broken intermediate states
- NEVER commit without showing the user what changed and getting explicit confirmation first
- NEVER switch branches or start the next phase after completing one — the session ends after a phase is committed and pushed
- Work on ONE feature at a time — only one feature should have an in-progress (→) phase at any point
- Do not phase refactors, bug fixes, or documentation-only changes
- Every new feature gets a plan — use a single phase (1 of 1) if the scope is small
