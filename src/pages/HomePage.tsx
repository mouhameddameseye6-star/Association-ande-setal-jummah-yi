import React from 'react';
import { PageId } from '../types';
import { AsjyLogo } from '../components/AsjyLogo';
import { OFFICIAL_SOCIALS } from '../data/content';
import { usePhotos } from '../context/PhotoContext';
import {
  Sparkles,
  UserPlus,
  ArrowRight,
  ExternalLink,
  HeartHandshake,
  Calendar,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { siteSettings } = usePhotos();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16" id="home-page-view">
      {/* 1. HERO SECTION: Concise, Elegant, Meaningful */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden" id="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0D3823] via-[#12452B] to-[#072416] text-[#FAF9F5] p-8 sm:p-14 lg:p-16 shadow-xl border border-[#D4AF37]/30 overflow-hidden">
            {/* Subtle Islamic rosette geometric pattern backdrop */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 max-w-3xl space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold text-emerald-200">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span>Association Sénégalaise à But Non Lucratif • Fondée en {siteSettings.creationDate}</span>
              </div>

              {/* Main Title & Emblem */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                  {siteSettings.name}
                </h1>
                <div className="inline-block text-lg sm:text-2xl font-serif italic text-[#D4AF37] tracking-wide font-medium">
                  « {siteSettings.slogan} »
                </div>
              </div>

              {/* Slogan & Mission statement */}
              <p className="text-lg sm:text-xl text-emerald-50/90 font-medium leading-relaxed max-w-2xl">
                « {siteSettings.subtitle} »
              </p>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                {siteSettings.presentation}
              </p>

              {/* Primary Call-to-actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('rejoindre')}
                  className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2b] text-[#0A291A] font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                  id="hero-cta-rejoindre"
                >
                  <UserPlus className="w-4 h-4 text-[#0A291A]" />
                  <span>Devenir Membre</span>
                </button>

                <button
                  onClick={() => onNavigate('actions')}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/30 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                  id="hero-cta-actions"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Nos Actions de Terrain</span>
                </button>

                <button
                  onClick={() => onNavigate('chartes')}
                  className="px-5 py-3 rounded-xl text-emerald-200 hover:text-white hover:underline text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Nos 8 Chartes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Aesthetic Corner Stamp with Official Emblem */}
            <div className="hidden lg:flex items-center gap-3.5 absolute bottom-8 right-8 text-left bg-black/25 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shadow-lg max-w-xs">
              <div className="w-14 h-14 shrink-0 bg-white rounded-xl p-0.5 shadow-md flex items-center justify-center border border-[#006847]/20">
                <AsjyLogo size="sm" variant="badge-only" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-extrabold">
                  Sceau Officiel ASJY
                </div>
                <div className="text-xs text-white font-bold leading-tight">
                  Andeu Setal Jummah Yi
                </div>
                <div className="text-[11px] text-emerald-200">
                  {siteSettings.scheduleNotice}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 ESSENTIAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="essential-pillars">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D3823] dark:text-[#D4AF37] bg-[#0D3823]/10 dark:bg-[#1E4D34] px-3 py-1 rounded-full">
            Notre Identité Fondatrice
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19241C] dark:text-white">
            Une jeunesse engagée, fraternelle et organisée
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            L'Association Andeu Setal Jummah Yi repose sur quatre valeurs fondamentales vécues sur le terrain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white dark:bg-[#0f1f17] p-6 rounded-2xl border border-[#0D3823]/10 dark:border-[#D4AF37]/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0D3823]/10 dark:bg-[#1E4D34] flex items-center justify-center text-[#0D3823] dark:text-[#D4AF37] font-black text-lg mb-3">
              01
            </div>
            <h3 className="text-base font-bold text-[#0D3823] dark:text-emerald-400 mb-1">Engagement</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Une présence bénévole active pour soulager les anciens et maintenir les lieux de prière dans un état irréprochable.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0f1f17] p-6 rounded-2xl border border-[#0D3823]/10 dark:border-[#D4AF37]/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0D3823]/10 dark:bg-[#1E4D34] flex items-center justify-center text-[#0D3823] dark:text-[#D4AF37] font-black text-lg mb-3">
              02
            </div>
            <h3 className="text-base font-bold text-[#0D3823] dark:text-emerald-400 mb-1">Solidarité</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Unir les membres autour d'un idéal commun, favoriser l'entraide communautaire et les distributions de Ndogou.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0f1f17] p-6 rounded-2xl border border-[#0D3823]/10 dark:border-[#D4AF37]/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0D3823]/10 dark:bg-[#1E4D34] flex items-center justify-center text-[#0D3823] dark:text-[#D4AF37] font-black text-lg mb-3">
              03
            </div>
            <h3 className="text-base font-bold text-[#0D3823] dark:text-emerald-400 mb-1">Propreté</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              « La propreté fait partie de la foi ». Lavage, désinfection, dépoussiérage et remplacement de matériel d'ablution.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0f1f17] p-6 rounded-2xl border border-[#0D3823]/10 dark:border-[#D4AF37]/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0D3823]/10 dark:bg-[#1E4D34] flex items-center justify-center text-[#0D3823] dark:text-[#D4AF37] font-black text-lg mb-3">
              04
            </div>
            <h3 className="text-base font-bold text-[#0D3823] dark:text-emerald-400 mb-1">Communauté</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Une fraternité ouverte, inclusive, respectant la pudeur et la neutralité politique la plus stricte.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PRESENTATION SYNTHÉTIQUE DES ACTIONS & RYTHME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="actions-overview">
        <div className="bg-[#FAF9F5] dark:bg-[#0c1a13] rounded-3xl p-8 sm:p-12 border border-[#0D3823]/15 dark:border-[#D4AF37]/25 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-[#0D3823]/10 dark:border-[#1E4D34]/40 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0D3823] dark:text-[#D4AF37] bg-[#0D3823]/10 dark:bg-[#1E4D34] px-3 py-1 rounded-full">
                Sur le Terrain
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#19241C] dark:text-white uppercase tracking-tight">
                Nos Chantiers et Activités Principales
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                Des opérations concrètes menées bénévolement par quinzaines de dimanche pour l'amour d'Allah.
              </p>
            </div>

            <button
              onClick={() => onNavigate('actions')}
              className="px-5 py-2.5 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
            >
              <span>Voir le détail de nos actions</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#11221a] p-6 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#0D3823] dark:text-emerald-400 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5 text-[#0D3823] dark:text-[#D4AF37]" />
              </div>
              <h3 className="font-extrabold text-base text-[#19241C] dark:text-white">
                Rythme par Quinzaine
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Conformément à la Charte C8, les nettoyages ont lieu tous les 15 jours le dimanche matin, alternés pour préserver l'équilibre de chacun.
              </p>
            </div>

            <div className="bg-white dark:bg-[#11221a] p-6 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#0D3823] dark:text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-[#0D3823] dark:text-[#D4AF37]" />
              </div>
              <h3 className="font-extrabold text-base text-[#19241C] dark:text-white">
                Entretien & Hygiène Sacrée
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Lavage et dépoussiérage approfondi des tapis de prière, réhabilitation des espaces d'ablutions, don de bouilloires neuves et de détergents.
              </p>
            </div>

            <div className="bg-white dark:bg-[#11221a] p-6 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#0D3823] dark:text-emerald-400 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5 text-[#0D3823] dark:text-[#D4AF37]" />
              </div>
              <h3 className="font-extrabold text-base text-[#19241C] dark:text-white">
                Solidarité & Ndogou
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Pendant le mois de Ramadan, distribution de café chaud, dattes et kits complets de rupture de jeûne aux automobilistes et passants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ENGAGEMENT QUICK BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="quick-join-banner">
        <div className="rounded-2xl bg-[#0D3823] text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#D4AF37]/30 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37]">
              Adhésion & Bénévolat
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Vous aussi, contribuez à embellir les mosquées du Sénégal
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Rejoignez une équipe soudée de jeunes musulmans dévoués. Cotisation mensuelle modique de {siteSettings.cotisationAmount} et nettoyages {siteSettings.scheduleNotice}.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => onNavigate('rejoindre')}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2b] text-[#0A291A] font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Rejoindre l'ASJY
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all active:scale-95 cursor-pointer"
            >
              Proposer une mosquée
            </button>
          </div>
        </div>
      </section>

      {/* 5. SUIVEZ NOS ACTIONS (Official Social Links) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" id="social-follow-section">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0f1f17] border border-[#0D3823]/10 dark:border-[#D4AF37]/20 max-w-2xl mx-auto">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            Suivez les chantiers en direct
          </h4>
          <p className="text-sm font-semibold text-[#19241C] dark:text-white mb-4">
            Rejoignez notre communauté officielle sur les réseaux sociaux :
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={OFFICIAL_SOCIALS.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-[#13261c] hover:bg-[#FF0000]/10 text-gray-700 dark:text-gray-200 hover:text-[#FF0000] border border-gray-200 dark:border-gray-700 text-xs font-bold transition-all"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={OFFICIAL_SOCIALS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-[#13261c] hover:bg-[#E1306C]/10 text-gray-700 dark:text-gray-200 hover:text-[#E1306C] border border-gray-200 dark:border-gray-700 text-xs font-bold transition-all"
            >
              <span>Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={OFFICIAL_SOCIALS.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-[#13261c] hover:bg-black/10 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white border border-gray-200 dark:border-gray-700 text-xs font-bold transition-all"
            >
              <span>TikTok</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
