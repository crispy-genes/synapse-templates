---
id: component-naming
description: Naming conventions for components, files, props, and handlers
kind: convention
---
- Components: `PascalCase` (`UserProfile`, `SettingsPanel`)
- Component files: follow the project's established convention (`PascalCase.tsx` or `kebab-case.tsx`) and stay consistent
- Props interfaces: `ComponentNameProps` (`UserProfileProps`)
- Hooks: `use` prefix (`useAuth`, `useDebounce`)
- Event handlers: `onAction` (`onClick`, `onSubmit`, `onChange`)
- Boolean props: `is`/`has` prefix (`isDisabled`, `hasError`)
