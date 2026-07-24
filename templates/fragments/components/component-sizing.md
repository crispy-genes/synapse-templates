---
id: component-sizing
description: Component size and file structure
kind: convention
---
- One component per file. Give a component its own folder only when it has companion files (CSS, tests); single-file components stay flat.
- Keep components small and focused — extract sub-components when they grow past ~200 lines.
- A component file contains only the component and its props interface — extract helper functions to `lib/` and shared types to `types/`."
- Hooks live in a `hooks/` directory at the same level as `components/`, never inside a component folder.
- Files in `hooks/` contain only hooks. A context provider is a component and lives in `components/`; put the shared context object in `lib/` so the hook and provider can both import it.
