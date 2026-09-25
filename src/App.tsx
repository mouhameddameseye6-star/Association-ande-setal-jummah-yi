import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PhotoProvider } from './context/PhotoContext';

// Official Active Pages
import { HomePage } from './pages/HomePage';
import { AssociationPage } from './pages/AssociationPage';
import { ActionsPage } from './pages/ActionsPage';
import { HistoirePage } from './pages/HistoirePage';
import { ImpactPage } from './pages/ImpactPage';
import { SectionsPage } from './pages/SectionsPage';
import { RamadanPage } from './pages/RamadanPage';
import { ChartesPage } from './pages/ChartesPage';
import { RejoindrePage } from './pages/RejoindrePage';
import { SoutenirPage } from './pages/SoutenirPage';
import { OperationsPage } from './pages/OperationsPage';
import { ActualitesPage } from './pages/ActualitesPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

// Clean Page Component Mapping (Strictly active pages, no obsolete routes)
const PAGE_COMPONENTS: Record<PageId, React.ComponentType<{ onNavigate: (page: PageId) => void }>> = {
  accueil: HomePage,
  association: AssociationPage,
  actions: ActionsPage,
  histoire: HistoirePage,
  impact: ImpactPage,
  sections: SectionsPage,
  ramadan: RamadanPage,
  chartes: ChartesPage,
  rejoindre: RejoindrePage,
  soutenir: SoutenirPage,
  operations: OperationsPage,
  actualites: ActualitesPage,
  contact: ContactPage,
  admin: AdminPage
};

const VALID_PAGES = Object.keys(PAGE_COMPONENTS) as PageId[];

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'accueil';

  const path = window.location.pathname.replace(/^\//, '').toLowerCase();
  if (path === 'admin') return 'admin';

  const hash = window.location.hash.replace('#', '') as PageId;
  if (VALID_PAGES.includes(hash)) return hash;

  return 'accueil';
}

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);

  // Sync hash routing and browser back/forward buttons
  useEffect(() => {
    const handleNavigationSync = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (path === 'admin') {
        setCurrentPage('admin');
        return;
      }

      const hash = window.location.hash.replace('#', '') as PageId;
      if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleNavigationSync);
    window.addEventListener('popstate', handleNavigationSync);
    return () => {
      window.removeEventListener('hashchange', handleNavigationSync);
      window.removeEventListener('popstate', handleNavigationSync);
    };
  }, []);

  const handleNavigate = (page: PageId) => {
    if (page === currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'admin') {
      window.location.hash = 'admin';
      try {
        window.history.pushState(null, '', '/admin');
      } catch (_) {
        // Fallback for sandboxed iframe environments
      }
    } else {
      window.location.hash = page;
      try {
        window.history.pushState(null, '', `/#${page}`);
      } catch (_) {
        // Fallback
      }
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the current active component cleanly without any switch/case boilerplate
  const ActivePageComponent = PAGE_COMPONENTS[currentPage] || HomePage;

  return (
    <PhotoProvider>
      <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#07130c] text-[#19241C] dark:text-[#EAECE9] flex flex-col selection:bg-[#0D3823] dark:selection:bg-[#D4AF37] selection:text-[#FAF9F5] dark:selection:text-[#07130c] font-sans antialiased transition-colors duration-200">
        {/* Main Navbar */}
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

        {/* Dynamic Page Container */}
        <main className="flex-1 overflow-hidden" id="main-content-router">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.22,
                ease: [0.25, 1, 0.5, 1]
              }}
              className="w-full"
            >
              <ActivePageComponent onNavigate={handleNavigate} />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Multi-Page Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </PhotoProvider>
  );
}

export default App;
