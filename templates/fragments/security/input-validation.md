---
id: input-validation
description: Validating and neutralizing untrusted input at system boundaries
kind: convention
---
- Validate all untrusted input at system boundaries.
- Prefer allowlists and strict schemas over denylists.
- Escape untrusted data for its output context; sanitize only when allowing user-supplied HTML.
- Use parameterized queries — never interpolate user input into queries or commands.
- Validate uploaded files, paths, and user-supplied URLs.
