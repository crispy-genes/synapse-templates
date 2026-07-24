---
id: error-logging
description: Structured, level-appropriate logging without sensitive data
kind: convention
---
- Use structured logs with relevant IDs and stack traces where appropriate.
- Include correlation/request IDs.
- Use log levels consistently: error for failures, info for key events, debug for details.
- Never log secrets, tokens, or unnecessary sensitive data; redact where needed.
- Avoid duplicate logging across layers.
