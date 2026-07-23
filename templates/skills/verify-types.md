---
name: verify-types
description: Run the TypeScript compiler in check mode to find and fix type errors across the project.
tags: [typescript, tooling]
---

## Steps

1. Run the TypeScript compiler in check mode: `npx tsc --noEmit`
2. If there are errors, read each error message and identify the source file and line
3. Fix type errors one at a time, starting with errors that cause cascading failures
4. Common fixes: add missing types, fix incorrect type assertions, update interfaces
5. Re-run `npx tsc --noEmit` to confirm all errors are resolved
6. Verify: zero type errors reported

## Use this skill when

- The user asks to check for type errors
- Before committing changes that affect TypeScript types or interfaces
- After refactoring or modifying shared interfaces
- The user wants to validate TypeScript correctness across the project

## Do not use this skill when

- The project does not use TypeScript
- The user wants runtime validation (use add-zod-schema instead)
- The user is asking about ESLint, formatting, or linting issues

## Assumptions to verify

- That TypeScript is configured in the project (tsconfig.json exists)
- The correct tsconfig.json location and whether project references are used
- Whether the project has a custom typecheck script (e.g. pnpm typecheck)
- Whether composite builds or incremental compilation affect the check command

## Conventions

- Never use `any` to silence type errors — find the correct type
- Prefer `unknown` over `any` when the type is truly unknown, then narrow with type guards
- If a library lacks types, check for @types/ packages before writing custom declarations

## Constraints

- Inspect existing project patterns before creating new files
- Prefer minimal diffs over sweeping changes
- Reuse existing utilities and abstractions before adding new ones
- Do not invent files, directories, or patterns not established in the codebase
