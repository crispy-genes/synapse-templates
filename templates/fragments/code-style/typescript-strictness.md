---
id: typescript-strictness
description: TypeScript strictness — no any, no unnecessary assertions
kind: convention
---
- Use strict mode.
- Avoid `any` except at justified boundaries — never use `any` to silence a type error.
- Prefer `unknown` over `any` when the type is truly unknown, then narrow with type guards.
- Avoid unnecessary `as` assertions.
- If a library lacks types, check for `@types/` packages before writing custom declarations.
