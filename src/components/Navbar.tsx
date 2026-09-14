import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { AsjyLogo } from './AsjyLogo';
import { OFFICIAL_SOCIALS, OFFICIAL_CONTACT } from '../data/content';
import {
  Menu,
  X,
  Home,
  Users,
  Sparkles,
  History,
  BarChart3,
  Image as ImageIcon,
  MapPin,
  Moon,
  ScrollText,
  UserPlus,
  HeartHandshake,
  Calendar,
  Newspaper,
  PhoneCall,
  Phone,
  MessageSquare,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navItems: { id: PageId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'accueil', label: 'Accueil', icon: <Home className="w-5 h-5" /> },
    { id: 'association', label: "L'Association", icon: <Users className="w-5 h-5" /> },
    { id: 'actions', label: 'Nos Actions', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'histoire', label: 'Notre Histoire', icon: <History className="w-5 h-5" /> },
    { id: 'impact', label: 'Notre Impact', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'realisations', label: 'Nos Réalisations', icon: <ImageIcon className="w-5 h-5" />, badge: 'Galerie' },
    { id: 'sections', label: 'Nos Sections', icon: <MapPin className="w-5 h-5" />, badge: 'Sénégal' },
    { id: 'ramadan', label: 'Ramadan & Ndogou', icon: <Moon className="w-5 h-5" /> },
    { id: 'chartes', label: 'Nos Chartes', icon: <ScrollText className="w-5 h-5" />, badge: '8 Règles' },
    { id: 'rejoindre', label: 'Nous Rejoindre', icon: <UserPlus className="w-5 h-5" />, badge: 'Adhésion' },
    { id: 'soutenir', label: 'Nous Soutenir', icon: <HeartHandshake className="w-5 h-5" /> },
    { id: 'operations', label: 'Prochaines Opérations', icon: <Calendar className="w-5 h-5" />, badge: 'Agenda' },
    { id: 'actualites', label: 'Actualités', icon: <Newspaper className="w-5 h-5" /> },
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
            ? 'bg-[#FAF9F5]/95 backdrop-blur-md shadow-sm border-b border-[#0D3823]/10 py-2.5'
            : 'bg-[#FAF9F5] border-b border-[#0D3823]/5 py-3.5'
        }`}
        id="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleSelectPage('accueil')}
            className="group focus:outline-none transition-transform active:scale-95 text-left"
            aria-label="Retour à l'accueil"
          >
            <AsjyLogo size="md" />
          </button>

          {/* Center Quick Navigation (Desktop Shortcuts) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F0EFEA] p-1 rounded-full border border-[#0D3823]/10">
            <button
              onClick={() => handleSelectPage('accueil')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentPage === 'accueil'
                  ? 'bg-[#0D3823] text-white shadow-sm'
                  : 'text-[#19241C] hover:text-[#0D3823] hover:bg-white/60'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => handleSelectPage('actions')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentPage === 'actions'
                  ? 'bg-[#0D3823] text-white shadow-sm'
                  : 'text-[#19241C] hover:text-[#0D3823] hover:bg-white/60'
              }`}
            >
              Actions
            </button>
            <button
              onClick={() => handleSelectPage('realisations')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentPage === 'realisations'
                  ? 'bg-[#0D3823] text-white shadow-sm'
                  : 'text-[#19241C] hover:text-[#0D3823] hover:bg-white/60'
              }`}
            >
              Réalisations
            </button>
            <button
              onClick={() => handleSelectPage('chartes')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentPage === 'chartes'
                  ? 'bg-[#0D3823] text-white shadow-sm'
                  : 'text-[#19241C] hover:text-[#0D3823] hover:bg-white/60'
              }`}
            >
              Chartes
            </button>
            <button
              onClick={() => handleSelectPage('operations')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentPage === 'operations'
                  ? 'bg-[#0D3823] text-white shadow-sm'
                  : 'text-[#19241C] hover:text-[#0D3823] hover:bg-white/60'
              }`}
            >
              Agenda
            </button>
            <button
              onClick={() => handleSelectPage('actualites')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentPage === 'actualites'
                  ? 'bg-[#0D3823] text-white shadow-sm'
                  : 'text-[#19241C] hover:text-[#0D3823] hover:bg-white/60'
              }`}
            >
              Actualités
            </button>
          </nav>

          {/* Right Action: Direct Call + Devenir Membre CTA + Dedicated Menu Toggle Button */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Direct Call Link */}
            <div className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0D3823]/5 text-[#0D3823] text-xs font-bold font-mono border border-[#0D3823]/10">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <a
                href={`tel:${OFFICIAL_CONTACT.phone1Raw}`}
                className="hover:underline"
                title="Appeler le 77 757 87 89"
              >
                {OFFICIAL_CONTACT.phone1}
              </a>
              <span className="text-gray-400 font-sans">/</span>
              <a
                href={`tel:${OFFICIAL_CONTACT.phone2Raw}`}
                className="hover:underline"
                title="Appeler le 76 440 14 41"
              >
                {OFFICIAL_CONTACT.phone2}
              </a>
            </div>

            <button
              onClick={() => handleSelectPage('rejoindre')}
              className="hidden sm:inline-flex items-center gap-2 bg-[#0D3823] hover:bg-[#145334] text-[#FAF9F5] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md active:scale-95 border border-[#C59B27]/40"
              id="cta-nav-rejoindre"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Devenir Membre</span>
            </button>

            {/* Menu Trigger Button (as explicitly requested: ☰ or ⋮ clearly identifiable) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F3FAF5] border border-[#0D3823]/20 shadow-sm text-[#0D3823] font-bold text-xs uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-[#0D3823]/30 active:scale-95"
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu complet'}
              aria-expanded={isOpen}
              id="main-menu-trigger-btn"
            >
              {isOpen ? (
                <>
                  <X className="w-4 h-4 text-[#0D3823]" />
                  <span className="hidden sm:inline">Fermer</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-[#0D3823]" />
                  <span className="font-extrabold tracking-wide">Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Modern Slide-over Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" id="main-navigation-overlay">
          {/* Backdrop with subtle blur */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Navigation Drawer Container */}
          <div className="relative w-full max-w-md bg-[#FAF9F5] h-full shadow-2xl z-10 flex flex-col overflow-hidden border-l border-[#0D3823]/20">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#0D3823]/10 bg-white flex items-center justify-between">
              <AsjyLogo size="sm" />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-[#FAF9F5] hover:bg-[#F0EFEA] text-[#19241C] transition-colors focus:outline-none"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5 text-[#0D3823]" />
              </button>
            </div>

            {/* Slogan Banner */}
            <div className="px-5 py-2.5 bg-gradient-to-r from-[#0D3823] to-[#145334] text-white flex items-center justify-between text-xs">
              <span className="font-medium tracking-wide">Association Sénégalaise</span>
              <span className="italic font-bold text-[#D4AF37]">« Jeff té YALLA rek takh »</span>
            </div>

            {/* Navigation List (All Independent Pages) */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#0D3823]/70 px-3 py-1">
                Toutes les rubriques
              </div>

              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectPage(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-[#0D3823] text-white font-bold shadow-md shadow-[#0D3823]/20'
                        : 'text-[#19241C] hover:bg-white hover:text-[#0D3823] font-medium'
                    }`}
                    id={`nav-link-${item.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`${isActive ? 'text-[#D4AF37]' : 'text-[#0D3823]'}`}>
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/20 text-[#FAF9F5]'
                              : 'bg-[#0D3823]/10 text-[#0D3823]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer with Official Contact, Actions & Social Links */}
            <div className="p-4 bg-white border-t border-[#0D3823]/10 space-y-3">
              {/* Official Contact Box */}
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#0D3823]/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0D3823]">
                    Numéros Officiels ASJY
                  </span>
                  <span className="text-[10px] font-bold text-gray-500">Wave • OM</span>
                </div>
                <div className="space-y-1.5 font-mono text-xs font-bold text-[#0D3823]">
                  <div className="flex items-center justify-between bg-white p-1.5 rounded-lg border border-gray-200">
                    <a href={`tel:${OFFICIAL_CONTACT.phone1Raw}`} className="hover:underline">
                      {OFFICIAL_CONTACT.phone1}
                    </a>
                    <a
                      href={`tel:${OFFICIAL_CONTACT.phone1Raw}`}
                      className="px-2 py-0.5 rounded bg-[#0D3823] text-white text-[10px] font-bold"
                    >
                      Appeler
                    </a>
                  </div>
                  <div className="flex items-center justify-between bg-white p-1.5 rounded-lg border border-gray-200">
                    <a href={`tel:${OFFICIAL_CONTACT.phone2Raw}`} className="hover:underline">
                      {OFFICIAL_CONTACT.phone2}
                    </a>
                    <a
                      href={`tel:${OFFICIAL_CONTACT.phone2Raw}`}
                      className="px-2 py-0.5 rounded bg-[#0D3823] text-white text-[10px] font-bold"
                    >
                      Appeler
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`https://wa.me/${OFFICIAL_CONTACT.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm active:scale-95"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp 1</span>
                  </a>
                  <a
                    href={`https://wa.me/${OFFICIAL_CONTACT.whatsapp2Raw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm active:scale-95"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp 2</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                <span>Réseaux officiels ASJY :</span>
                <span className="text-[11px] text-[#0D3823] font-semibold">Suivez nos chantiers</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href={OFFICIAL_SOCIALS.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-[#FF0000]/10 text-[#C4302B] hover:bg-[#FF0000]/20 text-xs font-semibold transition-colors"
                >
                  <span className="font-bold">YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={OFFICIAL_SOCIALS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-[#E1306C]/10 text-[#C13584] hover:bg-[#E1306C]/20 text-xs font-semibold transition-colors"
                >
                  <span className="font-bold">Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={OFFICIAL_SOCIALS.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-black/10 text-black hover:bg-black/20 text-xs font-semibold transition-colors"
                >
                  <span className="font-bold">TikTok</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Direct Adhesion Button inside menu */}
              <button
                onClick={() => handleSelectPage('rejoindre')}
                className="w-full py-2.5 bg-[#0D3823] text-white hover:bg-[#145334] rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-[#C59B27]/40 shadow-sm"
              >
                <UserPlus className="w-4 h-4 text-[#D4AF37]" />
                <span>Rejoindre l'Association ASJY</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
