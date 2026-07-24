export const EMBED_REGEX = /!\[\[([^\]|#\n]+)(?:#[^\]|\n]+)?(?:\|[^\]\n]+)?\]\]/g
const CODE_REGION_REGEX = /(```[\s\S]*?```|`[^`\n]*`)/g

export function extractBody(content: string): string {
  if (content.startsWith("---")) {
    const end = content.indexOf("\n---", 3)
    if (end !== -1) return content.slice(end + 4).replace(/^\s+/, "")
  }
  return content
}

export function mapOutsideCode(content: string, transform: (text: string) => string): string {
  return content
    .split(CODE_REGION_REGEX)
    .map((part, index) => (index % 2 === 1 ? part : transform(part)))
    .join("")
}
