---
description: Enforce consistent code style across the project
provides:
  - existing-patterns-first
  - typescript-strictness
  - constants-conventions
---
## Principles

- Match the project's existing style and formatter configuration.
- Prefer readability, consistency, and maintainability over cleverness.
- Keep functions, files, and modules focused and single-purpose.
- No comments in the code — all code should be self-explanatory.

![[existing-patterns-first]]

## Formatting

- JS/TS: 2 spaces; Python: 4 spaces.
- Target 100 characters per line — the limit may be exceeded for tailwind `className` props only.
- Use trailing commas in multi-line structures.
- Use double quotes in JS/TS unless the formatter enforces otherwise.

## Naming

- JS/TS variables and functions: camelCase; Python variables and functions: snake_case.
- Classes, types, interfaces, and React components: PascalCase.
- Prefer boolean names that read clearly as booleans (`isLoading`, `hasAccess`, `canRetry`).
- File names: kebab-case for modules/utilities, snake_case for Python.

## Structure

- Prefer one primary abstraction per file.
- Prefer named exports over default exports unless framework conventions require otherwise; avoid barrel exports where possible.
- Group imports: external, internal, relative.
- Prefer `const` by default and early returns over deep nesting.
- Define all file-local declarations before their first use — functions, classes, types, interfaces, enums, constants, and helpers. Avoid forward references.
- Extract helpers when logic becomes difficult to scan.
- Avoid unexplained magic numbers and repeated literals when a named constant would improve clarity.
- All types should have their own files within a `types/` folder.

## TypeScript

![[typescript-strictness]]

- Prefer `interface` for most named object shapes and `type` for unions/intersections.
- Use `readonly` where immutability is intended.
- Prefer union types over enums in most cases.
- When importing `.ts` files, never include the extension at the end.

## Constants

![[constants-conventions]]
