import type { MouseEvent } from "react"
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard"
import { CopyStatusIcon } from "./CopyStatusIcon"

interface CopyIconProps {
  command: string
}

export function CopyIcon({ command }: CopyIconProps) {
  const { isCopied, copy } = useCopyToClipboard()

  async function onClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    await copy(command)
  }

  return (
    <button
      onClick={onClick}
      aria-label={`Copy ${command}`}
      title={command}
      className={
        isCopied
          ? "shrink-0 text-success"
          : "shrink-0 text-icon-idle transition-colors group-hover:text-pink-hover hover:text-pink-ink!"
      }
    >
      <CopyStatusIcon isCopied={isCopied} />
    </button>
  )
}
