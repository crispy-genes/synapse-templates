---
name: add-react-page
description: Scaffold a new React page component with routing, data fetching, and layout integration.
argument-hint: '[page-name]'
tags: [frontend, react]
---

## Steps

1. Create a new page component at src/pages/$ARGUMENTS.tsx (or the project's page directory)
2. Define the page component with proper TypeScript types
3. Add the route entry in the router configuration (React Router, TanStack Router, etc.)
4. Create any page-specific hooks or state management needed
5. Add basic layout structure using the project's UI components/design system
6. If the page needs data, set up data fetching (loader, useEffect, React Query, etc.)
7. Verify: run type check and confirm no errors

## Use this skill when

- The user asks to add a new page, view, or screen to the app
- The task requires a new route with a dedicated page component
- The user wants to scaffold a full page with routing and layout

## Do not use this skill when

- The task is adding a reusable component (use add-component instead)
- The task is backend-only with no frontend changes
- The user needs to modify an existing page rather than create a new one

## Assumptions to verify

- Which React router is in use (React Router, TanStack Router, Next.js file routing)
- Where page components live in the project structure
- What data fetching approach the project uses (loaders, React Query, SWR, useEffect)
- What layout or wrapper components exist for consistent page structure

## Conventions

- Follow the existing page component structure and naming conventions
- Use the project's layout/wrapper components for consistent page structure
- Keep page components focused — extract complex logic into hooks

## Constraints

- Inspect existing project patterns before creating new files
- Prefer minimal diffs over sweeping changes
- Reuse existing utilities and abstractions before adding new ones
- Do not invent files, directories, or patterns not established in the codebase
