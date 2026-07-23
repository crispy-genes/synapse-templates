---
description: Conventions for API route handlers and endpoint design
paths:
  - "**/routes/**"
  - "**/api/**"
tags: [api, backend]
---

## Route Design
- Use RESTful resource naming: plural nouns for collections (e.g., /users, /posts)
- Use HTTP methods correctly: GET for reads, POST for creates, PUT/PATCH for updates, DELETE for deletes
- Nest sub-resources under their parent: /users/:id/posts
- Keep route handlers thin — delegate business logic to service functions

## Request Handling
- Validate request body, query params, and path params at the handler level
- Use a schema validation library (Zod, Joi, etc.) for structured validation
- Return 400 for validation errors with specific field-level messages
- Parse and type-check path parameters before passing to services

## Response Format
- Use consistent response envelopes across all endpoints
- Return appropriate HTTP status codes: 200 OK, 201 Created, 204 No Content, 404 Not Found, 422 Unprocessable Entity
- Include pagination metadata for list endpoints (total, page, limit)
- Use ISO 8601 for date fields in responses

## Error Handling
- Return structured error responses with a code, message, and optional details field
- Map domain errors to HTTP status codes in a centralized error handler
- Never expose internal error messages or stack traces in production responses
- Log the full error server-side while returning a safe message to the client

## Middleware
- Apply authentication middleware at the router level, not per-handler
- Use rate limiting on public endpoints
- Add request logging middleware for observability
- Keep middleware ordering consistent across all route files
