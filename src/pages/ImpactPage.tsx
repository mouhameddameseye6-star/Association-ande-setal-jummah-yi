import React from 'react';
import { PageId } from '../types';
import { SECTIONS_DATA } from '../data/content';
import {
  BarChart3,
  Building2,
  Users,
  MapPin,
  Calendar,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  ScrollText,
  DollarSign
} from 'lucide-react';

interface ImpactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="impact-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Organisation & Présence Officielle</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
          Notre Présence au Sénégal
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          Les repères officiels et organisationnels de l'Association Andeu Setal Jummah Yi, fondés sur nos statuts et la mobilisation de la jeunesse musulmane.
        </p>
      </div>

      {/* Verified Official Facts & Milestones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-[#0D3823]/15 shadow-sm text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#0D3823]/10 text-[#0D3823] flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#0D3823]">
            2022
          </div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#C59B27]">
            Fondation Officielle
          </div>
          <p className="text-xs text-gray-500 pt-1">
            Création de l'association et adoption du slogan « Jeff té YALLA rek takh ».
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#0D3823]/15 shadow-sm text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#0D3823]/10 text-[#0D3823] flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#0D3823]">
            {SECTIONS_DATA.length}
          </div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#C59B27]">
            Sections Régionales
          </div>
          <p className="text-xs text-gray-500 pt-1">
            Sections actives à Dakar, Thiès, Diourbel/Mbacké et Fatick.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#0D3823]/15 shadow-sm text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#0D3823]/10 text-[#0D3823] flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#0D3823]">
            2x / mois
          </div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#C59B27]">
            Rythme par Quinzaine
          </div>
          <p className="text-xs text-gray-500 pt-1">
            Chantiers réguliers par quinzaine de dimanche conformément à la Charte C8.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#0D3823]/15 shadow-sm text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#0D3823]/10 text-[#0D3823] flex items-center justify-center">
            <ScrollText className="w-6 h-6" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#0D3823]">
            8
          </div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#C59B27]">
            Chartes Officielles
          </div>
          <p className="text-xs text-gray-500 pt-1">
            Règles d'or régissant la neutralité politique, la pudeur et l'engagement.
          </p>
        </div>
      </div>

      {/* Regional Sections Breakdown */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#0D3823]/15 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#0D3823]">
              Répartition Territoriale
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#19241C]">
              Les Sections Régionales ASJY
            </h3>
          </div>

          <button
            onClick={() => onNavigate('sections')}
            className="text-xs font-bold text-[#0D3823] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Voir la carte détaillée des sections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="pb-3">Section Régionale</th>
                <th className="pb-3">Région</th>
                <th className="pb-3">Active Depuis</th>
                <th className="pb-3 text-center">Statut</th>
                <th className="pb-3">Zones & Communes d'intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {SECTIONS_DATA.map((sec) => (
                <tr key={sec.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 font-bold text-[#0D3823] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#145334] shrink-0" />
                    <span>{sec.name}</span>
                  </td>
                  <td className="py-3.5 font-semibold text-gray-700">{sec.region}</td>
                  <td className="py-3.5 text-gray-600">{sec.activeSince}</td>
                  <td className="py-3.5 text-center">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  </td>
                  <td className="py-3.5 text-xs text-gray-600">{sec.communes.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Règle de transparence et de fidélité */}
      <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-gray-200 flex items-start gap-4">
        <ShieldCheck className="w-5 h-5 text-[#0D3823] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-[#0D3823]">Engagement de Sincérité et de Loyauté</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Fidèle à son slogan « Jeff té YALLA rek takh », l'Association Andeu Setal Jummah Yi s'interdit toute ostentation et tout chiffre artificiel. Les informations présentées correspondent exclusivement à la réalité officielle de nos activités de terrain.
          </p>
        </div>
      </div>
    </div>
  );
};
