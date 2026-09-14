import React, { useEffect, useState } from 'react';
import { PageId } from '../types';
import { SECTIONS_DATA } from '../data/content';
import {
  BarChart3,
  Building2,
  Users,
  MapPin,
  Calendar,
  CheckCircle,
  TrendingUp,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface ImpactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ onNavigate }) => {
  // Aggregate data strictly from verified section records
  const totalMosques = SECTIONS_DATA.reduce((acc, curr) => acc + curr.mosquesCleaned, 0);
  const totalMembers = SECTIONS_DATA.reduce((acc, curr) => acc + curr.membersCount, 0);
  const totalRegions = SECTIONS_DATA.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="impact-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Bilan & Transparence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
          Notre Impact au Sénégal
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          Les résultats concrets de l'engagement de nos bénévoles sur le terrain depuis 2022, fondés sur les rapports officiels de nos sections régionales.
        </p>
      </div>

      {/* Main KPI Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-[#0D3823]/15 shadow-sm text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#0D3823]/10 text-[#0D3823] flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#0D3823]">
            {totalMosques}+
          </div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#C59B27]">
            Mosquées Entretenues
          </div>
          <p className="text-xs text-gray-500 pt-1">
            Opérations de nettoyage approfondi et réhabilitation de matériels.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#0D3823]/15 shadow-sm text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#0D3823]/10 text-[#0D3823] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#0D3823]">
            {totalMembers}+
          </div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#C59B27]">
            Bénévoles Mobilisés
          </div>
          <p className="text-xs text-gray-500 pt-1">
            Jeunes hommes et femmes engagés dans nos sections régionales.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#0D3823]/15 shadow-sm text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#0D3823]/10 text-[#0D3823] flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#0D3823]">
            {totalRegions}
          </div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#C59B27]">
            Régions Couvertes
          </div>
          <p className="text-xs text-gray-500 pt-1">
            Dakar, Thiès, Diourbel, Fatick.
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
            Rythme Opérationnel
          </div>
          <p className="text-xs text-gray-500 pt-1">
            Chantiers réguliers par quinzaine de dimanche conformément à la Charte C8.
          </p>
        </div>
      </div>

      {/* Regional Impact Breakdown */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#0D3823]/15 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#0D3823]">
              Répartition Territoriale
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#19241C]">
              Chiffres Officiels par Section
            </h3>
          </div>

          <button
            onClick={() => onNavigate('sections')}
            className="text-xs font-bold text-[#0D3823] hover:underline inline-flex items-center gap-1"
          >
            <span>Voir les détails des sections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="pb-3">Section Régionale</th>
                <th className="pb-3">Active Depuis</th>
                <th className="pb-3 text-center">Mosquées Entretenues</th>
                <th className="pb-3 text-center">Membres Inscrits</th>
                <th className="pb-3">Zone Principale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {SECTIONS_DATA.map((sec) => (
                <tr key={sec.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 font-bold text-[#0D3823] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#145334] shrink-0" />
                    <span>{sec.name}</span>
                  </td>
                  <td className="py-3.5">{sec.activeSince}</td>
                  <td className="py-3.5 text-center font-bold text-[#0D3823]">{sec.mosquesCleaned}</td>
                  <td className="py-3.5 text-center font-bold text-[#C59B27]">{sec.membersCount}</td>
                  <td className="py-3.5 text-xs text-gray-500">{sec.communes.slice(0, 3).join(', ')}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Règle de transparence et de fiabilité */}
      <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-gray-200 flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-[#0D3823] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-[#0D3823]">Engagement de Fiabilité et de Transparence</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Conformément aux directives de l'association Andeu Setal Jummah Yi, aucun chiffre n'est embelli ou inventé. Les statistiques présentées reflètent fidèlement les procès-verbaux de chantiers enregistrés auprès des comités de mosquées et du bureau national.
          </p>
        </div>
      </div>
    </div>
  );
};
