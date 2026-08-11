import { HashRouter, Route, Routes } from "react-router-dom"
import { LegacyRedirect } from "./components/LegacyRedirect"
import { ManifestProvider } from "./components/ManifestProvider"
import { NotFound } from "./components/NotFound"
import { ScrollReset } from "./components/ScrollReset"
import { Sidebar } from "./components/Sidebar"
import { SiteHeader } from "./components/SiteHeader"
import { CatalogPage } from "./pages/CatalogPage"
import { FragmentPage } from "./pages/FragmentPage"
import { PackPage } from "./pages/PackPage"
import { TemplatePage } from "./pages/TemplatePage"

export function App() {
  return (
    <HashRouter>
      <ScrollReset />
      <SiteHeader />
      <ManifestProvider>
        <div className="flex items-start">
          <Sidebar />
          <main className="min-w-0 flex-1">
            <div className="mx-auto max-w-[1120px] px-11 pb-[90px] pt-[34px]">
              <Routes>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/packs/:name" element={<PackPage />} />
                <Route path="/agents/:name" element={<TemplatePage type="agent" />} />
                <Route path="/skills/:name" element={<TemplatePage type="skill" />} />
                <Route path="/rules/:name" element={<TemplatePage type="rule" />} />
                <Route path="/fragments/:id" element={<FragmentPage />} />
                <Route path="/pack/:name" element={<LegacyRedirect segment="packs" />} />
                <Route path="/agent/:name" element={<LegacyRedirect segment="agents" />} />
                <Route path="/skill/:name" element={<LegacyRedirect segment="skills" />} />
                <Route path="/rule/:name" element={<LegacyRedirect segment="rules" />} />
                <Route path="/fragment/:name" element={<LegacyRedirect segment="fragments" />} />
                <Route path="*" element={<NotFound what="this page" />} />
              </Routes>
            </div>
          </main>
        </div>
      </ManifestProvider>
    </HashRouter>
  )
}
