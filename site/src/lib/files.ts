const cache = new Map<string, Promise<string>>()

export function fetchText(path: string): Promise<string> {
  if (!cache.has(path)) {
    cache.set(
      path,
      fetch(path).then((response) => {
        if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`)
        return response.text()
      })
    )
  }
  return cache.get(path)!
}
