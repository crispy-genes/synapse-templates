import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard"
import { CopyStatusIcon } from "./CopyStatusIcon"

interface InstallCommandProps {
  command: string
}

export function InstallCommand({ command }: InstallCommandProps) {
  const { isCopied, copy } = useCopyToClipboard()

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface-code py-3.5 pl-5 pr-3.5">
      <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-[13.5px] text-ink">
        <span className="text-pink">$</span> {command}
      </code>
      <button
        onClick={() => copy(command)}
        aria-label={`Copy ${command}`}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-surface transition-colors ${
          isCopied
            ? "border-success/40 text-success"
            : "border-border-strong text-ink-muted hover:border-pink-border hover:bg-pink-wash hover:text-pink-ink"
        }`}
      >
        <CopyStatusIcon isCopied={isCopied} />
      </button>
    </div>
  )
}
