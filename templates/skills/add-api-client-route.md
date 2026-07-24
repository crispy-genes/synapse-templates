---
name: add-api-client-route
description: Create typed API client functions for calling backend endpoints from frontend code using the project's HTTP client. Use when the user needs frontend functions to call backend endpoints or a typed API client module for a resource. Do not use for backend route creation (use add-api-route), React hooks wrapping the client (use add-crud-hook), or server-to-server calls.
argument-hint: "[resource-name]"
uses:
  - existing-patterns-first
---
## Steps

1. Create or update the API client module for `$ARGUMENTS` (e.g. `src/api/$ARGUMENTS.ts` or `src/lib/api/$ARGUMENTS.ts`) — match where similar modules already live.
2. Define TypeScript types for request and response payloads.
3. Implement client functions for each endpoint (get, list, create, update, delete) with consistent naming: `get$ARGUMENTS`, `list$ARGUMENTS`, `create$ARGUMENTS`, etc.
4. Use the project's HTTP client (fetch, axios, ky, etc.) with proper base URL and headers — reuse the shared base client instance and interceptors if they exist.
5. Add error handling and response type parsing, handling HTTP errors the way the rest of the client layer does (throw or return Result types).
6. Export all client functions.
7. Run the project's type check and confirm no errors.

## Before you start

Inspect the codebase to confirm — do not assume:

- Which HTTP client the project uses (fetch, axios, ky, ofetch)
- Where API client modules live in the project structure
- Whether there is a shared base client instance or interceptors
- Request/response type conventions used across the project

## Conventions

Keep API client functions pure — no UI state or side effects — and type all request bodies and response shapes.

![[existing-patterns-first]]
