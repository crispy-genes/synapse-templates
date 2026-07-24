---
name: add-api-route
description: Create or modify HTTP route handlers, controllers, and request validation for backend APIs. Use when the user asks to add or scaffold a new API endpoint or needs HTTP request handling wired up with validation. Do not use for frontend-only work, client-side API call functions (use add-api-client-route), or documenting existing endpoints (use add-api-docs).
argument-hint: "[resource-name]"
uses:
  - rest-route-design
  - request-validation
  - existing-patterns-first
---
## Steps

1. Create a new route file at the appropriate path for `$ARGUMENTS` (e.g. `src/routes/$ARGUMENTS.ts` or `src/api/$ARGUMENTS.ts`) — match where similar routes already live.
2. Define the route handler with the proper HTTP method (GET, POST, PUT, PATCH, DELETE).
3. Add request validation using the project's validation library (Zod, Joi, etc.).
4. Implement the route logic — delegate to services/database as needed.
5. Add error handling with appropriate HTTP status codes, using the project's consistent error response format.
6. Register the route in the main router/app entry point.
7. Run the project's type check and confirm no errors.

## Before you start

Inspect the codebase to confirm — do not assume:

- Which backend framework is in use (Express, Fastify, Hono, Koa, etc.)
- Where route files are located in the project structure
- What validation library is used (Zod, Joi, class-validator, etc.)
- Whether middleware patterns exist that new routes should follow

## Conventions

The conventions this skill applies directly:

![[rest-route-design]]

![[request-validation]]

![[existing-patterns-first]]
