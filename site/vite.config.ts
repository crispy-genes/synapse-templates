import { createReadStream, existsSync, statSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Connect, type Plugin } from "vite"

const repoRoot = fileURLToPath(new URL("..", import.meta.url))

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
  return {
    name: "registry-data",
    configureServer(server) {
      server.middlewares.use(serveRegistryData)
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveRegistryData)
    },
  }
}

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), registryData()],
})
