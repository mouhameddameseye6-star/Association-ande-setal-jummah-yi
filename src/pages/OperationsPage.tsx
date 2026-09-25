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
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="operations-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 dark:border-[#D4AF37]/20 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 dark:bg-[#1E4D34] text-xs font-bold text-[#0D3823] dark:text-[#D4AF37] uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Agenda & Chantiers</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] dark:text-white uppercase tracking-tight">
          Opérations de Nettoyage
        </h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
          Conformément à la Charte C8, nos nettoyages se déroulent par <strong>quinzaine de dimanche</strong> (deux fois par mois) de 08h30 à 12h30.
        </p>
      </div>

      {/* Official Rhythm Reminder Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF9F5] dark:bg-[#0c1a13] border border-[#0D3823]/15 dark:border-[#D4AF37]/25 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0D3823] dark:text-[#D4AF37]">
            Règle Officielle (Charte C8)
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#19241C] dark:text-white">
            Rythme Régulier : Quinzaine de Dimanche
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
            Les activités de nettoyage sont organisées tous les 15 jours le dimanche matin (dimanches alternés), afin d'assurer deux nettoyages complets par mois tout en préservant le repos dominical.
          </p>
        </div>

        <button
          onClick={() => onNavigate('chartes')}
          className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#13261c] border border-[#0D3823]/20 dark:border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider text-[#0D3823] dark:text-[#D4AF37] hover:bg-[#F3FAF5] transition-all shrink-0 cursor-pointer shadow-xs"
        >
          Consulter la Charte C8
        </button>
      </div>

      {/* Operations List or Empty State */}
      {filteredOperations.length === 0 ? (
        <div className="bg-white dark:bg-[#0f1f17] rounded-3xl p-10 sm:p-14 border border-dashed border-gray-300 dark:border-gray-700 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0D3823]/10 dark:bg-[#1E4D34] text-[#0D3823] dark:text-[#D4AF37] flex items-center justify-center">
            <Calendar className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#19241C] dark:text-white">
              Aucune opération programmée pour le moment
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
              Les prochaines dates de chantiers réguliers de quinzaine sont coordonnées directement au niveau de chaque section régionale (Dakar, Thiès, Diourbel/Mbacké, Fatick).
            </p>
          </div>
          <div className="pt-2 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => onNavigate('rejoindre')}
              className="px-6 py-2.5 rounded-xl bg-[#0D3823] text-white hover:bg-[#145334] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
            >
              Rejoindre l'ASJY
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-2.5 rounded-xl bg-white dark:bg-[#14261d] border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Proposer une mosquée
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOperations.map((op) => {
            const isUpcoming = op.status === 'upcoming';
            const isJoined = joinedOperationId === op.id;

            return (
              <div
                key={op.id}
                className="bg-white dark:bg-[#0f1f17] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-[#1E4D34]/40"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <h3 className="text-xl sm:text-2xl font-black text-[#19241C] dark:text-white">
                      {op.mosqueName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {op.description}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#0D3823] dark:text-[#D4AF37]" />
                        <span>{op.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#0D3823] dark:text-[#D4AF37]" />
                        <span>{op.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#0D3823] dark:text-[#D4AF37]" />
                        <span>{op.location} ({op.region})</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={() => handleJoin(op.id)}
                      className="px-6 py-3 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {isJoined ? 'Inscrit' : 'Participer'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Proposer la prochaine mosquée */}
      <div className="p-8 rounded-3xl bg-[#FAF9F5] dark:bg-[#0d1b14] border border-[#0D3823]/20 dark:border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-[#0D3823] dark:text-[#D4AF37]">
            Vous êtes membre d'un comité de mosquée ?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
            Proposez votre mosquée pour notre prochaine quinzaine de nettoyage. La coordination examinera la demande avec bienveillance.
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 rounded-xl bg-[#0D3823] hover:bg-[#145334] dark:bg-[#1E4D34] dark:hover:bg-[#276343] text-white text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-sm cursor-pointer"
        >
          Proposer une mosquée
        </button>
      </div>
    </div>
  );
};
