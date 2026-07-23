---
description: Security practices to follow when writing or modifying code
tags: [security]
---

## Input Validation
- Validate all external input at system boundaries (API handlers, CLI args, file reads)
- Use allowlists over denylists for input validation
- Sanitize user input before rendering in HTML to prevent XSS
- Validate and parameterize all database queries to prevent injection

## Authentication & Authorization
- Never store secrets, tokens, or passwords in source code or config files
- Use environment variables or a secrets manager for sensitive configuration
- Check authorization on every request — do not rely on client-side checks alone
- Use constant-time comparison for secret values to prevent timing attacks

## Data Handling
- Never log sensitive data (passwords, tokens, PII)
- Use HTTPS for all external communication
- Encrypt sensitive data at rest when stored in databases
- Set appropriate CORS headers — do not use wildcard origins in production

## Dependencies
- Keep dependencies up to date — review security advisories regularly
- Pin dependency versions to avoid supply-chain attacks via auto-updates
- Audit new dependencies before adding them — prefer well-maintained, widely-used packages
- Do not install packages with known critical vulnerabilities

## Error Handling
- Never expose stack traces or internal error details to end users
- Log errors with enough context for debugging but without sensitive data
- Use generic error messages for authentication failures (avoid revealing whether a user exists)
