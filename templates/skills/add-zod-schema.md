---
name: add-zod-schema
description: Define Zod validation schemas with inferred TypeScript types for request validation, form data, or domain models. Use when the user needs input validation for an endpoint or form, or a typed schema with runtime validation. Do not use for other validators (Joi, class-validator, Yup), database schemas (use add-mongoose-schema), or TypeScript types without runtime validation.
argument-hint: "[model-name]"
uses:
  - request-validation
  - existing-patterns-first
---
## Steps

1. Create a new schema file at the appropriate path for `$ARGUMENTS` (e.g. `src/schemas/$ARGUMENTS.ts` or `src/validators/$ARGUMENTS.ts`), matching existing schema naming patterns.
2. Define the Zod schema with all required fields and proper types.
3. Add validation constraints (min, max, email, url, regex, etc.) where appropriate.
4. Export the schema and infer the TypeScript type: `export type $ARGUMENTS = z.infer<typeof $ARGUMENTSSchema>`.
5. If this schema relates to an API endpoint, use it in the route's request validation.
6. Run the project's type check and confirm no errors.

## Assumptions to verify

Inspect the codebase to confirm — do not assume:

- Whether Zod is already a project dependency
- Where schema files are stored in the project
- Whether schemas are shared between client and server
- Existing schema naming patterns (e.g. `userSchema`, `CreateUserSchema`)

## Conventions

- Name schemas with a Schema suffix (e.g. `userSchema`, `createPostSchema`) and group related schemas in the same file (create, update, response variants).
- Use `z.object()` for object shapes, not `z.record()` unless truly dynamic.
- Prefer `z.string().min(1)` over `z.string()` for required string fields.

These schemas back the route-boundary validation conventions:

![[request-validation]]

![[existing-patterns-first]]
