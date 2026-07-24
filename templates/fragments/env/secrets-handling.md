---
id: secrets-handling
description: Keeping secrets out of code, logs, and version control
kind: convention
---
- Never hardcode secrets, API keys, or passwords in source code, and never log them.
- Use placeholder values in `.env.example` (`your-api-key-here`) — real secrets stay out of version control entirely.
- Use different credentials per environment (development, staging, production) and rotate secrets regularly.
- Store production secrets in a secrets manager (AWS Secrets Manager, Vault, Doppler) or the platform's secret store — not in env files or repo config.
