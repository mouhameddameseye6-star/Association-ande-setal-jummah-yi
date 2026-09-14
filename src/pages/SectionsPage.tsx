import React, { useState } from 'react';
import { PageId, SectionData } from '../types';
import { SenegalMap } from '../components/SenegalMap';
import { SECTIONS_DATA } from '../data/content';
import {
  MapPin,
  Building,
  Users,
  Phone,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface SectionsPageProps {
  onNavigate: (page: PageId) => void;
}

export const SectionsPage: React.FC<SectionsPageProps> = ({ onNavigate }) => {
  const [selectedSection, setSelectedSection] = useState<SectionData>(SECTIONS_DATA[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="sections-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>Réseau National</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
          Nos Sections au Sénégal
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          Née à Dakar en 2022, l'Association Andeu Setal Jummah Yi est active à travers ses sections dynamiques assurant les chantiers bimensuels au plus près des fidèles.
        </p>
      </div>

      {/* Interactive Map Component */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-[#19241C]">
            Carte des Sections Actives
          </h2>
          <span className="text-xs font-semibold text-[#0D3823] bg-[#0D3823]/10 px-3 py-1 rounded-full">
            4 Sections Actives
          </span>
        </div>

        <SenegalMap onSelectSection={(sec) => setSelectedSection(sec)} />
      </div>

      {/* Grid of Regional Sections */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#0D3823]">
            Annuaire Territorial
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#19241C]">
            Nos Sections Régionales ASJY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS_DATA.map((section) => (
            <div
              key={section.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                selectedSection.id === section.id
                  ? 'bg-white border-[#0D3823] shadow-md ring-2 ring-[#0D3823]/20'
                  : 'bg-white border-gray-200 hover:border-[#0D3823]/30 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0D3823]/10 text-[#0D3823]">
                    Depuis {section.activeSince}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">
                    {section.mosquesCleaned} mosquées
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0D3823]">
                  {section.name}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {section.description}
                </p>

                <div className="pt-2">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Communes clés :
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {section.communes.map((c, i) => (
                      <span key={i} className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#0D3823]" />
                  {section.membersCount} bénévoles
                </span>

                <button
                  onClick={() => onNavigate('rejoindre')}
                  className="font-bold text-[#0D3823] hover:underline flex items-center gap-1"
                >
                  <span>Rejoindre</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expansion Notice */}
      <div className="p-8 rounded-3xl bg-[#FAF9F5] border border-[#0D3823]/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-[#0D3823]">
            Vous souhaitez ouvrir une section ASJY dans votre département ?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            L'association encourage la création de nouvelles sections départementales partout au Sénégal sous réserve du respect strict des 8 chartes et de la supervision du bureau national.
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-sm"
        >
          Contacter le bureau national
        </button>
      </div>
    </div>
  );
};
