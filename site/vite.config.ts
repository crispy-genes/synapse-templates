import { cpSync, createReadStream, existsSync, statSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Connect, type Plugin } from "vite"

const repoRoot = fileURLToPath(new URL("..", import.meta.url))

const REGISTRY_DIRS = ["v1", "templates"] as const

const serveRegistryData: Connect.NextHandleFunction = (req, res, next) => {
  const url = decodeURIComponent((req.url ?? "").split("?")[0])
  if (!url.startsWith("/v1/") && !url.startsWith("/templates/")) return next()

  const filePath = path.normalize(path.join(repoRoot, url))
  if (!filePath.startsWith(repoRoot) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    return next()
  }
  res.setHeader(
    "Content-Type",
    url.endsWith(".json") ? "application/json" : "text/markdown; charset=utf-8"
  )
  createReadStream(filePath).pipe(res)
}

function registryData(): Plugin {
  let outDir = ""
  return {
    name: "registry-data",
    configResolved(config) {
      const isBuild = config.command === "build" && config.mode !== "test"
      outDir = isBuild ? path.resolve(config.root, config.build.outDir) : ""
    },
    configureServer(server) {
      server.middlewares.use(serveRegistryData)
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveRegistryData)
    },
    closeBundle() {
      if (!outDir) return
      for (const dir of REGISTRY_DIRS) {
        cpSync(path.join(repoRoot, dir), path.join(outDir, dir), { recursive: true })
      }
    },
  }
}

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), registryData()],
})
