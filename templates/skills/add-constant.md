---
name: add-constant
description: Add typed constants with proper naming, placement, and exports to the project's constants directory.
argument-hint: '[resource-name]'
tags: [conventions]
---

## Steps

1. Identify the appropriate constants file for $ARGUMENTS (e.g. src/constants/$ARGUMENTS.ts or src/config/constants.ts)
2. Define the constant with a descriptive name using UPPER_SNAKE_CASE
3. Add a TypeScript type annotation (use `as const` for literal types when appropriate)
4. Export the constant (named export)
5. Update any barrel exports if the project uses them
6. Verify: run type check and confirm no errors

## Use this skill when

- The user needs to define a new constant or enum-like value
- The task involves adding configuration values or replacing magic numbers
- The user wants to centralize a hardcoded value into a constants file

## Do not use this skill when

- The value is environment-specific and belongs in .env
- The user needs runtime configuration that changes per deployment
- The constant already exists and just needs its value updated

## Assumptions to verify

- Where constants are stored in the project (src/constants/, src/config/, etc.)
- Whether the project uses barrel exports for constants
- Existing naming conventions (UPPER_SNAKE_CASE vs camelCase)
- Whether `as const` is used for literal type inference

## Conventions

- Use UPPER_SNAKE_CASE for constant names
- Group related constants in the same file
- Use `as const` assertions for object and array constants to preserve literal types
- Add a brief comment if the constant's purpose isn't obvious from its name

## Constraints

- Inspect existing project patterns before creating new files
- Prefer minimal diffs over sweeping changes
- Reuse existing utilities and abstractions before adding new ones
- Do not invent files, directories, or patterns not established in the codebase
