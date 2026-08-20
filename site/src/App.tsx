import { useState } from "react"
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <HashRouter>
      <ScrollReset />
      <SiteHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />
      <ManifestProvider>
        <div className="flex items-start">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <main className="min-w-0 flex-1">
            <div className="mx-auto max-w-[1120px] px-5 pb-16 pt-7 sm:px-8 md:pb-[90px] md:pt-[34px] lg:px-11">
              <Routes>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/packs/:name" element={<PackPage />} />
                <Route path="/agents/:name" element={<TemplatePage type="agent" />} />
                <Route path="/skills/:name" element={<TemplatePage type="skill" />} />
                <Route path="/rules/:name" element={<TemplatePage type="rule" />} />
                <Route path="/hooks/:name" element={<TemplatePage type="hook" />} />
                <Route path="/fragments/:id" element={<FragmentPage />} />
                <Route path="/pack/:name" element={<LegacyRedirect segment="packs" />} />
                <Route path="/agent/:name" element={<LegacyRedirect segment="agents" />} />
                <Route path="/skill/:name" element={<LegacyRedirect segment="skills" />} />
                <Route path="/rule/:name" element={<LegacyRedirect segment="rules" />} />
                <Route path="/hook/:name" element={<LegacyRedirect segment="hooks" />} />
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
