import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OFFICIAL_CONTACT } from './data/content';

// Pages
import { HomePage } from './pages/HomePage';
import { AssociationPage } from './pages/AssociationPage';
import { ActionsPage } from './pages/ActionsPage';
import { HistoirePage } from './pages/HistoirePage';
import { ImpactPage } from './pages/ImpactPage';
import { RealisationsPage } from './pages/RealisationsPage';
import { SectionsPage } from './pages/SectionsPage';
import { RamadanPage } from './pages/RamadanPage';
import { ChartesPage } from './pages/ChartesPage';
import { RejoindrePage } from './pages/RejoindrePage';
import { SoutenirPage } from './pages/SoutenirPage';
import { OperationsPage } from './pages/OperationsPage';
import { ActualitesPage } from './pages/ActualitesPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('accueil');

  // Sync hash routing if user opens with URL hash or clicks browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'accueil',
        'association',
        'actions',
        'histoire',
        'impact',
        'realisations',
        'sections',
        'ramadan',
        'chartes',
        'rejoindre',
        'soutenir',
        'operations',
        'actualites',
        'contact'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    if (page === currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'accueil':
        return <HomePage onNavigate={handleNavigate} />;
      case 'association':
        return <AssociationPage onNavigate={handleNavigate} />;
      case 'actions':
        return <ActionsPage onNavigate={handleNavigate} />;
      case 'histoire':
        return <HistoirePage onNavigate={handleNavigate} />;
      case 'impact':
        return <ImpactPage onNavigate={handleNavigate} />;
      case 'realisations':
        return <RealisationsPage onNavigate={handleNavigate} />;
      case 'sections':
        return <SectionsPage onNavigate={handleNavigate} />;
      case 'ramadan':
        return <RamadanPage onNavigate={handleNavigate} />;
      case 'chartes':
        return <ChartesPage onNavigate={handleNavigate} />;
      case 'rejoindre':
        return <RejoindrePage onNavigate={handleNavigate} />;
      case 'soutenir':
        return <SoutenirPage onNavigate={handleNavigate} />;
      case 'operations':
        return <OperationsPage onNavigate={handleNavigate} />;
      case 'actualites':
        return <ActualitesPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#19241C] flex flex-col selection:bg-[#0D3823] selection:text-[#FAF9F5] font-sans antialiased">
      {/* Top Banner / Announcement */}
      <div className="bg-[#0A291A] text-emerald-100 text-[11px] sm:text-xs py-1.5 px-4 text-center border-b border-[#D4AF37]/30 flex flex-wrap items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping shrink-0" />
        <span>Association Andeu Setal Jummah Yi (ASJY) — « Jeff té YALLA rek takh »</span>
        <span className="hidden sm:inline text-emerald-400">•</span>
        <span className="text-gray-300">Contact & Dons (Wave / OM) :</span>
        <div className="inline-flex items-center gap-1.5 font-mono font-bold text-[#D4AF37]">
          <a
            href={`tel:${OFFICIAL_CONTACT.phone1Raw}`}
            className="hover:underline"
            title="Appeler le 77 757 87 89"
          >
            {OFFICIAL_CONTACT.phone1}
          </a>
          <span className="text-emerald-400 font-sans">/</span>
          <a
            href={`tel:${OFFICIAL_CONTACT.phone2Raw}`}
            className="hover:underline"
            title="Appeler le 76 440 14 41"
          >
            {OFFICIAL_CONTACT.phone2}
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Dynamic Page Container with Framer Motion transitions (fade-in & slide-up) */}
      <main className="flex-1 overflow-hidden" id="main-content-router">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.26,
              ease: [0.25, 1, 0.5, 1]
            }}
            className="w-full"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Multi-Page Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
