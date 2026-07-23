---
description: Enforce consistent code style across the project
tags: [style, conventions]
---

## Formatting
- Use consistent indentation (match the project's existing style)
- Keep lines under 120 characters
- Use trailing commas in multi-line arrays, objects, and function parameters
- Prefer single quotes for strings unless the project uses double quotes

## Naming
- Variables and functions: camelCase
- Classes and types: PascalCase
- Constants: UPPER_SNAKE_CASE for true constants, camelCase for derived values
- File names: kebab-case for utilities, PascalCase for components/classes
- Boolean variables: prefix with is, has, can, should

## Structure
- One export per file for major abstractions (classes, large components)
- Group imports: external packages first, then internal modules, then relative imports
- Prefer named exports over default exports
- Keep functions under 40 lines — extract helpers when logic is complex
- Prefer early returns over deeply nested conditionals

## TypeScript
- Prefer interfaces over type aliases for object shapes
- Use strict mode — no implicit any
- Avoid type assertions (as) unless narrowing from unknown
- Use readonly for properties that should not be reassigned
- Prefer union types over enums
