import { useState } from "react"

interface InstallCommandProps {
  command: string
}

export function InstallCommand({ command }: InstallCommandProps) {
  const [isCopied, setIsCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(command)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1200)
  }

  return (
    <div className="my-4 flex items-center gap-3 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-2.5 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800">
      <span>{command}</span>
      <button
        onClick={copy}
        className="ml-auto shrink-0 rounded-md border border-zinc-300 bg-white px-2.5 py-1 text-xs hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
      >
        {isCopied ? "Copied!" : "Copy"}
      </button>
    </div>
  )
}
