---
id: dependency-hygiene
description: Vetting, auditing, and pruning project dependencies
kind: convention
---
- Justify new dependencies — prefer built-in APIs and existing packages; check package health before adding (maintenance activity, download count, open issues, bundle size).
- Run audit checks (npm audit, pnpm audit) as part of CI and do not ignore critical or high severity vulnerabilities.
- Keep dependencies patched with regular, small incremental updates; commit lock files for reproducible builds.
- Remove unused dependencies — they increase attack surface and bundle size.
