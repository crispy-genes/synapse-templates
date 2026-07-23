---
name: add-zod-schema
description: Define Zod validation schemas with inferred TypeScript types for request validation, form data, or domain models.
argument-hint: '[model-name]'
tags: [validation, typescript]
---

## Steps

1. Create a new schema file at the appropriate path for $ARGUMENTS (e.g. src/schemas/$ARGUMENTS.ts or src/validators/$ARGUMENTS.ts)
2. Define the zod schema with all required fields and proper types
3. Add validation constraints (min, max, email, url, regex, etc.) where appropriate
4. Export the schema and infer the TypeScript type: `export type $ARGUMENTS = z.infer<typeof $ARGUMENTSSchema>`
5. If this schema relates to an API endpoint, use it in the route's request validation
6. Verify: run type check and confirm no errors

## Use this skill when

- The user needs input validation for an endpoint or form
- The task requires a typed schema definition with runtime validation
- The user asks for request/response type safety using Zod

## Do not use this skill when

- The project uses a different validator (Joi, class-validator, Yup)
- The task is about Mongoose/database schemas (use add-mongoose-schema instead)
- The user only needs TypeScript types without runtime validation

## Assumptions to verify

- Whether Zod is already a project dependency
- Where schema files are stored in the project
- Whether schemas are shared between client and server
- Existing schema naming patterns (e.g. userSchema, CreateUserSchema)

## Conventions

- Name schemas with a Schema suffix (e.g. userSchema, createPostSchema)
- Group related schemas in the same file (create, update, response variants)
- Use z.object() for object shapes, not z.record() unless truly dynamic
- Prefer z.string().min(1) over z.string() for required string fields

## Constraints

- Inspect existing project patterns before creating new files
- Prefer minimal diffs over sweeping changes
- Reuse existing utilities and abstractions before adding new ones
- Do not invent files, directories, or patterns not established in the codebase
