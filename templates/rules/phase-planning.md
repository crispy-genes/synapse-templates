---
description: Evaluates incoming requests and decomposes all new features into phased PRs with cross-session context
tags: [workflow, planning]
---

## When to phase

Create a phase plan for EVERY new feature request, regardless of perceived size. A feature that seems small often grows during implementation, and the phase plan provides structure and cross-session context even for single-phase features.

Decompose a request into phases when:
- The request introduces new functionality (not a refactor, cleanup, or bug fix)

Even a small feature gets a plan — use a single phase (1 of 1) if the scope is genuinely small. The plan still provides the tracking, branch naming, and context handoff structure.

## When NOT to phase

Do not create a phase plan ONLY when:
- The request is a refactor, rename, or code cleanup
- The request is a bug fix (even a complex one)
- The request is documentation-only
- The user explicitly says "do it all in one go"

## How to phase

All `.synapse/` paths are relative to the project root (the directory containing `.git/`). Never create `.synapse/` at the filesystem root or home directory.

1. Before writing any code, analyze the request and determine if phasing applies
2. If it does, create a phase plan file in `<project-root>/.synapse/phases/` and update `<project-root>/.synapse/phases/PHASES.md`
3. Each phase must:
   - Be independently deployable (no broken intermediate states)
   - Produce a single, reviewable PR (target: 200-400 lines)
   - Include its own tests
   - Build on previous phases without requiring future ones
4. Prefer sequential phases — use parallel only when phases are truly independent
5. Write a context handoff in each phase — what the next session needs to know
6. After finishing implementation for a phase:
   - STOP coding and show the user a summary of what was done
   - WAIT for the user to explicitly confirm the phase is complete
   - Only after confirmation: update the plan file, update PHASES.md, commit, and push
   - Do NOT switch branches or start the next phase — end the session here

## Phase plan file format

Write phase plans to `<project-root>/.synapse/phases/{slug}.md` with this structure:

```markdown
---
id: {slug}
title: "{feature title}"
created: {YYYY-MM-DD}
status: in-progress
current_phase: 1
total_phases: {N}
---

## Original Request
{The user's original request verbatim or summarized}

## Phase 1: {Title}
**Status**: in-progress
**Branch**: feat/{slug}-{short-name}
**Depends on**: none

### Scope
{What this phase delivers}

### What was done
<!-- filled in when phase completes -->

### Context for next phase
<!-- filled in when phase completes — this is the cross-session bridge -->
```

## PHASES.md index

After creating or updating a plan, update `<project-root>/.synapse/phases/PHASES.md`:

```markdown
# Active Plans

## {slug} — {feature title}
  ✓ Phase 1: {completed phase title}
  → Phase 2: {current phase title}
  ○ Phase 3: {future phase title}
Branch: {branch}
```

Icons: ✓ completed, → in-progress, ○ planned. Keep PHASES.md minimal — plan title plus one line per phase.
Remove entries when a plan is completed.

## Ordering across features

When a user's request contains multiple features, create a plan file for each, but work on them **one feature at a time**. Only the feature currently being worked on should have an in-progress (→) phase — all other features remain planned (○) until you get to them.

Pick the order based on dependencies between features, or if independent, by complexity (simpler first). Within PHASES.md, the first listed feature is the active one.

## Phase ordering within a feature

- Data model / schema first
- Backend logic second
- API surface third
- Frontend / UI last
- Tests accompany each phase (not a separate phase)

## Resuming a phase

When starting a new session, check `<project-root>/.synapse/phases/PHASES.md` for active plans.
If one exists, read the full plan file and the context handoff from the previous phase
before beginning work. Do not ask the user to re-explain — the plan has the context.
