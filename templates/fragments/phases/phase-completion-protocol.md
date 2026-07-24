---
id: phase-completion-protocol
description: The stop-and-confirm protocol after finishing a phase's implementation
kind: convention
---
- When a phase's implementation is done, STOP coding and show the user a summary of what was built.
- WAIT for the user to explicitly confirm the phase is complete before doing anything else.
- Only after confirmation: fill in "What was done" and "Context for next phase" in the plan file, update the phase status and `PHASES.md`, then commit and push.
- Do NOT switch branches or start the next phase — the session ends here; the next phase starts in a new session.
