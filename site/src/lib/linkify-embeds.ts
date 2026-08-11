import { EMBED_REGEX } from "./markdown"

const CHIP_CLASSES =
  "inline-flex items-baseline gap-1.5 rounded-md border border-dashed border-pink-border " +
  "bg-pink-tint px-1.5 py-0.5 align-baseline font-mono text-[0.85em] text-pink-ink! no-underline"

const LABEL_CLASSES = "font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-pink-ink/60"

function buildEmbedChip(id: string): HTMLAnchorElement {
  const link = document.createElement("a")
  link.className = CHIP_CLASSES
  link.href = `#/fragments/${encodeURIComponent(id)}`

  const token = document.createElement("span")
  token.textContent = `![[${id}]]`

  const label = document.createElement("span")
  label.className = LABEL_CLASSES
  label.textContent = "fragment"

  link.append(token, label)
  return link
}

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
      replacement.append(buildEmbedChip(match[1].trim()))
      last = match.index + match[0].length
      match = regex.exec(text)
    }
    replacement.append(text.slice(last))
    node.replaceWith(replacement)
  }
}
