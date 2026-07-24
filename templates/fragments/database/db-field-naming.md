---
id: db-field-naming
description: Field and column naming conventions for database schemas
kind: convention
---
- Use camelCase for field names in document databases, snake_case for column names in SQL databases.
- Boolean fields: prefix with `is`, `has`, `can` (`isActive`, `hasVerified`).
- Date fields: suffix with `At` (`createdAt`, `deletedAt`, `expiresAt`).
