---
name: add-constant
description: Add typed constants with proper naming, placement, and exports to the project's constants directory. Use when the user needs a new constant or enum-like value, wants to centralize a hardcoded value, or is replacing magic numbers. Do not use for environment-specific values (they belong in .env), runtime configuration that changes per deployment, or updating an existing constant's value.
argument-hint: "[resource-name]"
uses:
  - constants-conventions
  - existing-patterns-first
---
## Steps

1. Identify the appropriate constants file for `$ARGUMENTS` (e.g. `src/constants/$ARGUMENTS.ts` or `src/config/constants.ts`) — group with related constants if a file already exists.
2. Define the constant with a descriptive UPPER_SNAKE_CASE name.
3. Add a TypeScript type annotation, using `as const` for literal types when appropriate.
4. Export the constant (named export) and update any barrel exports the project uses.
5. Run the project's type check and confirm no errors.

## Before you start

Inspect the codebase to confirm — do not assume:

- Where constants are stored in the project (`src/constants/`, `src/config/`, etc.)
- Whether the project uses barrel exports for constants
- Existing naming conventions and whether `as const` is used for literal type inference

## Conventions

The conventions this skill applies directly:

![[constants-conventions]]

![[existing-patterns-first]]
