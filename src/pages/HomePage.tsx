import React from 'react';
import { PageId } from '../types';
import { AsjyLogo } from '../components/AsjyLogo';
import { OFFICIAL_SOCIALS, ARTICLES_DATA } from '../data/content';
import {
  Sparkles,
  UserPlus,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Layers,
  ExternalLink,
  MapPin,
  Clock,
  Compass
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16" id="home-page-view">
      {/* 1. HERO SECTION: Concise, Powerful, Inspiring */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden" id="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0D3823] via-[#12452B] to-[#072416] text-[#FAF9F5] p-8 sm:p-14 lg:p-16 shadow-xl border border-[#D4AF37]/30 overflow-hidden">
            {/* Subtle Islamic rosette geometric pattern backdrop */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 max-w-3xl space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold text-emerald-200">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span>Association Sénégalaise à But Non Lucratif • Fondée en 2022</span>
              </div>

              {/* Main Title & Emblem */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                  Andeu Setal Jummah Yi
                </h1>
                <div className="inline-block text-lg sm:text-2xl font-serif italic text-[#D4AF37] tracking-wide font-medium">
                  « Jeff té YALLA rek takh »
                </div>
              </div>

              {/* Slogan & Mission statement */}
              <p className="text-lg sm:text-xl text-emerald-50/90 font-medium leading-relaxed max-w-2xl">
                « Ensemble pour des mosquées propres, belles et accueillantes. »
              </p>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                L’ASJY réunit la jeunesse du Sénégal dans un élan noble et désintéressé : honorer la maison d'Allah par des opérations régulières de nettoyage, d'embellissement paysager, de remplacement d'équipements et d'actions sociales.
              </p>

              {/* Primary Call-to-actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('actions')}
                  className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2b] text-[#0A291A] font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
                  id="hero-cta-actions"
                >
                  <span>Découvrir nos actions</span>
                  <ArrowRight className="w-4 h-4 text-[#0A291A]" />
                </button>

                <button
                  onClick={() => onNavigate('rejoindre')}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/30 transition-all active:scale-95 flex items-center gap-2"
                  id="hero-cta-rejoindre"
                >
                  <UserPlus className="w-4 h-4 text-[#D4AF37]" />
                  <span>Devenir membre</span>
                </button>

                <button
                  onClick={() => onNavigate('chartes')}
                  className="px-5 py-3 rounded-xl text-emerald-200 hover:text-white hover:underline text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5"
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
                  Par quinzaine de dimanche
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 ESSENTIAL PILLARS (Clean cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="essential-pillars">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D3823] bg-[#0D3823]/10 px-3 py-1 rounded-full">
            Notre Identité Fondatrice
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19241C]">
            Une jeunesse engagée, fraternelle et organisée
          </h2>
          <p className="text-sm text-gray-600">
            L'Association Andeu Setal Jummah Yi repose sur quatre valeurs fondamentales vécues sur le terrain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-[#0D3823]/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0D3823]/10 flex items-center justify-center text-[#0D3823] font-black text-lg mb-3">
              01
            </div>
            <h3 className="text-base font-bold text-[#0D3823] mb-1">Engagement</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Une présence bénévole active pour soulager les anciens et maintenir les lieux de prière dans un état irréprochable.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#0D3823]/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0D3823]/10 flex items-center justify-center text-[#0D3823] font-black text-lg mb-3">
              02
            </div>
            <h3 className="text-base font-bold text-[#0D3823] mb-1">Solidarité</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Unir les membres autour d'un idéal commun, favoriser l'entraide communautaire et les distributions de Ndogou.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#0D3823]/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0D3823]/10 flex items-center justify-center text-[#0D3823] font-black text-lg mb-3">
              03
            </div>
            <h3 className="text-base font-bold text-[#0D3823] mb-1">Propreté</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              « La propreté fait partie de la foi ». Lavage, désinfection, dépoussiérage et remplacement de matériel d'ablution.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#0D3823]/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0D3823]/10 flex items-center justify-center text-[#0D3823] font-black text-lg mb-3">
              04
            </div>
            <h3 className="text-base font-bold text-[#0D3823] mb-1">Communauté</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Une fraternité ouverte, inclusive, respectant la pudeur et la neutralité politique la plus stricte.
            </p>
          </div>
        </div>
      </section>

      {/* 3. APERÇU TRÈS COURT DES ACTIVITÉS AVEC BOUTON "VOIR PLUS" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="actions-overview">
        <div className="bg-[#F4F3EE] rounded-3xl p-8 sm:p-12 border border-[#0D3823]/10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0D3823]">
                Chantiers & Terrain
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19241C] mt-1">
                Ce que nous faisons pour les mosquées
              </h2>
              <p className="text-sm text-gray-600 max-w-xl mt-1">
                Découvrez un aperçu de nos 4 domaines d'action principaux au service des lieux de culte.
              </p>
            </div>

            <button
              onClick={() => onNavigate('actions')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
            >
              <span>Voir toutes nos actions</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <span className="text-2xl mb-2 block">🧹</span>
              <h4 className="font-bold text-sm text-[#0D3823] mb-1">Nettoyage Intégral</h4>
              <p className="text-xs text-gray-600">
                Lavage à grande eau des carreaux, balayage, dépoussiérage approfondi des nattes et tapis de prière.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <span className="text-2xl mb-2 block">🌱</span>
              <h4 className="font-bold text-sm text-[#0D3823] mb-1">Embellissement</h4>
              <p className="text-xs text-gray-600">
                Plantation d'arbres d'ombrage dans les cours, amélioration des espaces verts et valorisation esthétique.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <span className="text-2xl mb-2 block">🔧</span>
              <h4 className="font-bold text-sm text-[#0D3823] mb-1">Équipements & Entretien</h4>
              <p className="text-xs text-gray-600">
                Remplacement de bouilloires (satala), réparation de robinets d'ablution, éclairage LED et nattes.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <span className="text-2xl mb-2 block">🌙</span>
              <h4 className="font-bold text-sm text-[#0D3823] mb-1">Ramadan & Ndogou</h4>
              <p className="text-xs text-gray-600">
                Distributions de kits de rupture de jeûne organisées dans les différentes régions d'intervention de l'ASJY.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APERÇU DES DERNIÈRES ACTUALITÉS (avec "Voir plus") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="latest-news-overview">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D3823] bg-[#0D3823]/10 px-3 py-1 rounded-full">
              Actualités & Activités
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19241C] mt-2">
              Derniers comptes rendus & chantiers
            </h2>
          </div>

          <button
            onClick={() => onNavigate('actualites')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0D3823] hover:text-[#145334] underline-offset-4 hover:underline"
          >
            <span>Consulter toutes les actualités</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES_DATA.slice(0, 2).map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-[#0D3823]/10 shadow-sm overflow-hidden flex flex-col sm:flex-row group hover:border-[#0D3823]/30 transition-all"
            >
              <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-gray-100">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 sm:w-3/5 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span className="font-bold text-[#0D3823] uppercase">{art.category}</span>
                    <span>{art.date}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#19241C] group-hover:text-[#0D3823] transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#0D3823]" />
                    {art.region}
                  </span>
                  <button
                    onClick={() => onNavigate('actualites')}
                    className="text-xs font-bold text-[#0D3823] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                  >
                    <span>Lire l'article</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ENGAGEMENT QUICK BANNER */}
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
              Rejoignez une équipe soudée de jeunes musulmans dévoués. Cotisation mensuelle modique de 1 000 FCFA et nettoyages par quinzaine de dimanche.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => onNavigate('rejoindre')}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2b] text-[#0A291A] font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95"
            >
              Rejoindre l'ASJY
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all active:scale-95"
            >
              Proposer une mosquée
            </button>
          </div>
        </div>
      </section>

      {/* 6. SUIVEZ NOS ACTIONS (Official Social Links) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" id="social-follow-section">
        <div className="p-6 rounded-2xl bg-white border border-[#0D3823]/10 max-w-2xl mx-auto">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            Suivez les chantiers en direct
          </h4>
          <p className="text-sm font-semibold text-[#19241C] mb-4">
            Rejoignez notre communauté officielle sur les réseaux sociaux :
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={OFFICIAL_SOCIALS.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-[#FF0000]/10 text-gray-700 hover:text-[#FF0000] border border-gray-200 text-xs font-bold transition-all"
            >
              <span>YouTube Officiel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={OFFICIAL_SOCIALS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-[#E1306C]/10 text-gray-700 hover:text-[#E1306C] border border-gray-200 text-xs font-bold transition-all"
            >
              <span>Instagram Officiel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={OFFICIAL_SOCIALS.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-black/10 text-gray-700 hover:text-black border border-gray-200 text-xs font-bold transition-all"
            >
              <span>TikTok Officiel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
