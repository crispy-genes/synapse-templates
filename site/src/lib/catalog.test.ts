import { describe, expect, it } from "vitest"
import type { CatalogKind } from "../types/kind"
import type { Manifest } from "../types/manifest"
import {
  buildCatalogItems,
  hookBinding,
  installCommand,
  isInstallable,
  itemRoute,
  packComposition,
  packsContaining,
} from "./catalog"

const hook = {
  name: "docs-drift",
  type: "hook" as const,
  description: "Flags docs drift",
  tags: ["docs"],
  path: "templates/hooks/docs-drift.md",
  sha256: "a".repeat(64),
  event: "Stop",
  async: true,
  timeout: 60,
}

const manifest: Manifest = {
  schemaVersion: 1,
  templates: [
    hook,
    {
      name: "backend",
      type: "agent",
      description: "Backend agent",
      tags: [],
      path: "templates/agents/backend.md",
      sha256: "b".repeat(64),
    },
  ],
  fragments: [],
  packs: [
    {
      name: "docs-maintenance",
      description: "Docs pack",
      tags: ["docs"],
      path: "templates/packs/docs-maintenance.md",
      sha256: "c".repeat(64),
      agents: [],
      skills: [],
      rules: [],
      hooks: ["docs-drift"],
    },
    {
      name: "express",
      description: "Express pack",
      tags: [],
      path: "templates/packs/express.md",
      sha256: "d".repeat(64),
      agents: ["backend"],
      skills: [],
      rules: [],
      hooks: [],
    },
  ],
}

describe("hooks in the catalog", () => {
  it("lists hook templates as catalog items routed under /hooks", () => {
    const item = buildCatalogItems(manifest).find((i) => i.kind === "hook")
    expect(item).toMatchObject({ name: "docs-drift", route: "/hooks/docs-drift", tags: ["docs"] })
    expect(itemRoute("hook", "docs-drift")).toBe("/hooks/docs-drift")
  })

  it("finds the packs shipping a hook", () => {
    expect(packsContaining(manifest, "hook", "docs-drift").map((p) => p.name)).toEqual([
      "docs-maintenance",
    ])
  })

  it("renders the binding for hooks and nothing for other types", () => {
    expect(hookBinding(hook)).toEqual([
      ["event", "Stop"],
      ["async", "yes"],
      ["timeout", "60s"],
    ])
    expect(hookBinding({ ...hook, matcher: "Write|Edit", async: undefined, timeout: undefined })).toEqual([
      ["event", "Stop"],
      ["matcher", "Write|Edit"],
      ["async", "no"],
      ["timeout", "60s"],
    ])
    expect(hookBinding(manifest.templates[1])).toEqual([])
  })

  it("counts hooks in pack composition", () => {
    expect(packComposition(manifest.packs[0])).toBe("1 hook")
  })
})

describe("installCommand", () => {
  // These must stay in lockstep with the CLI's subcommands — the strings below
  // are what a visitor copies off a catalog page. See the matching contract
  // test in synapse-cli: tests/commands/install-contract.test.ts.
  it.each([
    ["pack", "express", "synapse packs add --name express"],
    ["agent", "backend", "synapse agents add --name backend"],
    ["skill", "add-api-client-route", "synapse skills add --name add-api-client-route"],
    ["rule", "code-style", "synapse rules add --name code-style"],
  ] as const)("builds the %s install command", (kind, name, expected) => {
    expect(installCommand(kind, name)).toBe(expected)
  })
})

describe("isInstallable", () => {
  it("covers the kinds the CLI can install by name", () => {
    const kinds: CatalogKind[] = ["pack", "agent", "skill", "rule"]
    expect(kinds.every(isInstallable)).toBe(true)
  })

  it("excludes hooks and fragments, which have no `add` subcommand", () => {
    expect(isInstallable("hook")).toBe(false)
    expect(isInstallable("fragment")).toBe(false)
  })
})
