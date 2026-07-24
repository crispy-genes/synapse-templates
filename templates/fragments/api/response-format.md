---
id: response-format
description: Consistent response envelopes, status codes, and pagination metadata
kind: convention
---
- Use consistent response envelopes across all endpoints.
- Route every response through the centralized success and error helpers — all responses import from `**/statuses/success.ts` and `**/statuses/error.ts`.
- Return appropriate HTTP status codes: 200 OK, 201 Created, 204 No Content, 404 Not Found, 422 Unprocessable Entity.
- Include pagination metadata for list endpoints (total, page, limit).
- Use ISO 8601 for date fields in responses.
