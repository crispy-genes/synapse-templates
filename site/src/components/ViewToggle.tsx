interface ViewToggleProps<T extends string> {
  views: readonly T[]
  activeView: T
  onSelect: (view: T) => void
}

export function ViewToggle<T extends string>({ views, activeView, onSelect }: ViewToggleProps<T>) {
  return (
    <div className="my-3 inline-flex overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
      {views.map((view) => (
        <button
          key={view}
          onClick={() => onSelect(view)}
          className={`px-4 py-1.5 text-sm ${
            view === activeView
              ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
              : "bg-white text-zinc-500 hover:text-zinc-800 dark:bg-zinc-900 dark:hover:text-zinc-200"
          }`}
        >
          {view}
        </button>
      ))}
    </div>
  )
}
