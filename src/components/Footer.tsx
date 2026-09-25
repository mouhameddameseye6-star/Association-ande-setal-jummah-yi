import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { AsjyLogo } from './AsjyLogo';
import { OFFICIAL_SOCIALS, OFFICIAL_CONTACT } from '../data/content';
import { usePhotos } from '../context/PhotoContext';
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Calendar,
  ArrowUpRight,
  MessageSquare,
  Copy,
  Check,
  Lock
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { siteSettings } = usePhotos();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A291A] text-[#FAF9F5] border-t-2 border-[#D4AF37]/30 pt-16 pb-12" id="global-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Identity, Mission & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <AsjyLogo size="lg" lightText={true} />

            <p className="text-sm text-gray-300 leading-relaxed pr-4">
              {siteSettings.presentation}
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-[#D4AF37]/30 inline-block">
              <div className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold">
                Devise & Slogan Fondateur
              </div>
              <div className="text-base font-extrabold text-white italic mt-0.5">
                « {siteSettings.slogan} »
              </div>
            </div>

            {/* Official Social Media Channels */}
            <div className="pt-2">
              <div className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2.5">
                Nos Canaux Officiels :
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={OFFICIAL_SOCIALS.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF0000] text-white text-xs font-semibold transition-colors group"
                >
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                </a>

                <a
                  href={OFFICIAL_SOCIALS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#E1306C] text-white text-xs font-semibold transition-colors group"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                </a>

                <a
                  href={OFFICIAL_SOCIALS.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-black text-white text-xs font-semibold transition-colors group"
                >
                  <span>TikTok</span>
                  <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Pages */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37] mb-4">
              L'Association
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => handleNav('accueil')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('association')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer"
                >
                  Présentation & Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('histoire')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer"
                >
                  Notre Histoire (Timeline)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('sections')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer"
                >
                  Nos Sections au Sénégal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('impact')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer"
                >
                  Notre Impact & Chiffres
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('chartes')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Nos 8 Chartes</span>
                  <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.2 rounded font-bold">Règles</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Chantiers & Activités */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37] mb-4">
              Actions & Terrain
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => handleNav('actions')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer"
                >
                  Nos Actions de Nettoyage
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('ramadan')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Ramadan & Ndogou</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">Solidarité</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('operations')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Prochaines Opérations</span>
                  <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded font-bold">Agenda</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('actualites')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer"
                >
                  Actualités & Bilans
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="hover:text-[#D4AF37] hover:translate-x-1 transition-all text-left flex items-center gap-1.5 text-emerald-300 text-xs font-bold pt-2 cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-[#D4AF37]" />
                  <span>Espace Administrateur</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Engagement & Contact */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37] mb-4">
              Agir Avec Nous
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300 mb-5">
              <li>
                <button
                  onClick={() => handleNav('rejoindre')}
                  className="inline-flex items-center gap-1.5 text-white font-bold bg-[#145334] hover:bg-[#1b6b44] px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Devenir Membre</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('soutenir')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer"
                >
                  Nous Soutenir (Cotisations/Dons)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer"
                >
                  Proposer une Mosquée
                </button>
              </li>
            </ul>

            <div className="pt-3 border-t border-white/10 space-y-2.5 text-xs text-gray-300">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold mb-1.5">
                  Contacts Officiels ASJY
                </div>
                
                {/* Numéro 1 */}
                <div className="flex items-center justify-between gap-2 py-1 border-b border-white/5">
                  <a
                    href={`tel:${siteSettings.phone1.replace(/[^0-9+]/g, '')}`}
                    className="font-mono font-extrabold text-sm text-white hover:text-[#D4AF37] hover:underline flex items-center gap-1.5"
                    title={`Appeler le ${siteSettings.phone1}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{siteSettings.phone1}</span>
                  </a>

                  <button
                    onClick={() => handleCopy(siteSettings.phone1, 'footer-1')}
                    className="relative inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/10 hover:bg-white/20 text-[#D4AF37] border border-[#D4AF37]/30 transition-all active:scale-95 cursor-pointer"
                    title="Copier le numéro"
                    aria-label="Copier le numéro"
                  >
                    <AnimatePresence mode="wait">
                      {copiedKey === 'footer-1' ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.18 }}
                          className="inline-flex items-center gap-1 text-emerald-400 font-extrabold"
                        >
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copié !</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.18 }}
                          className="inline-flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copier</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                {/* Numéro 2 */}
                <div className="flex items-center justify-between gap-2 py-1">
                  <a
                    href={`tel:${siteSettings.phone2.replace(/[^0-9+]/g, '')}`}
                    className="font-mono font-extrabold text-sm text-white hover:text-[#D4AF37] hover:underline flex items-center gap-1.5"
                    title={`Appeler le ${siteSettings.phone2}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{siteSettings.phone2}</span>
                  </a>

                  <button
                    onClick={() => handleCopy(siteSettings.phone2, 'footer-2')}
                    className="relative inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/10 hover:bg-white/20 text-[#D4AF37] border border-[#D4AF37]/30 transition-all active:scale-95 cursor-pointer"
                    title="Copier le numéro"
                    aria-label="Copier le numéro"
                  >
                    <AnimatePresence mode="wait">
                      {copiedKey === 'footer-2' ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.18 }}
                          className="inline-flex items-center gap-1 text-emerald-400 font-extrabold"
                        >
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copié !</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.18 }}
                          className="inline-flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copier</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                <div className="text-[11px] text-gray-400 mt-1">
                  Appels • WhatsApp • Wave • Orange Money
                </div>
              </div>

              {/* Action buttons inside footer */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <a
                  href={`https://wa.me/${OFFICIAL_CONTACT.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[10px] uppercase tracking-wider transition-all shadow-sm"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp 1</span>
                </a>

                <a
                  href={`https://wa.me/${OFFICIAL_CONTACT.whatsapp2Raw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[10px] uppercase tracking-wider transition-all shadow-sm"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp 2</span>
                </a>
              </div>

              <div className="pt-1 space-y-1 text-gray-400 text-[11px]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>{siteSettings.headquarters}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>{siteSettings.scheduleNotice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} {siteSettings.name} (ASJY). Tous droits réservés.
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-300">Engagement</span>
            <span>•</span>
            <span className="text-gray-300">Solidarité</span>
            <span>•</span>
            <span className="text-gray-300">Propreté</span>
            <span>•</span>
            <span className="text-gray-300">Communauté</span>
            <span>•</span>
            <button
              onClick={() => handleNav('admin')}
              className="text-gray-400 hover:text-[#D4AF37] underline transition-colors cursor-pointer"
            >
              Administration (/admin)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
