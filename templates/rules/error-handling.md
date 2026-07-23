---
description: Error handling patterns and practices for the codebase
tags: [reliability]
---

## General Principles
- Handle errors at the appropriate level — catch where you can meaningfully recover or report
- Do not silently swallow errors — at minimum, log them
- Prefer specific error types over generic Error when the caller needs to distinguish failure modes
- Use try/catch for synchronous code and .catch() or try/catch with await for async code

## Error Types
- Define custom error classes for domain-specific failures (e.g., NotFoundError, ValidationError)
- Include a machine-readable code and a human-readable message in custom errors
- Attach relevant context (entity ID, field name) to errors for debugging
- Do not use string-based error detection (checking error.message) — use error types or codes

## Async Error Handling
- Always handle promise rejections — never leave promises unhandled
- Use try/catch around await calls in async functions
- For parallel operations (Promise.all), handle partial failures gracefully
- Set up a global unhandled rejection handler as a safety net, not a primary strategy

## Logging
- Log errors with structured context: timestamp, error code, relevant IDs, stack trace
- Use appropriate log levels: error for failures, warn for degraded states, info for recovery
- Do not log sensitive data in error messages (passwords, tokens, PII)
- Include correlation IDs in error logs for request tracing

## Recovery
- Implement retries with exponential backoff for transient failures (network, rate limits)
- Set timeouts on external calls to prevent hanging
- Provide fallback behavior when non-critical services fail
- Fail fast for unrecoverable errors — do not retry what cannot succeed
