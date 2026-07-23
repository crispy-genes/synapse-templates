---
name: add-crud-hooks
description: Generate React data-fetching hooks (query + mutations) for CRUD operations on a resource using React Query, SWR, or similar.
argument-hint: '[resource-name]'
tags: [frontend, crud]
---

## Steps

1. Create a new hooks file at the appropriate path for $ARGUMENTS (e.g. src/hooks/use$ARGUMENTS.ts)
2. Implement a `useGet$ARGUMENTS` hook for fetching a single resource
3. Implement a `useList$ARGUMENTS` hook for fetching a collection with pagination/filters
4. Implement a `useCreate$ARGUMENTS` hook with optimistic updates and cache invalidation
5. Implement a `useUpdate$ARGUMENTS` hook with optimistic updates and cache invalidation
6. Implement a `useDelete$ARGUMENTS` hook with optimistic updates and cache invalidation
7. Export all hooks from the file
8. Verify: run type check and confirm no errors

## Use this skill when

- The user needs React hooks for fetching and mutating a resource
- The task involves wiring a frontend to a CRUD API
- The user asks for data-fetching hooks with cache management

## Do not use this skill when

- The task is backend-only with no frontend changes
- The project does not use React
- The user needs plain API client functions without hooks (use add-api-client-route instead)

## Assumptions to verify

- Which data-fetching library is used (React Query / TanStack Query, SWR, custom)
- What API client functions are used under the hooks
- Where hook files live and existing naming patterns
- How cache invalidation and optimistic updates are handled in the project

## Conventions

- Use the project's data fetching library (React Query, SWR, etc.)
- Follow the use[Action][Resource] naming pattern
- Invalidate related queries after mutations
- Return loading, error, and data states consistently

## Constraints

- Inspect existing project patterns before creating new files
- Prefer minimal diffs over sweeping changes
- Reuse existing utilities and abstractions before adding new ones
- Do not invent files, directories, or patterns not established in the codebase
