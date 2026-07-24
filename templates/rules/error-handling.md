---
description: Error handling patterns and practices for the codebase
provides:
  - error-logging
  - retry-backoff
uses:
  - api-error-responses
---
## Principles

- Catch errors where you can meaningfully recover, translate, clean up, or report them.
- Do not silently ignore unexpected errors.
- Prefer specific error types or codes when callers need to distinguish failure modes.
- Distinguish operational failures from programmer bugs.
- At application boundaries, map internal errors to stable user/API-facing responses:

![[api-error-responses]]

## Error Types

- Use custom error classes or structured error objects for recurring domain failures.
- Include a machine-readable code and human-readable message.
- Attach small, relevant, non-sensitive context.
- Do not use `error.message` for control flow.
- Preserve the original cause when rethrowing.

## Async

- Always observe promise rejections.
- Use `try/catch` around `await` when you need recovery, translation, cleanup, or added context.
- Be explicit about fail-fast vs partial-failure behavior in parallel work.
- Use `finally` for cleanup.
- Treat global unhandled rejection/exception handlers as safety nets only.

## Logging

![[error-logging]]

## Recovery

![[retry-backoff]]
