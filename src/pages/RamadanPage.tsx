import React from 'react';
import { PageId } from '../types';
import {
  Moon,
  HeartHandshake,
  MapPin,
  Utensils,
  Coffee,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface RamadanPageProps {
  onNavigate: (page: PageId) => void;
}

export const RamadanPage: React.FC<RamadanPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="ramadan-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
          <Moon className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Mois Béni</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
          Ramadan & Distributions de Ndogou
        </h1>
        <div className="text-lg sm:text-xl font-serif italic text-[#0D3823] font-medium">
          Partager — Soutenir — Rassembler
        </div>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          Pendant le mois saint de Ramadan, l'ASJY déploie une grande campagne solidaire de distribution de kits de rupture de jeûne aux fidèles, passants et usagers de la route.
        </p>
      </div>

      {/* Crucial Decentralization Notice Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0D3823] via-[#145334] to-[#0A291A] text-white border border-[#D4AF37]/40 shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-widest">
          <MapPin className="w-4 h-4" />
          <span>Présence Nationale Multisites</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Une initiative solidaire déployée dans toutes les régions actives
        </h2>
        <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-3xl">
          Conformément aux principes de l'Association Andeu Setal Jummah Yi, les distributions de Ndogou ne sont <strong>en aucun cas limitées à Dakar</strong>. Chaque section régionale (Thiès, Diourbel, Fatick) organise ses propres distributions aux portes des mosquées et sur les grands axes de sa localité.
        </p>
      </div>

      {/* Composition d'un Kit Ndogou */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#0D3823]/10 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D3823]">
            Contenu Solidaire
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#19241C]">
            La Composition d'un Kit Ndogou ASJY
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Chaque panier individuel est confectionné avec soin et hygiène par nos bénévoles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-gray-200 text-center space-y-2">
            <span className="text-3xl block">🌴</span>
            <h4 className="font-bold text-base text-[#0D3823]">Dattes Fraîches</h4>
            <p className="text-xs text-gray-600">
              Conformes à la tradition prophétique (Sunnah) pour rompre le jeûne avec énergie et douceur.
            </p>
          </div>

          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-gray-200 text-center space-y-2">
            <span className="text-3xl block">🥖</span>
            <h4 className="font-bold text-base text-[#0D3823]">Pain Frais & Garnitures</h4>
            <p className="text-xs text-gray-600">
              Demi-baguette de pain frais accompagnée de fromage, chocolat ou pâté pour nourrir convenablement.
            </p>
          </div>

          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-gray-200 text-center space-y-2">
            <span className="text-3xl block">☕</span>
            <h4 className="font-bold text-base text-[#0D3823]">Café Touba & Thé Chaud</h4>
            <p className="text-xs text-gray-600">
              Boisson chaude aromatisée au djar (poivre de Selim) préparée dans de grands thermos thermiques.
            </p>
          </div>

          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-gray-200 text-center space-y-2">
            <span className="text-3xl block">💧</span>
            <h4 className="font-bold text-base text-[#0D3823]">Eau Fraîche & Boisson</h4>
            <p className="text-xs text-gray-600">
              Bouteilles ou sachets d'eau minérale propre et jus locaux (Bissap/Bouye) pour une hydratation immédiate.
            </p>
          </div>
        </div>
      </div>

      {/* Les Objectifs de la Campagne Ndogou */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#0D3823]/10 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#0D3823]/10 text-[#0D3823] flex items-center justify-center font-bold">
            1
          </div>
          <h4 className="font-bold text-base text-[#0D3823]">Secourir les Passants</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Permettre aux chauffeurs de transports publics, passagers bloqués dans les embouteillages et travailleurs de rompre le jeûne à l'heure exacte.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#0D3823]/10 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#0D3823]/10 text-[#0D3823] flex items-center justify-center font-bold">
            2
          </div>
          <h4 className="font-bold text-base text-[#0D3823]">Renforcer la Fraternité</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Créer un moment d'échange chaleureux sur les parvis des mosquées entre les jeunes bénévoles et les fidèles du quartier.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#0D3823]/10 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#0D3823]/10 text-[#0D3823] flex items-center justify-center font-bold">
            3
          </div>
          <h4 className="font-bold text-base text-[#0D3823]">Multiplier les Récompenses</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Offrir à chacun, membre ou donateur, la possibilité de nourrir un jeûneur, un acte hautement valorisé par notre foi musulmane.
          </p>
        </div>
      </div>

      {/* CTA Soutenir la campagne Ndogou */}
      <div className="p-8 rounded-3xl bg-[#FAF9F5] border border-[#0D3823]/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-[#0D3823]">
            Vous souhaitez parrainer des kits Ndogou pour le prochain Ramadan ?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Contactez notre responsable des actions sociales pour participer en nature ou par contribution financière.
          </p>
        </div>

        <button
          onClick={() => onNavigate('soutenir')}
          className="px-6 py-3 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-sm flex items-center gap-2"
        >
          <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
          <span>Soutenir les opérations</span>
        </button>
      </div>
    </div>
  );
};
