---
description: Print the active phase-plan index at the start of every session
tags: [workflow, planning]
event: SessionStart
timeout: 10
---
Prints `.claude/phases/PHASES.md` so Claude opens each session with the list of in-flight phase plans and picks up where the previous session left off. Silent when the file is absent.

```bash
#!/usr/bin/env bash
# phases-status.sh — SessionStart hook installed by the "phases" pack.
#
# Prints the active phase-plan index (.claude/phases/PHASES.md) so every session
# opens with the list of in-flight plans. Silent when the file is absent.
set -euo pipefail

# Consume (and ignore) the SessionStart payload on stdin.
cat >/dev/null

ROOT="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || echo .)}"
INDEX="$ROOT/.claude/phases/PHASES.md"

[ -f "$INDEX" ] || exit 0

cat "$INDEX"
exit 0
```
