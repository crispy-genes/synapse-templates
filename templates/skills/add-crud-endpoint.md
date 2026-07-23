---
name: add-crud-endpoint
description: Scaffold a complete set of RESTful CRUD endpoints (list, get, create, update, delete) for a resource.
argument-hint: '[resource-name]'
tags: [api, backend, crud]
---

## Steps

1. Create route handlers for $ARGUMENTS with all CRUD operations:
   - GET /$ARGUMENTS — list all (with pagination)
   - GET /$ARGUMENTS/:id — get one by ID
   - POST /$ARGUMENTS — create new
   - PUT /$ARGUMENTS/:id — update by ID
   - DELETE /$ARGUMENTS/:id — delete by ID
2. Add request validation schemas for create and update payloads
3. Implement each handler with proper database queries
4. Add error handling (404 for not found, 400 for validation errors, 500 for server errors)
5. Register all routes in the router
6. Verify: run type check and confirm no errors

## Use this skill when

- The user needs a full CRUD API for a new resource
- The task requires multiple related endpoints for one entity
- The user asks for standard REST endpoints with list/get/create/update/delete

## Do not use this skill when

- The user needs only a single endpoint (use add-api-route instead)
- The task is about GraphQL mutations or queries
- The project uses RPC-style APIs instead of REST conventions

## Assumptions to verify

- Which backend framework is in use (Express, Fastify, Hono, etc.)
- Where route handlers are stored in the project
- What database or ORM is used for data access (Mongoose, Prisma, Drizzle)
- Existing CRUD patterns and response formats in the codebase

## Conventions

- Use RESTful URL patterns (plural resource names, nested routes for relationships)
- Return consistent response shapes: `{ data, meta }` for lists, `{ data }` for single items
- Use proper HTTP status codes (200, 201, 204, 400, 404, 500)
- Validate all input before processing

## Constraints

- Inspect existing project patterns before creating new files
- Prefer minimal diffs over sweeping changes
- Reuse existing utilities and abstractions before adding new ones
- Do not invent files, directories, or patterns not established in the codebase
