---
id: rest-route-design
description: RESTful route naming, HTTP method usage, and thin handlers
kind: convention
---
- Use RESTful resource naming: plural nouns for collections (`/users`, `/posts`).
- Use HTTP methods correctly: GET for reads, POST for creates, PUT/PATCH for updates, DELETE for deletes.
- Nest sub-resources under their parent: `/users/:id/posts`.
- Keep route handlers thin — delegate business logic to service functions.
