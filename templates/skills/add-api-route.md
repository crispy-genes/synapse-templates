---
name: add-api-route
description: Create or modify HTTP route handlers, controllers, and request validation for backend APIs.
argument-hint: '[resource-name]'
tags: [api, backend]
---

## Steps

1. Create a new route file at the appropriate path for $ARGUMENTS (e.g. src/routes/$ARGUMENTS.ts or src/api/$ARGUMENTS.ts)
2. Define the route handler with proper HTTP method (GET, POST, PUT, PATCH, DELETE)
3. Add request validation using the project's validation library (zod, joi, etc.)
4. Implement the route logic — connect to services/database as needed
5. Add error handling with appropriate HTTP status codes
6. Register the route in the main router/app entry point
7. Verify: run type check and confirm no errors

## Use this skill when

- The user asks to add, create, or scaffold a new API endpoint
- The task requires a new backend route handler
- The user needs HTTP request handling wired up with validation

## Do not use this skill when

- The task is frontend-only with no backend changes
- The user needs client-side API call functions (use add-api-client-route instead)
- The task is only about documenting existing API endpoints (use add-api-docs instead)

## Assumptions to verify

- Which backend framework is in use (Express, Fastify, Hono, Koa, etc.)
- Where route files are located in the project structure
- What validation library is used (Zod, Joi, class-validator, etc.)
- Whether middleware patterns exist that new routes should follow

## Conventions

- Follow existing route file naming and structure patterns in the project
- Use consistent error response format across all routes
- Include input validation on all endpoints that accept data

## Constraints

- Inspect existing project patterns before creating new files
- Prefer minimal diffs over sweeping changes
- Reuse existing utilities and abstractions before adding new ones
- Do not invent files, directories, or patterns not established in the codebase
