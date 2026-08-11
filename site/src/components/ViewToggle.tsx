interface ViewToggleProps<T extends string> {
  views: readonly T[]
  activeView: T
  onSelect: (view: T) => void
}

export function ViewToggle<T extends string>({ views, activeView, onSelect }: ViewToggleProps<T>) {
  return (
    <div className="inline-flex gap-0.5 rounded-lg bg-divider p-0.5">
      {views.map((view) => (
        <button
          key={view}
          onClick={() => onSelect(view)}
          className={`rounded-md px-3.5 py-1 text-[12.5px] transition-colors ${
            view === activeView
              ? "bg-surface font-medium text-ink shadow-[0_1px_2px_rgba(20,19,26,0.07),0_0_0_1px_rgba(20,19,26,0.04)]"
              : "text-ink-muted hover:text-ink"
          }`}
        >
          {view}
        </button>
      ))}
    </div>
  )
}
