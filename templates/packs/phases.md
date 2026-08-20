---
description: Phased implementation planning with cross-session context handoffs
tags: [workflow, planning]
skills:
  - phase-plan
rules:
  - phase-planning
hooks:
  - phases-status
---
Breaks every new feature into PR-sized phases that Claude implements one per session. Plans live in `.claude/phases/` — commit them with the code; they are Claude's working memory across sessions.

- `phase-plan` skill — writes the plan file and the `PHASES.md` index.
- `phase-planning` rule — enforces one phase per session and the stop-and-confirm protocol.
- `phases-status` hook — a `SessionStart` hook that prints `PHASES.md` so every session opens with the active plans.
