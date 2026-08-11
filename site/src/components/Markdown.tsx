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
      className="markdown-body rounded-[14px] border border-border bg-surface px-[34px] py-[30px]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
