---
description: Patterns and conventions for UI component development
paths:
  - "**/components/**"
  - "**/*.tsx"
tags: [frontend, react]
---

## Structure
- One component per file — name the file to match the component
- Co-locate styles, tests, and types with the component
- Keep components under 200 lines — extract sub-components when they grow
- Separate container logic (data fetching, state) from presentation components

## Props
- Define explicit prop types/interfaces — never use any
- Use destructuring in the function signature for clarity
- Provide sensible defaults for optional props
- Prefer composition (children, render props, slots) over deeply nested conditional props

## State Management
- Keep state as local as possible — lift only when shared
- Derive values from state instead of storing redundant state
- Use controlled components for form inputs
- Avoid storing derived data in state — compute it during render

## Naming
- Components: PascalCase (UserProfile, SettingsPanel)
- Props interfaces: ComponentNameProps (UserProfileProps)
- Event handlers: onAction (onClick, onSubmit, onChange)
- Boolean props: is/has prefix (isDisabled, hasError)

## Accessibility
- Use semantic HTML elements (button, nav, main, article) over generic divs
- Add aria labels to interactive elements that lack visible text
- Ensure keyboard navigation works for all interactive components
- Maintain sufficient color contrast ratios

## Performance
- Memoize expensive computations and callbacks when they cause unnecessary re-renders
- Avoid creating new objects or functions in render unless necessary
- Use lazy loading for components that are not immediately visible
- Keep component trees shallow to minimize re-render cascades
