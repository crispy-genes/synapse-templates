---
name: add-mongoose-schema
description: Create a Mongoose model with typed schema, indexes, hooks, and a TypeScript interface for MongoDB collections.
argument-hint: '[model-name]'
tags: [database, mongodb]
---

## Steps

1. Create a new model file at the appropriate path for $ARGUMENTS (e.g. src/models/$ARGUMENTS.ts)
2. Define the TypeScript interface for the document
3. Create the Mongoose schema with proper field types, required flags, and defaults
4. Add indexes for fields that will be queried frequently
5. Add any pre/post hooks (e.g. password hashing, timestamps)
6. Export the model: `export const $ARGUMENTS = model<I$ARGUMENTS>("$ARGUMENTS", schema)`
7. Verify: run type check and confirm no errors

## Use this skill when

- The user needs a new database model for a MongoDB collection
- The task involves creating a Mongoose schema with typed fields
- The user asks to define a new data entity backed by MongoDB

## Do not use this skill when

- The project uses a different ORM/ODM (Prisma, Drizzle, TypeORM)
- The task is about API routes (use add-api-route instead)
- The user needs a validation-only schema without persistence (use add-zod-schema instead)

## Assumptions to verify

- That the project uses MongoDB with Mongoose as its ODM
- Where model files are stored in the project
- Whether TypeScript interfaces are co-located with schema definitions
- Existing model naming and export patterns

## Conventions

- Use singular PascalCase for model names (User, Post, Comment)
- Always define a TypeScript interface alongside the schema
- Add timestamps: true to schema options unless there's a reason not to
- Index fields used in queries and unique constraints

## Constraints

- Inspect existing project patterns before creating new files
- Prefer minimal diffs over sweeping changes
- Reuse existing utilities and abstractions before adding new ones
- Do not invent files, directories, or patterns not established in the codebase
