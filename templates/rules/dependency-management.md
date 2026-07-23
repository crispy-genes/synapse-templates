---
description: Guidelines for managing project dependencies
paths:
  - "**/package.json"
tags: [dependencies]
---

## Adding Dependencies
- Justify new dependencies — prefer built-in APIs and existing packages when possible
- Check package health before adding: maintenance activity, download count, open issues, bundle size
- Prefer packages with TypeScript types included or available via @types
- Add to devDependencies if only used in build, test, or development tooling

## Versioning
- Use exact versions or tight ranges to ensure reproducible builds
- Commit lock files (package-lock.json, yarn.lock, pnpm-lock.yaml) to version control
- Review changelog and breaking changes before upgrading major versions
- Update dependencies regularly — small incremental updates are safer than large jumps

## Security
- Run audit checks (npm audit, pnpm audit) as part of CI
- Do not ignore critical or high severity vulnerabilities
- Remove unused dependencies — they increase attack surface and bundle size
- Verify package integrity — check that published packages match their source

## Organization
- Keep dependencies sorted alphabetically in package.json
- Do not duplicate packages across dependencies and devDependencies
- Use workspace protocols in monorepos for internal package references
- Document the purpose of non-obvious dependencies in comments or a DEPENDENCIES.md

## Removal
- Remove packages that are no longer imported anywhere in the codebase
- Check for transitive usage before removing — some packages are used indirectly
- After removing a package, verify the build and tests still pass
- Clean up any configuration files left behind by removed packages
