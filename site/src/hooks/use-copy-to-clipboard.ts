import { useCallback, useEffect, useRef, useState } from "react"

const CONFIRM_MS = 1400

interface CopyToClipboard {
  isCopied: boolean
  copy: (text: string) => Promise<void>
}

export function useCopyToClipboard(): CopyToClipboard {
  const [isCopied, setIsCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setIsCopied(false), CONFIRM_MS)
  }, [])

  return { isCopied, copy }
}
