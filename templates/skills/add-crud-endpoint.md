---
name: add-crud-endpoint
description: Scaffold a complete set of RESTful CRUD endpoints (list, get, create, update, delete) for a resource. Use when the user needs a full CRUD API for a new resource or standard REST endpoints for one entity. Do not use for a single endpoint (use add-api-route), GraphQL mutations/queries, or RPC-style APIs.
argument-hint: "[resource-name]"
provides:
  - crud-route-map
uses:
  - rest-route-design
  - response-format
  - existing-patterns-first
---
## Steps

1. Create route handlers for `$ARGUMENTS` covering all five CRUD operations (see the route map below).
2. Add request validation schemas for create and update payloads.
3. Implement each handler with proper database queries, following the project's data access patterns.
4. Add error handling (404 for not found, 400 for validation errors, 500 for server errors).
5. Register all routes in the router.
6. Run the project's type check and confirm no errors.

## Route map

![[crud-route-map]]

## Assumptions to verify

Inspect the codebase to confirm — do not assume:

- Which backend framework is in use (Express, Fastify, Hono, etc.)
- Where route handlers are stored in the project
- What database or ORM is used for data access (Mongoose, Prisma, Drizzle)
- Existing CRUD patterns and response formats in the codebase

## Conventions

The conventions this skill applies directly:

![[rest-route-design]]

![[response-format]]

![[existing-patterns-first]]
