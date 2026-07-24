---
id: auth-essentials
description: Non-negotiables for authentication and authorization flows
kind: convention
---
- Hash passwords with Argon2id, bcrypt, or scrypt — never store plain text.
- Enforce authorization server-side on every sensitive action; apply least privilege to users, services, and infrastructure.
- Use constant-time comparison for security-sensitive secret comparisons.
- Protect login and auth flows with rate limiting and monitoring; use generic auth failure messages where enumeration is a risk.
- Set appropriate expiration times for tokens and sessions.
