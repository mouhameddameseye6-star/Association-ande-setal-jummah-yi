import React, { useState } from 'react';
import { PageId, OperationEvent } from '../types';
import { OPERATIONS_DATA } from '../data/content';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Filter,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface OperationsPageProps {
  onNavigate: (page: PageId) => void;
}

export const OperationsPage: React.FC<OperationsPageProps> = ({ onNavigate }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('Toutes');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [joinedOperationId, setJoinedOperationId] = useState<string | null>(null);

  const filteredOperations = OPERATIONS_DATA.filter((op) => {
    const matchesRegion = selectedRegion === 'Toutes' || op.region === selectedRegion;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'upcoming' && op.status === 'upcoming') ||
      (selectedStatus === 'completed' && op.status === 'completed');
    return matchesRegion && matchesStatus;
  });

  const handleJoin = (opId: string) => {
    setJoinedOperationId(opId);
    setTimeout(() => {
      alert("Votre présence a bien été enregistrée pour ce chantier ! Merci pour votre engagement.");
    }, 200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="operations-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Agenda & Chantiers</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
          Prochaines Opérations
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          Conformément à la Charte C8, nos nettoyages se déroulent par <strong>quinzaine de dimanche</strong> (deux fois par mois) de 08h30 à 12h30. Consultez le calendrier et rejoignez l'équipe sur le terrain !
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        {/* Status buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedStatus === 'all'
                ? 'bg-[#0D3823] text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setSelectedStatus('upcoming')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedStatus === 'upcoming'
                ? 'bg-[#0D3823] text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            À venir (Chantiers ouverts)
          </button>
          <button
            onClick={() => setSelectedStatus('completed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedStatus === 'completed'
                ? 'bg-[#0D3823] text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Clôturées récemment
          </button>
        </div>

        {/* Region selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-gray-500 uppercase">Région :</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="p-2 rounded-xl border border-gray-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D3823] bg-white"
          >
            <option value="Toutes">Toutes les Régions</option>
            <option value="Dakar">Dakar</option>
            <option value="Thiès">Thiès</option>
            <option value="Diourbel">Diourbel / Mbacké</option>
            <option value="Fatick">Fatick</option>
          </select>
        </div>
      </div>

      {/* Operations List */}
      <div className="space-y-6">
        {filteredOperations.map((op) => {
          const isUpcoming = op.status === 'upcoming';
          const isJoined = joinedOperationId === op.id;

          return (
            <div
              key={op.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all ${
                isUpcoming
                  ? 'border-[#0D3823]/20 shadow-sm hover:border-[#0D3823]/40'
                  : 'border-gray-200 opacity-80'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Left info */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isUpcoming
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isUpcoming ? 'Prochain Chantier' : 'Chantier Réalisé'}
                    </span>

                    <span className="text-xs font-bold text-[#0D3823] bg-[#0D3823]/10 px-2.5 py-0.5 rounded-full">
                      Région {op.region}
                    </span>

                    <span className="text-xs text-gray-500 font-medium">
                      Code : {op.id.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#19241C]">
                    {op.mosqueName}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
                    {op.description}
                  </p>

                  {/* Badges / Logistics */}
                  <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#0D3823]" />
                      <span className="font-semibold">{op.date}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#0D3823]" />
                      <span>{op.time}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#0D3823]" />
                      <span>{op.location} ({op.region})</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#0D3823]" />
                      <span>{op.volunteersRegistered} bénévoles mobilisés</span>
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="shrink-0 flex flex-col items-end gap-2 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                  {isUpcoming ? (
                    <button
                      onClick={() => handleJoin(op.id)}
                      disabled={isJoined}
                      className={`w-full lg:w-auto px-6 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 ${
                        isJoined
                          ? 'bg-emerald-700 text-white cursor-default'
                          : 'bg-[#0D3823] hover:bg-[#145334] text-white active:scale-95'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                      <span>{isJoined ? 'Présence Enregistrée !' : 'Participer à ce chantier'}</span>
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400 font-bold uppercase">
                      Opération terminée avec succès
                    </span>
                  )}

                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-xs text-gray-500 hover:text-[#0D3823] underline"
                  >
                    Demander des informations
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Proposer la prochaine mosquée */}
      <div className="p-8 rounded-3xl bg-[#FAF9F5] border border-[#0D3823]/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-[#0D3823]">
            Vous êtes membre d'un comité de mosquée ?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            Proposez votre mosquée pour notre prochaine quinzaine de nettoyage. Notre commission des chantiers examinera la demande avec bienveillance.
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-sm"
        >
          Remplir la fiche de proposition
        </button>
      </div>
    </div>
  );
};
