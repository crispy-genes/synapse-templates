---
id: schema-design
description: Schema shape — naming, timestamps, indexes, and relationships
kind: convention
---
- Use singular names for models/collections (`User`, not `Users`).
- Include timestamps (`createdAt`, `updatedAt`) on all documents/rows.
- Define indexes for fields used in queries, filters, and unique constraints.
- Use references/foreign keys for related data — avoid deep nesting.
