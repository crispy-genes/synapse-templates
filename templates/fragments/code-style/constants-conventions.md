---
id: constants-conventions
description: Naming, placement, and typing of constants
kind: convention
---
- True constants use UPPER_SNAKE_CASE; group related constants in the same file.
- Use `as const` assertions for object and array constants to preserve literal types.
- Repeated string literal unions (e.g. status values) are defined as `as const` arrays in a `constants/` directory, with types derived via `(typeof ARRAY)[number]` in a type folder inside `types/` (same level as `constants/`).
