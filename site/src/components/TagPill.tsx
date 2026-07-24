interface TagPillProps {
  tag: string
}

export function TagPill({ tag }: TagPillProps) {
  return (
    <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
      {tag}
    </span>
  )
}
