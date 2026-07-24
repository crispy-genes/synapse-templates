---
id: phase-requirements
description: What every phase in a plan must satisfy
kind: convention
---
- Each phase must be independently deployable — no broken intermediate states.
- Each phase produces a single, reviewable PR (target: 200-400 lines) and includes its own tests.
- Phases build on previous phases without requiring future ones; prefer sequential phases — use parallel only when phases are truly independent.
- Order phases within a feature: data model/schema first, backend logic second, API surface third, frontend/UI last — tests accompany each phase, never a separate phase.
