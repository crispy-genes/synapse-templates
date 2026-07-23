---
name: add-component
description: Create a new reusable UI component with typed props, styling, and proper exports.
argument-hint: '[component-name]'
tags: [frontend, react]
---

## Steps

1. Create a new component file at the appropriate path for $ARGUMENTS (e.g. src/components/$ARGUMENTS.tsx)
2. Define the component with a clear props interface using TypeScript
3. Implement the component JSX with proper styling (Tailwind classes, CSS modules, etc.)
4. Add any local state or hooks the component needs
5. Export the component (named export preferred)
6. If reusable, add it to any barrel export files (index.ts)
7. Verify: run type check and confirm no errors

## Use this skill when

- The user asks to create a new reusable UI component
- The task needs a self-contained UI element with typed props
- The user wants to extract part of a page into its own component

## Do not use this skill when

- The task is adding a full page with routing (use add-react-page instead)
- The task is backend-only with no UI changes
- The component already exists and just needs modification

## Assumptions to verify

- Which UI framework is in use (React, Vue, Svelte)
- What styling approach the project uses (Tailwind, CSS modules, styled-components)
- Component file naming convention (PascalCase, kebab-case)
- Whether barrel exports (index.ts) are used in the components directory

## Conventions

- Use the project's existing component patterns (function components, arrow functions, etc.)
- Follow the project's file naming convention (PascalCase, kebab-case, etc.)
- Keep components small and focused — extract sub-components when complexity grows
- Use the project's design system tokens/classes for styling

## Constraints

- Inspect existing project patterns before creating new files
- Prefer minimal diffs over sweeping changes
- Reuse existing utilities and abstractions before adding new ones
- Do not invent files, directories, or patterns not established in the codebase
