import React, { useState } from 'react';
import { PageId } from '../types';
import { TIMELINE_MILESTONES } from '../data/content';
import { History, Calendar, Sparkles, ArrowRight, Quote, CheckCircle2 } from 'lucide-react';

interface HistoirePageProps {
  onNavigate: (page: PageId) => void;
}

export const HistoirePage: React.FC<HistoirePageProps> = ({ onNavigate }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="histoire-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
          <History className="w-3.5 h-3.5" />
          <span>Notre Parcours</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
          L'Origine & L'Histoire de l'ASJY
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          De l'initiative bénévole de trois jeunes dans une mosquée de quartier en 2021 jusqu'à un réseau structuré de sections dans tout le Sénégal.
        </p>
      </div>

      {/* Slogan Citation */}
      <div className="p-8 rounded-3xl bg-white border border-[#0D3823]/15 shadow-sm relative overflow-hidden">
        <div className="absolute top-4 right-6 text-7xl font-serif text-[#0D3823]/5 select-none pointer-events-none">
          “
        </div>
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#0D3823]">
            Le Constat Initial (2021)
          </span>
          <p className="text-base sm:text-lg text-gray-800 italic leading-relaxed">
            « Trois jeunes effectuaient régulièrement des opérations de nettoyage dans la mosquée de leur quartier. Ils ont constaté que l'entretien des mosquées reposait souvent principalement sur des personnes âgées et qu'il existait peu d'initiatives permettant aux jeunes de contribuer activement à cette mission noble. »
          </p>
        </div>
      </div>

      {/* Interactive Timeline */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D3823]">
            Évolution Chronologique
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19241C]">
            De 2021 à Aujourd'hui
          </h2>
        </div>

        {/* Year Pills Navigation */}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-4">
          {TIMELINE_MILESTONES.map((m, idx) => (
            <button
              key={m.year}
              onClick={() => setSelectedMilestone(idx)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                selectedMilestone === idx
                  ? 'bg-[#0D3823] text-white shadow-md scale-105'
                  : 'bg-white text-gray-700 border border-[#0D3823]/20 hover:bg-[#F0EFEA]'
              }`}
            >
              {m.year}
            </button>
          ))}
        </div>

        {/* Highlighted Milestone Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#0D3823]/15 shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#0D3823] text-xs font-extrabold uppercase tracking-wider">
                {TIMELINE_MILESTONES[selectedMilestone].badge}
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-[#0D3823] mt-2">
                {TIMELINE_MILESTONES[selectedMilestone].year} — {TIMELINE_MILESTONES[selectedMilestone].title}
              </h3>
            </div>
            <div className="text-3xl sm:text-5xl font-black text-gray-200">
              0{selectedMilestone + 1}
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-800 leading-relaxed mb-6">
            {TIMELINE_MILESTONES[selectedMilestone].description}
          </p>

          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#D4AF37]/30 flex items-center gap-3">
            <Quote className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <span className="text-sm font-serif italic text-[#0D3823] font-semibold">
              {TIMELINE_MILESTONES[selectedMilestone].quote}
            </span>
          </div>
        </div>

        {/* Full Vertical Roadmap / Timeline Details */}
        <div className="relative pl-6 sm:pl-10 space-y-12 border-l-2 border-[#0D3823]/30 ml-4 sm:ml-8 mt-12">
          {TIMELINE_MILESTONES.map((milestone, i) => (
            <div key={milestone.year} className="relative group">
              {/* Marker pin */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 rounded-full border-4 border-white transition-transform ${
                  selectedMilestone === i
                    ? 'bg-[#D4AF37] scale-125 shadow'
                    : 'bg-[#0D3823]'
                }`}
              />

              <div
                onClick={() => setSelectedMilestone(i)}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#0D3823]/40 shadow-sm cursor-pointer transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-black text-[#0D3823] uppercase tracking-wider">
                    {milestone.year}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    {milestone.badge}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[#19241C] mb-2">
                  {milestone.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8">
        <button
          onClick={() => onNavigate('sections')}
          className="px-8 py-3.5 rounded-xl bg-[#0D3823] text-white hover:bg-[#145334] text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
        >
          <span>Découvrir nos sections à travers le Sénégal</span>
          <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
};
