---
description: Patterns and conventions for UI component development
paths:
  - "**/components/**"
  - "**/*.tsx"
provides:
  - component-naming
  - component-sizing
  - component-props
  - component-example
---
## Structure

![[component-sizing]]

- Use Tailwind for styling by default; if the project uses `.css` files, co-locate them in the component folder.
- Separate container logic (data fetching, state) from presentation components.

## Props

![[component-props]]

## Naming

![[component-naming]]

## State Management

- Keep state as local as possible — lift only when shared.
- Use controlled components for form inputs.
- Avoid storing derived data in state — compute it during render, memoizing with `useMemo` when expensive.

## Accessibility

- Use semantic HTML elements (`<nav>`, `<main>`, `<button>`) over generic `<div>`/`<span>`.
- Ensure all interactive elements are keyboard-accessible.
- Maintain sufficient color contrast ratios.

## Performance

- Memoize expensive computations and callbacks (`useMemo`, `useCallback`) when they cause unnecessary re-renders.
- Avoid creating new objects or functions in render unless necessary.
- Lazy-load components that are not immediately visible, and keep component trees shallow.

## Example

![[component-example]]
