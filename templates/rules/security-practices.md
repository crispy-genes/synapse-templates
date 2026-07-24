---
description: Security practices to follow when writing or modifying code
provides:
  - input-validation
  - auth-essentials
uses:
  - secrets-handling
  - dependency-hygiene
  - api-error-responses
---
## Input Validation

![[input-validation]]

## Authentication & Authorization

![[auth-essentials]]

## Secrets

![[secrets-handling]]

## Session & Browser Security

- Use secure session handling and set cookies with `HttpOnly`, `Secure`, and appropriate `SameSite`.
- Protect browser-based authenticated actions against CSRF.
- Set security headers such as CSP, `X-Content-Type-Options`, and `frame-ancestors`.
- Configure CORS narrowly for authenticated browser APIs.

## Data Handling

- Use HTTPS/TLS for data in transit.
- Encrypt sensitive data at rest where appropriate.
- Protect backups and test recovery procedures.

## Dependencies & Supply Chain

![[dependency-hygiene]]

- Use dependency and secret scanning in CI.
- Do not knowingly ship unresolved critical/high-risk vulnerabilities without explicit review.

## Error Handling & Monitoring

![[api-error-responses]]

- Monitor for suspicious activity and alert on important security events.
