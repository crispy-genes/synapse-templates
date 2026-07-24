---
description: Guidelines for managing project dependencies
paths:
  - "**/package.json"
provides:
  - dependency-hygiene
---
## Adding Dependencies

![[dependency-hygiene]]

- Prefer packages with TypeScript types included or available via `@types`.
- Add to devDependencies if only used in build, test, or development tooling.

## Versioning

- Use exact versions or tight ranges to ensure reproducible builds.
- Review changelog and breaking changes before upgrading major versions.

## Security

- Verify package integrity — check that published packages match their source.

## Organization

- Keep dependencies sorted alphabetically in package.json.
- Do not duplicate packages across dependencies and devDependencies.
- Use workspace protocols in monorepos for internal package references.
- In pnpm monorepos, ALL package versions must be defined in `pnpm-workspace.yaml` catalogs. Individual `package.json` files use `catalog:` references — never hardcode versions.

## Removal

- Check for transitive usage before removing — some packages are used indirectly.
- After removing a package, verify the build and tests still pass.
- Clean up any configuration files left behind by removed packages.
