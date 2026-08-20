---
description: Flags docs drift when the public surface changes but docs do not
tags: [docs, workflow]
event: Stop
async: true
timeout: 60
---
A cheap, no-AI drift check that runs when Claude stops. If the working tree touches the project's public surface (commands, entry point, `package.json`) but nothing under `docs/`, it nudges you to run `/update-docs`. It never blocks the Stop event and soft-exits when `git` or `jq` are missing.

Override the globs with an optional `.claude/docs-drift.json` containing `sourceGlobs` and `docsGlobs` string arrays, e.g. `{ "sourceGlobs": ["src/api/*"], "docsGlobs": ["docs/*"] }`.

```bash
#!/usr/bin/env bash
# docs-drift.sh — Stop hook installed by the "docs-maintenance" pack.
#
# Cheap drift check (no AI call): when a change set touches the project's public
# surface but nothing under docs/, nudge the user to run /update-docs. Reads
# optional glob overrides from .claude/docs-drift.json; otherwise uses
# CLI-oriented defaults. Never blocks the Stop event.
set -euo pipefail

# Soft-exit when prerequisites are missing — a nudge must never break stopping.
command -v git >/dev/null 2>&1 || exit 0
command -v jq  >/dev/null 2>&1 || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

# Consume (and ignore) the Stop hook payload on stdin.
cat >/dev/null

ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo .)
CONFIG="$ROOT/.claude/docs-drift.json"

# source = public surface that should be documented; docs = where docs live.
SOURCE_GLOBS="src/commands/* src/index.* bin/* package.json"
DOCS_GLOBS="docs/* README.md"
if [ -f "$CONFIG" ]; then
  CFG_SRC=$(jq -r '.sourceGlobs // [] | join(" ")' "$CONFIG" 2>/dev/null || echo "")
  CFG_DOCS=$(jq -r '.docsGlobs // [] | join(" ")' "$CONFIG" 2>/dev/null || echo "")
  [ -n "$CFG_SRC" ]  && SOURCE_GLOBS="$CFG_SRC"
  [ -n "$CFG_DOCS" ] && DOCS_GLOBS="$CFG_DOCS"
fi

# Changed paths: staged + unstaged + untracked. -uall lists untracked files
# individually (without it, a brand-new dir collapses to "dir/"). cut -c4- strips
# the porcelain status prefix ("XY "). || true keeps set -e happy on edge results.
CHANGED=$(git -C "$ROOT" status --porcelain -uall | cut -c4- || true)
[ -z "$CHANGED" ] && exit 0

# In a case pattern an unquoted * matches across "/", so "src/commands/*" also
# covers nested paths.
matches() {
  local f="$1"; shift
  local g
  for g in "$@"; do
    case "$f" in $g) return 0;; esac
  done
  return 1
}

touched_source=0
touched_docs=0
while IFS= read -r f; do
  [ -z "$f" ] && continue
  if matches "$f" $SOURCE_GLOBS; then touched_source=1; fi
  if matches "$f" $DOCS_GLOBS;   then touched_docs=1; fi
done <<< "$CHANGED"

if [ "$touched_source" -eq 1 ] && [ "$touched_docs" -eq 0 ]; then
  jq -n '{systemMessage: "Public surface changed (commands / entry point / package.json) but docs/ is untouched — run /update-docs to reconcile the docs with the code."}'
fi

exit 0
```
