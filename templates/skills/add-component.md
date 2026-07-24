---
name: add-component
description: Scaffold a new reusable UI component with typed props, styling, and exports. Use when the user asks to create a new UI component, or to extract part of a page into its own component. Do not use for full routed pages (use add-react-page) or backend-only work, or when the component already exists and only needs edits.
argument-hint: "[component-name]"
provides:
  - component-scaffold
uses:
  - component-naming
  - component-props
---
## Steps

1. Resolve placement: pick the correct path for `$ARGUMENTS` based on the existing component tree (e.g. `src/components/ui/`, `layout/`, or `feature/`). Match where similar components already live.
2. Define the component with an explicit, typed props interface.
3. Implement the JSX, styling with the project's established approach (inspect a neighbouring component first).
4. Add only the local state/hooks this component needs; place reusable hooks in the project's `hooks/` location, not inside the component.
5. Export it (named export preferred) and wire up any index/barrel file the project uses.
6. Run the project's type check and confirm no errors.

## Before you start

Inspect the codebase to confirm — do not assume:

- UI framework (React, Vue, Svelte)
- Styling approach (Tailwind, CSS modules, styled-components)
- File naming convention and where components are expected to live

## Conventions

The naming and props conventions this skill applies directly:

![[component-naming]]

![[component-props]]

## Template

![[component-scaffold]]
