import React, { useState } from 'react';
import { SECTIONS_DATA, OFFICIAL_CONTACT } from '../data/content';
import { SectionData } from '../types';
import { SENEGAL_EXACT_PATH, GAMBIA_ENCLAVE_PATH, CITY_COORDINATES } from '../data/senegalExactPath';
import { MapPin, Users, Phone, CheckCircle2, Navigation, Compass } from 'lucide-react';

interface SenegalMapProps {
  onSelectSection?: (section: SectionData) => void;
}

export const SenegalMap: React.FC<SenegalMapProps> = ({ onSelectSection }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>('dakar');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const activeSection = SECTIONS_DATA.find((s) => s.id === selectedSectionId) || SECTIONS_DATA[0];

  const handleSelect = (section: SectionData) => {
    setSelectedSectionId(section.id);
    if (onSelectSection) onSelectSection(section);
  };

  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#0D3823]/10 shadow-sm" id="senegal-interactive-map">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        
        {/* Conteneur Cartographique SVG Haute Fidélité */}
        <div className="w-full lg:w-7/12 relative bg-gradient-to-b from-[#FAF9F5] to-[#F1EFE7] rounded-2xl p-5 border border-[#0D3823]/15 flex flex-col items-center shadow-inner">
          
          {/* En-tête de la carte */}
          <div className="w-full flex items-center justify-between mb-2 text-xs text-[#0D3823] font-bold uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>Carte Géographique Réelle du Sénégal</span>
            </div>
            <span className="text-[11px] bg-[#0D3823] text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold shadow-xs">
              4 Sections Actives
            </span>
          </div>

          <div className="w-full aspect-[4/3] max-h-[460px] relative flex items-center justify-center select-none">
            <svg
              viewBox="0 0 800 650"
              className="w-full h-full drop-shadow-md overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Dégradé doux pour le territoire sénégalais */}
                <linearGradient id="senegalTerrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5F9F6" />
                  <stop offset="60%" stopColor="#E6EFEA" />
                  <stop offset="100%" stopColor="#D9E7DF" />
                </linearGradient>

                {/* Ombre portée pour donner du relief à la carte */}
                <filter id="senegalElevation" x="-5%" y="-5%" width="115%" height="115%">
                  <feDropShadow dx="3" dy="4" stdDeviation="4" floodColor="#0D3823" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* Océan Atlantique (Indicateur à l'Ouest) */}
              <text
                x="50"
                y="180"
                fill="#2B5B7E"
                fontSize="12"
                fontWeight="bold"
                letterSpacing="3"
                opacity="0.55"
                transform="rotate(-90 50 180)"
              >
                OCÉAN ATLANTIQUE
              </text>

              {/* Tracé réel et exact des frontières du Sénégal (conforme à l'image officielle) */}
              <path
                d={SENEGAL_EXACT_PATH}
                fill="url(#senegalTerrainGrad)"
                stroke="#0D3823"
                strokeWidth="3.2"
                strokeLinejoin="round"
                strokeLinecap="round"
                filter="url(#senegalElevation)"
                className="transition-all duration-300"
              />

              {/* Tracé réel de l'enclave de la Gambie */}
              <path
                d={GAMBIA_ENCLAVE_PATH}
                fill="#FFFFFF"
                stroke="#C59B27"
                strokeWidth="1.8"
                strokeDasharray="4 2"
                opacity="0.85"
                className="transition-opacity"
              />
              <text
                x="260"
                y="463"
                fill="#8C7335"
                fontSize="11"
                fontWeight="bold"
                fontFamily="sans-serif"
                fontStyle="italic"
                letterSpacing="1"
              >
                GAMBIE
              </text>

              {/* Repères géographiques indicatifs (villes repères non-sections pour la précision) */}
              {/* Saint-Louis */}
              <g opacity="0.6">
                <circle cx={CITY_COORDINATES.saint_louis.x} cy={CITY_COORDINATES.saint_louis.y} r="3" fill="#6B7280" />
                <text x={CITY_COORDINATES.saint_louis.x + 8} y={CITY_COORDINATES.saint_louis.y + 3} fill="#4B5563" fontSize="10" fontWeight="500">
                  Saint-Louis
                </text>
              </g>

              {/* Tambacounda */}
              <g opacity="0.6">
                <circle cx={CITY_COORDINATES.tambacounda.x} cy={CITY_COORDINATES.tambacounda.y} r="3" fill="#6B7280" />
                <text x={CITY_COORDINATES.tambacounda.x + 8} y={CITY_COORDINATES.tambacounda.y + 4} fill="#4B5563" fontSize="10" fontWeight="500">
                  Tambacounda
                </text>
              </g>

              {/* Ziguinchor (Casamance) */}
              <g opacity="0.6">
                <circle cx={CITY_COORDINATES.ziguinchor.x} cy={CITY_COORDINATES.ziguinchor.y} r="3" fill="#6B7280" />
                <text x={CITY_COORDINATES.ziguinchor.x + 8} y={CITY_COORDINATES.ziguinchor.y + 4} fill="#4B5563" fontSize="10" fontWeight="500">
                  Ziguinchor
                </text>
              </g>

              {/* Points d'ancrage des 4 Sections Actives ASJY */}

              {/* 1. DAKAR (Siège National) */}
              {(() => {
                const isSelected = selectedSectionId === 'dakar';
                const isHovered = hoveredNode === 'dakar';
                const pos = CITY_COORDINATES.dakar;
                return (
                  <g
                    className="cursor-pointer transition-transform"
                    onClick={() => handleSelect(SECTIONS_DATA[0])}
                    onMouseEnter={() => setHoveredNode('dakar')}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Anneau pulsant pour le siège */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '24' : '16'}
                      fill="#0D3823"
                      opacity={isSelected ? '0.2' : '0.08'}
                      className={isSelected ? 'animate-ping' : ''}
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '12' : isHovered ? '11' : '9'}
                      fill={isSelected ? '#0D3823' : '#145334'}
                      stroke="#D4AF37"
                      strokeWidth={isSelected ? '3.5' : '2.5'}
                    />
                    {/* Badge libellé avec fond pour lisibilité parfaite */}
                    <rect
                      x={pos.x - 45}
                      y={pos.y - 36}
                      width="98"
                      height="22"
                      rx="6"
                      fill={isSelected ? '#0D3823' : '#FFFFFF'}
                      stroke={isSelected ? '#D4AF37' : '#0D3823'}
                      strokeWidth="1.5"
                    />
                    <text
                      x={pos.x + 4}
                      y={pos.y - 21}
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#0D3823'}
                      fontWeight="bold"
                      fontSize="11"
                    >
                      Dakar (Siège)
                    </text>
                  </g>
                );
              })()}

              {/* 2. THIÈS */}
              {(() => {
                const isSelected = selectedSectionId === 'thies';
                const isHovered = hoveredNode === 'thies';
                const pos = CITY_COORDINATES.thies;
                return (
                  <g
                    className="cursor-pointer"
                    onClick={() => handleSelect(SECTIONS_DATA[1])}
                    onMouseEnter={() => setHoveredNode('thies')}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '18' : '12'}
                      fill="#0D3823"
                      opacity={isSelected ? '0.2' : '0'}
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '11' : isHovered ? '10' : '8'}
                      fill={isSelected ? '#0D3823' : '#145334'}
                      stroke="#D4AF37"
                      strokeWidth="2.5"
                    />
                    <rect
                      x={pos.x - 22}
                      y={pos.y - 28}
                      width="46"
                      height="18"
                      rx="4"
                      fill={isSelected ? '#0D3823' : '#FFFFFF'}
                      stroke={isSelected ? '#D4AF37' : '#0D3823'}
                      strokeWidth="1"
                    />
                    <text
                      x={pos.x + 1}
                      y={pos.y - 15}
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#0D3823'}
                      fontWeight="bold"
                      fontSize="10"
                    >
                      Thiès
                    </text>
                  </g>
                );
              })()}

              {/* 3. DIOURBEL / MBACKÉ */}
              {(() => {
                const isSelected = selectedSectionId === 'diourbel';
                const isHovered = hoveredNode === 'diourbel';
                const pos = CITY_COORDINATES.diourbel;
                return (
                  <g
                    className="cursor-pointer"
                    onClick={() => handleSelect(SECTIONS_DATA[2])}
                    onMouseEnter={() => setHoveredNode('diourbel')}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '18' : '12'}
                      fill="#0D3823"
                      opacity={isSelected ? '0.2' : '0'}
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '11' : isHovered ? '10' : '8'}
                      fill={isSelected ? '#0D3823' : '#145334'}
                      stroke="#D4AF37"
                      strokeWidth="2.5"
                    />
                    <rect
                      x={pos.x - 48}
                      y={pos.y + 12}
                      width="98"
                      height="19"
                      rx="4"
                      fill={isSelected ? '#0D3823' : '#FFFFFF'}
                      stroke={isSelected ? '#D4AF37' : '#0D3823'}
                      strokeWidth="1"
                    />
                    <text
                      x={pos.x + 1}
                      y={pos.y + 25}
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#0D3823'}
                      fontWeight="bold"
                      fontSize="9.5"
                    >
                      Diourbel / Mbacké
                    </text>
                  </g>
                );
              })()}

              {/* 4. FATICK */}
              {(() => {
                const isSelected = selectedSectionId === 'fatick';
                const isHovered = hoveredNode === 'fatick';
                const pos = CITY_COORDINATES.fatick;
                return (
                  <g
                    className="cursor-pointer"
                    onClick={() => handleSelect(SECTIONS_DATA[3])}
                    onMouseEnter={() => setHoveredNode('fatick')}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '18' : '12'}
                      fill="#0D3823"
                      opacity={isSelected ? '0.2' : '0'}
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '11' : isHovered ? '10' : '8'}
                      fill={isSelected ? '#0D3823' : '#145334'}
                      stroke="#D4AF37"
                      strokeWidth="2.5"
                    />
                    <rect
                      x={pos.x - 26}
                      y={pos.y + 12}
                      width="52"
                      height="18"
                      rx="4"
                      fill={isSelected ? '#0D3823' : '#FFFFFF'}
                      stroke={isSelected ? '#D4AF37' : '#0D3823'}
                      strokeWidth="1"
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 24}
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#0D3823'}
                      fontWeight="bold"
                      fontSize="9.5"
                    >
                      Fatick
                    </text>
                  </g>
                );
              })()}

              {/* Rose des vents stylisée dans le coin supérieur droit */}
              <g transform="translate(710, 80)">
                <circle cx="0" cy="0" r="18" fill="#FFFFFF" stroke="#0D3823" strokeWidth="1.5" opacity="0.9" />
                <path d="M 0 -14 L 4 -2 L 14 0 L 4 2 L 0 14 L -4 2 L -14 0 L -4 -2 Z" fill="#0D3823" />
                <path d="M 0 -14 L 4 -2 L 0 0 Z" fill="#D4AF37" />
                <text x="0" y="-18" textAnchor="middle" fill="#0D3823" fontSize="9" fontWeight="bold">N</text>
              </g>
            </svg>
          </div>

          <p className="text-[11px] text-gray-600 italic mt-2 text-center flex items-center gap-1">
            <Navigation className="w-3 h-3 text-[#0D3823]" />
            <span>Tracé cartographique officiel fidèle aux frontières réelles du Sénégal et de l'enclave gambienne.</span>
          </p>

          {/* Boutons d'accès direct aux 4 sections */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {SECTIONS_DATA.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleSelect(section)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedSectionId === section.id
                    ? 'bg-[#0D3823] text-[#D4AF37] shadow-sm ring-2 ring-[#D4AF37]/50 scale-105'
                    : 'bg-white text-[#19241C] hover:bg-[#E8ECE8] border border-[#0D3823]/20 shadow-2xs'
                }`}
              >
                📍 {section.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Panneau de détails de la section sélectionnée */}
        <div className="w-full lg:w-5/12 flex flex-col justify-between">
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#0D3823]/15 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-[#0D3823] text-[#D4AF37]">
                Section Officielle
              </span>
              <span className="text-xs text-gray-500 font-semibold">
                Active depuis {activeSection.activeSince}
              </span>
            </div>

            <h3 className="text-2xl font-black text-[#0D3823] flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <span>{activeSection.name}</span>
            </h3>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-5">
              {activeSection.description}
            </p>

            {/* Statistiques clés de la section */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white p-3.5 rounded-xl border border-[#0D3823]/10 text-center shadow-2xs">
                <div className="text-2xl font-black text-[#0D3823]">
                  {activeSection.mosquesCleaned}+
                </div>
                <div className="text-[11px] font-bold text-gray-600 uppercase">
                  Mosquées Nettoyées
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-[#0D3823]/10 text-center shadow-2xs">
                <div className="text-2xl font-black text-[#C59B27]">
                  {activeSection.membersCount}+
                </div>
                <div className="text-[11px] font-bold text-gray-600 uppercase">
                  Volontaires Actifs
                </div>
              </div>
            </div>

            {/* Communes et zones d'intervention */}
            <div className="mb-5">
              <div className="text-xs font-bold text-[#0D3823] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#145334]" />
                <span>Zones et Communes Couvertes</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeSection.communes.map((com, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white text-[#19241C] font-medium px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs"
                  >
                    {com}
                  </span>
                ))}
              </div>
            </div>

            {/* Contacts directs de la coordination */}
            <div className="pt-4 border-t border-[#0D3823]/15 flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-gray-600 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-[#0D3823]" />
                  <span>Coordination Nationale ASJY :</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 font-bold text-[#0D3823] font-mono text-sm">
                <a
                  href={`tel:${OFFICIAL_CONTACT.phone1Raw}`}
                  className="hover:text-[#D4AF37] hover:underline flex items-center gap-1"
                  title="Appeler la ligne 1"
                >
                  <span>{OFFICIAL_CONTACT.phone1}</span>
                </a>
                <span className="text-gray-400 font-sans">/</span>
                <a
                  href={`tel:${OFFICIAL_CONTACT.phone2Raw}`}
                  className="hover:text-[#D4AF37] hover:underline flex items-center gap-1"
                  title="Appeler la ligne 2"
                >
                  <span>{OFFICIAL_CONTACT.phone2}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
