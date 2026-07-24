---
name: verify-types
description: Run the TypeScript compiler in check mode to find and fix type errors across the project. Use when the user asks to check for type errors, before committing changes that affect types or interfaces, or after refactoring shared interfaces. Do not use for non-TypeScript projects, runtime validation (use add-zod-schema), or ESLint/formatting/linting issues.
uses:
  - typescript-strictness
---
## Steps

1. Run the TypeScript compiler in check mode: `npx tsc --noEmit` (or the project's custom typecheck script, e.g. `pnpm typecheck`, if one exists).
2. If there are errors, read each error message and identify the source file and line.
3. Fix type errors one at a time, starting with errors that cause cascading failures.
4. Common fixes: add missing types, fix incorrect type assertions, update interfaces.
5. Re-run the check to confirm all errors are resolved.
6. Verify: zero type errors reported.

## Before you start

Inspect the project to confirm — do not assume:

- TypeScript is configured (`tsconfig.json` exists) and where it lives; whether project references are used
- Whether the project has a custom typecheck script (e.g. `pnpm typecheck`)
- Whether composite builds or incremental compilation affect the check command

## Conventions

The strictness rules this skill applies directly:

![[typescript-strictness]]
