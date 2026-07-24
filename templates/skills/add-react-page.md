---
name: add-react-page
description: Scaffold a new React page component with routing, data fetching, and layout integration. Use when the user asks to add a new page, view, or screen with a dedicated route. Do not use for reusable components (use add-component), backend-only work, or modifying an existing page.
argument-hint: "[page-name]"
uses:
  - existing-patterns-first
---
## Steps

1. Create a new page component at `src/pages/$ARGUMENTS.tsx` (or the project's page directory), following existing page structure and naming.
2. Define the page component with proper TypeScript types.
3. Add the route entry in the router configuration (React Router, TanStack Router, etc.).
4. Create any page-specific hooks or state management needed — keep the page thin and extract complex logic into hooks.
5. Add basic layout structure using the project's layout/wrapper components for consistent page structure.
6. If the page needs data, set up data fetching with the project's established approach (loader, React Query, useEffect, etc.).
7. Run the project's type check and confirm no errors.

## Before you start

Inspect the codebase to confirm — do not assume:

- Which React router is in use (React Router, TanStack Router, Next.js file routing)
- Where page components live in the project structure
- What data fetching approach the project uses (loaders, React Query, SWR, useEffect)
- What layout or wrapper components exist for consistent page structure

## Conventions

The conventions this skill applies directly:

![[existing-patterns-first]]
