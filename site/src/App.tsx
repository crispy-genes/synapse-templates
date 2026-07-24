import { HashRouter, Route, Routes } from "react-router-dom"
import { ManifestProvider } from "./components/ManifestProvider"
import { SiteHeader } from "./components/SiteHeader"
import { NotFound } from "./components/NotFound"
import { CatalogPage } from "./pages/CatalogPage"
import { FragmentPage } from "./pages/FragmentPage"
import { PackPage } from "./pages/PackPage"
import { TemplatePage } from "./pages/TemplatePage"

export function App() {
  return (
    <HashRouter>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-6">
        <ManifestProvider>
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/agent/:name" element={<TemplatePage type="agent" />} />
            <Route path="/rule/:name" element={<TemplatePage type="rule" />} />
            <Route path="/skill/:name" element={<TemplatePage type="skill" />} />
            <Route path="/fragment/:id" element={<FragmentPage />} />
            <Route path="/pack/:name" element={<PackPage />} />
            <Route path="*" element={<NotFound what="this page" />} />
          </Routes>
        </ManifestProvider>
      </main>
      <footer className="mx-auto max-w-5xl border-t border-zinc-200 px-6 py-6 text-sm text-zinc-400 dark:border-zinc-800">
        Template registry for the synapse CLI
      </footer>
    </HashRouter>
  )
}
