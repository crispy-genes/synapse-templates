---
id: component-example
description: Canonical example of a well-formed component (naming, typed props, structure)
kind: convention
---
```tsx
interface UserProfileProps {
  userId: string
  isEditable?: boolean
}

export function UserProfile({ userId, isEditable = false }: UserProfileProps) {
  const { data, isLoading } = useUser(userId)
  if (isLoading) return <Spinner />

  return (
    <section className="flex flex-col gap-4 p-6">
      <h2>{data.name}</h2>
      {isEditable && <EditButton userId={userId} />}
    </section>
  )
}
```
