---
id: component-sizing
description: Component size and file structure
kind: convention
---
- One component per file. Give a component its own folder only when it has companion files (CSS, tests); single-file components stay flat.
- Keep components small and focused — extract sub-components when they grow past ~200 lines.
- Hooks live in a `hooks/` directory at the same level as `components/`, never inside a component folder.
