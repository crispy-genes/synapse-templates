interface TagFilterProps {
  tags: string[]
  activeTags: Set<string>
  onToggle: (tag: string) => void
}

export function TagFilter({ tags, activeTags, onToggle }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onToggle(tag)}
          className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
            activeTags.has(tag)
              ? "border-indigo-400 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950 dark:text-indigo-300"
              : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
