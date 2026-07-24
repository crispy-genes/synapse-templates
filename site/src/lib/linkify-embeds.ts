import { EMBED_REGEX } from "./markdown"

export function linkifyEmbedTokens(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []
  while (walker.nextNode()) {
    const node = walker.currentNode as Text
    if (node.parentElement?.closest("code, pre, a")) continue
    textNodes.push(node)
  }

  for (const node of textNodes) {
    const text = node.textContent ?? ""
    const regex = new RegExp(EMBED_REGEX.source, "g")
    let match = regex.exec(text)
    if (!match) continue

    const replacement = document.createDocumentFragment()
    let last = 0
    while (match) {
      replacement.append(text.slice(last, match.index))
      const id = match[1].trim()
      const link = document.createElement("a")
      link.className =
        "rounded bg-indigo-50 px-1.5 py-0.5 font-mono text-[0.85em] text-indigo-700 no-underline dark:bg-indigo-950 dark:text-indigo-300"
      link.href = `#/fragment/${encodeURIComponent(id)}`
      link.textContent = `![[${id}]]`
      replacement.append(link)
      last = match.index + match[0].length
      match = regex.exec(text)
    }
    replacement.append(text.slice(last))
    node.replaceWith(replacement)
  }
}
