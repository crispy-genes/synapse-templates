---
id: middleware-conventions
description: Middleware scope, ordering, and registration conventions
kind: convention
---
- Apply authentication middleware at the router level, not per-handler.
- Use rate limiting on public endpoints and request logging middleware for observability.
- Keep middleware ordering consistent across all route files — auth before route handlers, error handler last.
- Each middleware does one thing well — avoid combining unrelated concerns.
- Always call `next()` or send a response — never leave the request hanging; async middleware must catch and forward errors.
