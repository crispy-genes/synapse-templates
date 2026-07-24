---
id: request-validation
description: Validating request bodies, query params, and path params at the route boundary
kind: convention
---
- Validate request body, query params, and path params at the handler level.
- Use a schema validation library (Zod, Joi, etc.) for structured validation.
- Return 400 for validation errors with specific field-level messages.
- Parse and type-check path parameters before passing to services.
