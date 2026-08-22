---
name: add-crud-hook
description: Generate React data-fetching hooks (query + mutations) for CRUD operations on a resource using React Query, SWR, or similar. Use when the user needs React hooks for fetching and mutating a resource or is wiring a frontend to a CRUD API. Do not use for backend-only work, non-React projects, or plain API client functions without hooks (use add-api-client-route).
argument-hint: "[resource-name]"
uses:
  - existing-patterns-first
---
## Steps

1. Create a new hooks file at the appropriate path for `$ARGUMENTS` (e.g. `src/hooks/use$ARGUMENTS.ts`), matching existing hook naming patterns.
2. Implement `useGet$ARGUMENTS` for fetching a single resource and `useList$ARGUMENTS` for fetching a collection with pagination/filters.
3. Implement `useCreate$ARGUMENTS`, `useUpdate$ARGUMENTS`, and `useDelete$ARGUMENTS` mutations with optimistic updates and cache invalidation.
4. Build the hooks on the project's existing API client functions — do not fetch inline.
5. Export all hooks from the file.
6. Run the project's type check and confirm no errors.

## Assumptions to verify

Inspect the codebase to confirm — do not assume:

- Which data-fetching library is used (React Query / TanStack Query, SWR, custom)
- What API client functions are used under the hooks
- Where hook files live and existing naming patterns
- How cache invalidation and optimistic updates are handled in the project

## Conventions

- Follow the `use[Action][Resource]` naming pattern.
- Invalidate related queries after mutations.
- Return loading, error, and data states consistently.

![[existing-patterns-first]]
