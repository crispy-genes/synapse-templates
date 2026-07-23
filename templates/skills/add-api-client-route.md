---
name: add-api-client-route
description: Create typed API client functions for calling backend endpoints from frontend code using the project's HTTP client.
argument-hint: '[resource-name]'
tags: [api, frontend]
---

## Steps

1. Create or update the API client module for $ARGUMENTS (e.g. src/api/$ARGUMENTS.ts or src/lib/api/$ARGUMENTS.ts)
2. Define TypeScript types for request and response payloads
3. Implement client functions for each endpoint (get, list, create, update, delete)
4. Use the project's HTTP client (fetch, axios, ky, etc.) with proper base URL and headers
5. Add error handling and response type parsing
6. Export all client functions
7. Verify: run type check and confirm no errors

## Use this skill when

- The user needs frontend functions to call backend API endpoints
- The task involves creating typed HTTP client calls
- The user asks for an API client module for a resource

## Do not use this skill when

- The task is backend route creation (use add-api-route instead)
- The user needs React hooks wrapping the client (use add-crud-hooks instead)
- The task is about server-to-server API calls in the backend

## Assumptions to verify

- Which HTTP client the project uses (fetch, axios, ky, ofetch)
- Where API client modules live in the project structure
- Whether there is a shared base client instance or interceptors
- Request/response type conventions used across the project

## Conventions

- Keep API client functions pure — no UI state or side effects
- Use consistent naming: get$ARGUMENTS, list$ARGUMENTS, create$ARGUMENTS, etc.
- Type all request bodies and response shapes
- Handle HTTP errors consistently (throw or return Result types)

## Constraints

- Inspect existing project patterns before creating new files
- Prefer minimal diffs over sweeping changes
- Reuse existing utilities and abstractions before adding new ones
- Do not invent files, directories, or patterns not established in the codebase
