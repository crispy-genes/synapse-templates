import { describe, expect, it } from "vitest"
import type { FragmentEntry } from "../types/fragment"
import { extractBody, mapOutsideCode } from "./markdown"
import { closureIds, inlineEmbeds } from "./resolve"

const fragments: FragmentEntry[] = [
  { id: "a", description: "", path: "f/a.md", sha256: "x", usesFragments: ["b"] },
  { id: "b", description: "", path: "f/b.md", sha256: "y" },
]

describe("closureIds", () => {
  it("includes transitive dependencies", () => {
    expect(closureIds(["a"], fragments)).toEqual(["a", "b"])
  })

  it("ignores unknown ids and terminates on cycles", () => {
    const cyclic: FragmentEntry[] = [
      { id: "a", description: "", path: "a", sha256: "x", usesFragments: ["b", "missing"] },
      { id: "b", description: "", path: "b", sha256: "y", usesFragments: ["a"] },
    ]
    expect(closureIds(["a"], cyclic)).toEqual(["a", "b", "missing"])
  })
})

describe("inlineEmbeds", () => {
  const bodies = new Map([
    ["a", "A body\n\n![[b]]"],
    ["b", "B body"],
  ])

  it("inlines nested fragments recursively", () => {
    const result = inlineEmbeds("Intro\n\n![[a]]", bodies)
    expect(result).toContain("A body")
    expect(result).toContain("B body")
    expect(result).not.toContain("![[")
  })

  it("leaves unknown embeds untouched", () => {
    expect(inlineEmbeds("![[missing]]", bodies)).toBe("![[missing]]")
  })

  it("does not touch embeds inside code regions", () => {
    const source = "```\n![[a]]\n```\nand `![[a]]` inline"
    expect(inlineEmbeds(source, bodies)).toBe(source)
  })
})

describe("extractBody", () => {
  it("strips frontmatter", () => {
    expect(extractBody("---\nid: x\n---\n\nBody")).toBe("Body")
  })

  it("returns content without frontmatter as-is", () => {
    expect(extractBody("Body only")).toBe("Body only")
  })
})

describe("mapOutsideCode", () => {
  it("transforms only outside code fences and spans", () => {
    const result = mapOutsideCode("plain `code` and\n```\nfence\n```\nplain", (t) => t.toUpperCase())
    expect(result).toBe("PLAIN `code` AND\n```\nfence\n```\nPLAIN")
  })
})
