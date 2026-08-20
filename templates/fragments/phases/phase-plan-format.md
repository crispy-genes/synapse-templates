---
id: phase-plan-format
description: The plan file and PHASES.md index formats a phase plan emits
kind: template
---
Write phase plans to `<project-root>/.claude/phases/{slug}.md`:

````markdown
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
````

After creating or updating a plan, update `<project-root>/.claude/phases/PHASES.md`:

````markdown
# Active Plans

## {slug} — {feature title}
  ✓ Phase 1: {completed phase title}
  → Phase 2: {current phase title}
  ○ Phase 3: {future phase title}
Branch: {branch}
````

Icons: ✓ completed, → in-progress, ○ planned. Keep `PHASES.md` minimal — plan title plus one line per phase. Remove entries when a plan is completed.
