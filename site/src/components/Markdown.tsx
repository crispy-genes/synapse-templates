import { useEffect, useRef } from "react"
import { marked } from "marked"
import { linkifyEmbedTokens } from "../lib/linkify-embeds"

interface MarkdownProps {
  source: string
}

export function Markdown({ source }: MarkdownProps) {
  const ref = useRef<HTMLDivElement>(null)
  const html = marked.parse(source, { async: false })

  useEffect(() => {
    if (ref.current) linkifyEmbedTokens(ref.current)
  }, [html])

  return (
    <div
      ref={ref}
      className="prose prose-zinc max-w-none rounded-xl border border-zinc-200 bg-white px-6 py-5 text-[0.95rem] dark:prose-invert dark:border-zinc-800 dark:bg-zinc-900"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
