---
name: add-mongoose-schema
description: Create a Mongoose model with typed schema, indexes, hooks, and a TypeScript interface for MongoDB collections. Use when the user needs a new database model for a MongoDB collection or a new data entity backed by Mongoose. Do not use for other ORMs/ODMs (Prisma, Drizzle, TypeORM), API routes (use add-api-route), or validation-only schemas without persistence (use add-zod-schema).
argument-hint: "[model-name]"
uses:
  - schema-design
  - db-field-naming
  - existing-patterns-first
---
## Steps

1. Create a new model file at the appropriate path for `$ARGUMENTS` (e.g. `src/models/$ARGUMENTS.ts`), matching existing model naming and export patterns.
2. Define the TypeScript interface for the document.
3. Create the Mongoose schema with proper field types, required flags, and defaults. Add `timestamps: true` to schema options unless there's a reason not to.
4. Add indexes for fields that will be queried frequently and for unique constraints.
5. Add any pre/post hooks (e.g. password hashing).
6. Export the model: `export const $ARGUMENTS = model<I$ARGUMENTS>("$ARGUMENTS", schema)`.
7. Run the project's type check and confirm no errors.

## Assumptions to verify

Inspect the codebase to confirm — do not assume:

- That the project uses MongoDB with Mongoose as its ODM
- Where model files are stored in the project
- Whether TypeScript interfaces are co-located with schema definitions
- Existing model naming and export patterns

## Conventions

The conventions this skill applies directly:

![[schema-design]]

![[db-field-naming]]

![[existing-patterns-first]]
