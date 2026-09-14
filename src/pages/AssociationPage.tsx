import React from 'react';
import { PageId } from '../types';
import { AsjyLogo } from '../components/AsjyLogo';
import {
  Users,
  ShieldCheck,
  Target,
  Sparkles,
  Heart,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface AssociationPageProps {
  onNavigate: (page: PageId) => void;
}

export const AssociationPage: React.FC<AssociationPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="association-page">
      {/* Page Header with Official Emblem */}
      <div className="border-b border-[#0D3823]/10 pb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 bg-white p-2 rounded-3xl shadow-sm border border-[#006847]/20 ring-4 ring-[#006847]/10 flex items-center justify-center">
          <AsjyLogo size="xl" variant="badge-only" />
        </div>
        <div className="space-y-3 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Qui Sommes-Nous ?</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
            L'Association Andeu Setal Jummah Yi
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
            Une organisation à but non lucratif fondée au Sénégal en 2022, animée par des jeunes musulmans dévoués au service exclusif des mosquées et de la communauté.
          </p>
        </div>
      </div>

      {/* Slogan Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0D3823] via-[#145334] to-[#0A291A] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#D4AF37]/30 shadow-md">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37]">
            Notre Devise Spirituelle
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-serif italic text-white">
            « Jeff té YALLA rek takh »
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
            Agir uniquement pour l'amour et l'agrément d'Allah (Subhanahu wa Ta'ala), sans recherche de renommée, d'intérêt financier ou d'ambition politique.
          </p>
        </div>

        <button
          onClick={() => onNavigate('chartes')}
          className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2b] text-[#0A291A] font-extrabold text-xs uppercase tracking-wider transition-all shrink-0 active:scale-95"
        >
          Consulter nos 8 chartes
        </button>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-[#0D3823]/10 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0D3823]/10 flex items-center justify-center text-[#0D3823]">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-[#19241C]">Notre Mission</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            L'ASJY œuvre au quotidien pour rendre les mosquées sénégalaises propres, saines, dignes et agréables pour tous les fidèles.
          </p>
          <ul className="space-y-2.5 text-sm text-gray-700 pt-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#145334] shrink-0 mt-0.5" />
              <span>Assurer le nettoyage en profondeur (lavage des sols, dépoussiérage des nattes, sanitaires).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#145334] shrink-0 mt-0.5" />
              <span>Embellir le cadre de vie par le reboisement et la valorisation des cours intérieures.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#145334] shrink-0 mt-0.5" />
              <span>Remplacer et réparer les équipements essentiels (satala, robinets, éclairage LED, sonorisation).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#145334] shrink-0 mt-0.5" />
              <span>Déployer la solidarité communautaire (distributions de Ndogou durant le Ramadan).</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#0D3823]/10 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0D3823]/10 flex items-center justify-center text-[#0D3823]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-[#19241C]">Notre Vision</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Nous voulons faire de la jeunesse le moteur premier de la préservation du patrimoine spirituel et communautaire au Sénégal.
          </p>
          <ul className="space-y-2.5 text-sm text-gray-700 pt-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#145334] shrink-0 mt-0.5" />
              <span>Mobiliser une génération de jeunes citoyens actifs, pieux et solidaires.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#145334] shrink-0 mt-0.5" />
              <span>Soulager les aînés qui portaient seuls la charge de l'entretien des édifices de prière.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#145334] shrink-0 mt-0.5" />
              <span>Étendre des sections actives et autonomes dans l'ensemble des départements du Sénégal.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#145334] shrink-0 mt-0.5" />
              <span>Instaurer une culture durable de propreté et d'embellissement écologique des espaces cultuels.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Les 4 Valeurs Card Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D3823]">
            Fondations Morales
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19241C]">
            Nos 4 Valeurs Piliers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#0D3823]/10 shadow-sm space-y-3">
            <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-[#0D3823]/10 text-[#0D3823]">
              Valeur 01
            </span>
            <h4 className="text-lg font-extrabold text-[#0D3823]">ENGAGEMENT</h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Une assiduité sans faille aux chantiers du dimanche, le don de son temps et de son énergie physique pour le bien public.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#0D3823]/10 shadow-sm space-y-3">
            <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-[#0D3823]/10 text-[#0D3823]">
              Valeur 02
            </span>
            <h4 className="text-lg font-extrabold text-[#0D3823]">SOLIDARITÉ</h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              L'union des cœurs, l'aide aux fidèles démunis, les paniers Ndogou et le soutien bienveillant entre tous les membres.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#0D3823]/10 shadow-sm space-y-3">
            <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-[#0D3823]/10 text-[#0D3823]">
              Valeur 03
            </span>
            <h4 className="text-lg font-extrabold text-[#0D3823]">PROPRETÉ</h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              La purification matérielle et spirituelle. Nettoyer avec amour, désinfecter et rendre les lieux resplendissants.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#0D3823]/10 shadow-sm space-y-3">
            <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-[#0D3823]/10 text-[#0D3823]">
              Valeur 04
            </span>
            <h4 className="text-lg font-extrabold text-[#0D3823]">COMMUNAUTÉ</h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              L'inclusion de tous sans étiquette politique ni distinction sociale, dans le respect mutuel et la pudeur islamique.
            </p>
          </div>
        </div>
      </div>

      {/* Organisation & Fonctionnement */}
      <div className="bg-[#FAF9F5] p-8 sm:p-10 rounded-3xl border border-[#0D3823]/15 space-y-6">
        <h3 className="text-xl sm:text-2xl font-black text-[#0D3823] uppercase tracking-wide">
          Organisation et Fonctionnement
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#0D3823]">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Rythme des Chantiers</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Conformément à la Charte C8, les nettoyages sont organisés par <strong>quinzaine de dimanche</strong> (deux dimanches par mois) pour assurer constance et équilibre avec la vie quotidienne.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#0D3823]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Sections Régionales</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Chaque région dispose d'un coordonnateur et d'un bureau local chargé de recenser les besoins des mosquées, de gérer le stock de détergents et de mobiliser les bénévoles.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#0D3823]">
              <Heart className="w-4 h-4 text-[#D4AF37]" />
              <span>Cotisation de 1 000 FCFA</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Conformément à la Charte C4, l'autonomie financière repose sur les cotisations mensuelles des membres, garantissant notre indépendance et l'achat de matériel durable.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => onNavigate('histoire')}
            className="px-6 py-2.5 rounded-xl bg-[#0D3823] text-white hover:bg-[#145334] text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            <span>Découvrir notre histoire</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
          <button
            onClick={() => onNavigate('rejoindre')}
            className="px-6 py-2.5 rounded-xl bg-white border border-[#0D3823]/30 text-[#0D3823] hover:bg-emerald-50 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Rejoindre nos rangs
          </button>
        </div>
      </div>
    </div>
  );
};
