import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { AsjyLogo } from './AsjyLogo';
import { useTheme } from '../context/ThemeContext';
import {
  Menu,
  X,
  Home,
  Users,
  Sparkles,
  ScrollText,
  HeartHandshake,
  PhoneCall,
  UserPlus,
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Simplified core navigation items
  const primaryNavItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'accueil', label: 'Accueil', icon: <Home className="w-5 h-5" /> },
    { id: 'association', label: "L'Association", icon: <Users className="w-5 h-5" /> },
    { id: 'actions', label: 'Nos Actions', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'chartes', label: 'Nos Chartes', icon: <ScrollText className="w-5 h-5" /> },
    { id: 'soutenir', label: 'Faire un Don', icon: <HeartHandshake className="w-5 h-5" /> },
    { id: 'contact', label: 'Contact', icon: <PhoneCall className="w-5 h-5" /> },
  ];

  const handleSelectPage = (id: PageId) => {
    onNavigate(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF9F5]/95 dark:bg-[#0c1712]/95 backdrop-blur-md shadow-sm border-b border-[#0D3823]/10 dark:border-[#1E4D34]/30 py-2.5'
            : 'bg-[#FAF9F5] dark:bg-[#0c1712] border-b border-[#0D3823]/5 dark:border-[#1E4D34]/20 py-3.5'
        }`}
        id="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleSelectPage('accueil')}
            className="group focus:outline-none transition-transform active:scale-95 text-left cursor-pointer"
            aria-label="Retour à l'accueil"
          >
            <AsjyLogo size="md" lightText={theme === 'dark'} />
          </button>

          {/* Center Navigation (Desktop Shortcuts) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F0EFEA] dark:bg-[#13221b] p-1 rounded-full border border-[#0D3823]/10 dark:border-[#1E4D34]/40">
            <button
              onClick={() => handleSelectPage('accueil')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'accueil'
                  ? 'bg-[#0D3823] text-white shadow-sm'
                  : 'text-[#19241C] dark:text-gray-200 hover:text-[#0D3823] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#1E382A]'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => handleSelectPage('association')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'association'
                  ? 'bg-[#0D3823] text-white shadow-sm'
                  : 'text-[#19241C] dark:text-gray-200 hover:text-[#0D3823] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#1E382A]'
              }`}
            >
              L'Association
            </button>
            <button
              onClick={() => handleSelectPage('actions')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'actions'
                  ? 'bg-[#0D3823] text-white shadow-sm'
                  : 'text-[#19241C] dark:text-gray-200 hover:text-[#0D3823] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#1E382A]'
              }`}
            >
              Nos Actions
            </button>
            <button
              onClick={() => handleSelectPage('chartes')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'chartes'
                  ? 'bg-[#0D3823] text-white shadow-sm'
                  : 'text-[#19241C] dark:text-gray-200 hover:text-[#0D3823] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#1E382A]'
              }`}
            >
              Nos Chartes
            </button>
            <button
              onClick={() => handleSelectPage('contact')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'contact'
                  ? 'bg-[#0D3823] text-white shadow-sm'
                  : 'text-[#19241C] dark:text-gray-200 hover:text-[#0D3823] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#1E382A]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action: Dark/Light Mode Toggle + Adhésion CTA + Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-[#13221b] border border-[#0D3823]/15 dark:border-[#D4AF37]/30 text-[#0D3823] dark:text-[#D4AF37] hover:bg-[#F3FAF5] dark:hover:bg-[#1C3827] transition-all shadow-xs active:scale-95 cursor-pointer"
              aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
              title={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D3823]" />
              )}
            </button>

            {/* Devenir Membre CTA */}
            <button
              onClick={() => handleSelectPage('rejoindre')}
              className="hidden sm:inline-flex items-center gap-2 bg-[#0D3823] dark:bg-[#145334] hover:bg-[#145334] dark:hover:bg-[#1B6D45] text-[#FAF9F5] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md active:scale-95 border border-[#C59B27]/40 cursor-pointer"
              id="cta-nav-rejoindre"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Devenir Membre</span>
            </button>

            {/* Menu Trigger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#13221b] hover:bg-[#F3FAF5] dark:hover:bg-[#1C3827] border border-[#0D3823]/20 dark:border-[#D4AF37]/30 shadow-sm text-[#0D3823] dark:text-white font-bold text-xs uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-[#0D3823]/30 active:scale-95 cursor-pointer"
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isOpen}
              id="main-menu-trigger-btn"
            >
              {isOpen ? (
                <>
                  <X className="w-4 h-4 text-[#0D3823] dark:text-emerald-300" />
                  <span className="hidden sm:inline">Fermer</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-[#0D3823] dark:text-emerald-300" />
                  <span className="font-extrabold tracking-wide">Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Simplified, Elegant Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" id="main-navigation-overlay">
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Navigation Drawer Container */}
          <div className="relative w-full max-w-sm bg-[#FAF9F5] dark:bg-[#0c1712] h-full shadow-2xl z-10 flex flex-col overflow-hidden border-l border-[#0D3823]/20 dark:border-[#1E4D34]/40">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#0D3823]/10 dark:border-[#1E4D34]/30 bg-white dark:bg-[#111f18] flex items-center justify-between">
              <AsjyLogo size="sm" lightText={theme === 'dark'} />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-[#FAF9F5] dark:bg-[#1A2E23] hover:bg-[#F0EFEA] dark:hover:bg-[#254232] text-[#19241C] dark:text-white transition-colors focus:outline-none cursor-pointer"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5 text-[#0D3823] dark:text-emerald-300" />
              </button>
            </div>

            {/* Slogan */}
            <div className="bg-[#0A291A] text-white text-xs py-2.5 px-5 text-center border-b border-[#D4AF37]/30">
              <span className="text-[#D4AF37] font-semibold italic text-xs">« Jeff té YALLA rek takh »</span>
            </div>

            {/* Clean, Simple Navigation List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
              {primaryNavItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectPage(item.id)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left font-semibold text-sm transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0D3823] text-white shadow-sm'
                        : 'text-[#19241C] dark:text-gray-200 hover:bg-white dark:hover:bg-[#13221b] hover:text-[#0D3823] dark:hover:text-emerald-300'
                    }`}
                  >
                    <span className={isActive ? 'text-[#D4AF37]' : 'text-[#0D3823] dark:text-emerald-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer: Simplified Adhésion CTA + Admin Link */}
            <div className="p-4 bg-white dark:bg-[#111f18] border-t border-[#0D3823]/10 dark:border-[#1E4D34]/30 space-y-3">
              <button
                onClick={() => handleSelectPage('rejoindre')}
                className="w-full py-3 bg-[#0D3823] hover:bg-[#145334] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-[#C59B27]/40 shadow-sm cursor-pointer active:scale-98"
              >
                <UserPlus className="w-4 h-4 text-[#D4AF37]" />
                <span>Rejoindre l'Association</span>
              </button>

              <button
                onClick={() => handleSelectPage('admin')}
                className="w-full py-2 text-center text-xs text-gray-500 hover:text-[#0D3823] dark:text-gray-400 dark:hover:text-[#D4AF37] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Espace Administration</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
