import React, { useState } from 'react';
import { PageId } from '../types';
import { CHARTES_DATA, CHARTES_CONCLUSION } from '../data/content';
import {
  Shield,
  Search,
  ChevronDown,
  CheckCircle2,
  Scale
} from 'lucide-react';

interface ChartesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ChartesPage: React.FC<ChartesPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCharteId, setOpenCharteId] = useState<string | null>('C1');

  const filteredChartes = CHARTES_DATA.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.fullText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCharte = (id: string) => {
    setOpenCharteId(openCharteId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="chartes-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>Règlement Intérieur</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
          CHARTES de l’ASJY
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          Le socle officiel, moral et organisationnel qui garantit l'harmonie, la discipline et la loyauté au sein de l'Association Andeu Setal Jummah Yi.
        </p>
      </div>

      {/* Slogan & Engagement Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF9F5] border border-[#0D3823]/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#0D3823]">
            Principe Fondateur d'Adhésion
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#19241C]">
            Tout membre s'engage formellement au respect de l'ensemble de ces 8 règles
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            L'ASJY préserve ainsi la sainteté des mosquées, la fraternité entre les membres et la sincérité absolue de nos actions.
          </p>
        </div>

        <div className="text-center md:text-right shrink-0 bg-white p-4 rounded-2xl border border-gray-200">
          <div className="text-2xl font-black text-[#0D3823]">8 / 8</div>
          <div className="text-[11px] font-bold text-gray-500 uppercase">Chartes Officielles</div>
        </div>
      </div>

      {/* Search Input */}
      <div className="max-w-md relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Rechercher une charte (ex: slogan, politique, femmes, 1000 fcfa, whatsapp)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none text-xs sm:text-sm text-gray-800 placeholder-gray-400 shadow-sm"
        />
      </div>

      {/* Accordion of 8 Chartes */}
      <div className="space-y-4">
        {filteredChartes.map((charte) => {
          const isOpen = openCharteId === charte.id;
          return (
            <div
              key={charte.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#0D3823] shadow-md ring-1 ring-[#0D3823]/10'
                  : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleCharte(charte.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-colors ${
                      isOpen
                        ? 'bg-[#0D3823] text-[#D4AF37]'
                        : 'bg-[#FAF9F5] text-[#0D3823] border border-[#0D3823]/20'
                    }`}
                  >
                    {charte.code}
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#19241C]">
                      {charte.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">
                      {charte.summary}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-gray-400 p-1">
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0D3823]' : ''
                    }`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-gray-100 space-y-4 animate-fade-in text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <div className="p-4 rounded-xl bg-[#FAF9F5] border border-gray-200">
                    <p className="whitespace-pre-line font-medium text-gray-800 text-sm leading-relaxed">
                      {charte.fullText}
                    </p>
                  </div>

                  {charte.rules && charte.rules.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      {charte.rules.map((rule, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 rounded-lg bg-white border border-gray-100 text-xs text-gray-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0D3823] shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                    <span className="flex items-center gap-1 font-bold text-[#0D3823]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#145334]" />
                      Charte officielle validée par l'ASJY
                    </span>
                    <span className="font-mono text-gray-400">Règle {charte.code}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Conclusion des Chartes (Remplacement des Sanctions) */}
      <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-[#0D3823]/20 shadow-sm text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0D3823]/10 text-[#0D3823] mx-auto">
          <Shield className="w-6 h-6" />
        </div>
        <h3 className="text-lg sm:text-xl font-black text-[#19241C] uppercase tracking-wide">
          Une Association Juste et Loyale
        </h3>
        <p className="text-sm sm:text-base text-gray-800 max-w-2xl mx-auto leading-relaxed font-semibold italic">
          « {CHARTES_CONCLUSION} »
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-2">
        <button
          onClick={() => onNavigate('rejoindre')}
          className="px-8 py-3.5 rounded-xl bg-[#0D3823] text-white hover:bg-[#145334] text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer active:scale-98"
        >
          <span>J'accepte les chartes et je souhaite adhérer</span>
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
};
