---
id: api-error-responses
description: Structured, safe error responses at API boundaries
kind: convention
---
- Return structured error responses with a code, message, and optional details field.
- Map domain errors to HTTP status codes in a centralized error handler.
- Never expose internal error messages or stack traces in production responses.
- Log the full error server-side while returning a safe message to the client.
