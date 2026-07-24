---
id: retry-backoff
description: Retry, timeout, and backoff policy for external calls
kind: convention
---
- Retry only transient, idempotent operations.
- Use bounded exponential backoff with jitter.
- Set timeouts on external calls.
- Provide fallbacks only when degraded behavior is acceptable; fail fast on unrecoverable errors.
