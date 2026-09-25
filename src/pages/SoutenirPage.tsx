import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { DONATION_OPTIONS, OFFICIAL_CONTACT } from '../data/content';
import {
  Heart,
  CreditCard,
  Phone,
  Package,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Calculator,
  ArrowRight
} from 'lucide-react';

interface SoutenirPageProps {
  onNavigate: (page: PageId) => void;
}

export const SoutenirPage: React.FC<SoutenirPageProps> = ({ onNavigate }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(2500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'financier' | 'nature' | 'parrainage'>('financier');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getImpactDescription = (amount: number) => {
    if (amount <= 0) return "Chaque contribution, quel que soit son montant, soutient directement l'achat de matériel d'entretien et les chantiers dans les mosquées.";
    if (amount < 1000) return "Permet d'acheter des éponges, sacs poubelles renforcés et produits d'entretien immédiats.";
    if (amount < 2500) return "Permet d'acheter 2 bouilloires (satala) neuves et un flacon de désinfectant concentré.";
    if (amount < 7500) return "Permet d'équiper une mosquée en balais professionnels, raclettes de sol et 5 bouilloires neuves.";
    if (amount < 15000) return "Finance l'ensemble des détergents, javels et désinfectants pour un grand nettoyage de mosquée.";
    if (amount < 35000) return "Finance le renouvellement de rouleaux de nattes de prière et le remplacement de projecteurs LED.";
    return "Finance l'intervention intégrale : nettoyage, plomberie d'ablution, réfection électrique et don d'équipement complet.";
  };

  const currentAmount = customAmount ? parseInt(customAmount, 10) || 0 : (selectedAmount || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="soutenir-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          <span>Solidarité & Sadaqa</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
          Soutenir Nos Actions
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          Chaque contribution, qu'elle prenne la forme d'un don financier libre, d'une cotisation membre ou de matériel en nature, va directement au service des mosquées.
        </p>
      </div>

      {/* CLARIFICATION & DISTINCTION : Cotisation Membre vs Faire un Don */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="distinction-cotisation-don">
        {/* Card 1: Cotisation Membre */}
        <div className="bg-white dark:bg-[#0f1f17] rounded-3xl p-6 sm:p-8 border-2 border-[#0D3823]/20 dark:border-[#D4AF37]/30 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 dark:bg-[#1E4D34] text-xs font-bold text-[#0D3823] dark:text-[#D4AF37] uppercase tracking-wider">
              <span>Membres de l'Association</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#19241C] dark:text-white">
              Cotisation Membre
            </h3>
            <div className="text-3xl font-black text-[#0D3823] dark:text-[#D4AF37]">
              1 000 FCFA <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">/ mois</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              La cotisation des membres de l’Association Andeu Setal Jummah Yi est de <strong>1 000 FCFA par mois</strong>. Cette somme concerne <strong>uniquement les membres de l’association</strong> pour assurer le renouvellement régulier du matériel et l'autonomie des chantiers.
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">
              Elle ne doit pas être présentée comme un montant obligatoire pour les personnes extérieures qui souhaitent simplement soutenir l’association.
            </p>
          </div>
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => onNavigate('rejoindre')}
              className="w-full py-2.5 rounded-xl bg-white dark:bg-[#13261c] border border-[#0D3823]/30 text-[#0D3823] dark:text-[#D4AF37] font-bold text-xs uppercase tracking-wider hover:bg-[#FAF9F5] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Adhérer comme membre (Charte C4)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Faire un Don */}
        <div className="bg-white dark:bg-[#0f1f17] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/60 shadow-sm flex flex-col justify-between space-y-4 ring-1 ring-[#D4AF37]/30">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-xs font-bold text-[#8c6b12] dark:text-[#D4AF37] uppercase tracking-wider">
              <span>Soutien Extérieur & Bienfaiteurs</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#19241C] dark:text-white">
              Faire un Don
            </h3>
            <div className="text-3xl font-black text-[#D4AF37]">
              Montant Libre
            </div>
            <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-semibold">
              « Vous souhaitez soutenir les actions de l’Association Andeu Setal Jummah Yi ? Vous pouvez faire un don du montant de votre choix. Chaque contribution contribue à soutenir nos actions. »
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">
              Pour les personnes qui souhaitent soutenir ASJY sans être membres, le montant du don est totalement libre. Chaque personne peut contribuer avec la somme de son choix. Il n’y a aucun montant minimum obligatoire pour faire un don.
            </p>
          </div>
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => {
                setActiveTab('financier');
                const el = document.getElementById('section-don-financier');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2.5 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Choisir mon don libre</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slogan Sadaqa Jariya */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0D3823] via-[#145334] to-[#0A291A] text-white border border-[#D4AF37]/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37]">
            Une Aumône Continue (Sadaqa Jariya)
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
            « Quiconque construit ou entretient une mosquée pour Allah... »
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
            ...Allah lui construira une demeure au Paradis. Participez à l'entretien de ces édifices sacrés où résonnent chaque jour les louanges du Très-Haut.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 text-center shrink-0">
          <div className="text-xl font-extrabold text-[#D4AF37]">Montant Libre</div>
          <div className="text-xs text-white">Sans aucun minimum obligatoire</div>
        </div>
      </div>

      {/* Support Type Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#F0EFEA] rounded-2xl border border-[#0D3823]/10">
        <button
          onClick={() => setActiveTab('financier')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
            activeTab === 'financier'
              ? 'bg-[#0D3823] text-white shadow-md'
              : 'text-gray-700 hover:bg-white hover:text-[#0D3823]'
          }`}
        >
          <CreditCard className="w-4 h-4 text-[#D4AF37]" />
          <span>Faire un Don Libre</span>
        </button>

        <button
          onClick={() => setActiveTab('nature')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
            activeTab === 'nature'
              ? 'bg-[#0D3823] text-white shadow-md'
              : 'text-gray-700 hover:bg-white hover:text-[#0D3823]'
          }`}
        >
          <Package className="w-4 h-4 text-[#D4AF37]" />
          <span>Dons en Nature & Matériel</span>
        </button>

        <button
          onClick={() => setActiveTab('parrainage')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
            activeTab === 'parrainage'
              ? 'bg-[#0D3823] text-white shadow-md'
              : 'text-gray-700 hover:bg-white hover:text-[#0D3823]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Parrainer une Opération</span>
        </button>
      </div>

      {/* 1. DON FINANCIER LIBRE & CALCULATEUR D'IMPACT */}
      {activeTab === 'financier' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fade-in" id="section-don-financier">
          {/* Amount selection */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[#0D3823]/15 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0D3823] bg-[#0D3823]/10 px-3 py-1 rounded-full">
                Don Totalement Libre
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#19241C] leading-snug">
                « Vous souhaitez soutenir les actions de l’Association Andeu Setal Jummah Yi ? Vous pouvez faire un don du montant de votre choix. Chaque contribution contribue à soutenir nos actions. »
              </h3>
              <p className="text-xs text-gray-500">
                Les montants ci-dessous sont <strong>uniquement des suggestions</strong>. Vous pouvez toujours saisir un montant différent selon vos moyens :
              </p>
            </div>

            {/* Suggestions buttons: 500, 1000, 2500, 5000, 10000, Autre montant */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[500, 1000, 2500, 5000, 10000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-3 px-4 rounded-xl text-center border font-bold transition-all cursor-pointer ${
                    currentAmount === amt && !customAmount
                      ? 'bg-[#0D3823] text-white border-[#0D3823] shadow'
                      : 'bg-[#FAF9F5] text-gray-800 border-gray-200 hover:border-[#0D3823]/40'
                  }`}
                >
                  <div className="text-base">{amt.toLocaleString('fr-FR')} FCFA</div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 font-normal">Suggestion</div>
                </button>
              ))}

              {/* Autre montant button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedAmount(null);
                  const inputEl = document.getElementById('input-custom-amount');
                  if (inputEl) inputEl.focus();
                }}
                className={`py-3 px-4 rounded-xl text-center border font-bold transition-all cursor-pointer ${
                  customAmount || selectedAmount === null
                    ? 'bg-[#D4AF37] text-[#0A291A] border-[#D4AF37] shadow'
                    : 'bg-[#FAF9F5] text-gray-800 border-gray-200 hover:border-[#D4AF37]/50'
                }`}
              >
                <div className="text-base">Autre montant</div>
                <div className="text-[10px] opacity-75 font-normal">Montant libre</div>
              </button>
            </div>

            <div>
              <label htmlFor="input-custom-amount" className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Saisir librement le montant de votre don (FCFA) :
              </label>
              <div className="relative">
                <input
                  id="input-custom-amount"
                  type="number"
                  min="1"
                  placeholder="Ex : 500, 1 500, 3 000, 15 000..."
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full p-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none text-base font-bold text-gray-900 bg-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-gray-400">
                  FCFA
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Aucun montant minimum obligatoire. Chaque somme donnée avec sincérité est précieuse.
              </p>
            </div>

            {/* Impact indicator */}
            <div className="p-5 rounded-2xl bg-[#F4F8F5] border border-[#0D3823]/20 space-y-2">
              <div className="text-xs font-extrabold text-[#0D3823] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {currentAmount > 0
                    ? `Impact concret estimé pour ${currentAmount.toLocaleString('fr-FR')} FCFA :`
                    : "Votre don soutient directement nos actions :"}
                </span>
              </div>
              <p className="text-sm text-gray-800 font-medium leading-relaxed">
                {getImpactDescription(currentAmount)}
              </p>
            </div>
          </div>

          {/* Payment channels */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#19241C]">
                Moyens de Paiement Officiels
              </h3>
              <p className="text-xs text-gray-600">
                Deux numéros officiels au choix pour tous vos transferts d'aumône et cotisations :
              </p>

              {/* Barre de numéros officiels avec copie rapide */}
              <div className="p-4 rounded-2xl bg-[#0D3823] text-white shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div className="text-[11px] uppercase font-bold text-[#D4AF37] tracking-wider">
                    Numéros Officiels ASJY (Wave & Orange Money)
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Numéro 1 */}
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] text-emerald-200 font-medium">Ligne 1 :</div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone1, 'banner-phone1')}
                        className="font-mono font-black text-sm text-white hover:text-[#D4AF37] transition-colors cursor-pointer text-left block"
                        title="Cliquer pour copier"
                      >
                        {OFFICIAL_CONTACT.phone1}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone1, 'banner-phone1')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold transition-all active:scale-95 shrink-0 flex items-center gap-1 cursor-pointer"
                      title="Copier le numéro 77 757 87 89"
                      aria-label="Copier le numéro 77 757 87 89"
                    >
                      <AnimatePresence mode="wait">
                        {copiedKey === 'banner-phone1' ? (
                          <motion.span
                            key="copied"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.18 }}
                            className="inline-flex items-center gap-1 text-emerald-400 font-extrabold text-[11px]"
                          >
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copié</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.18 }}
                            className="inline-flex items-center gap-1 text-[11px]"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copier</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>

                  {/* Numéro 2 */}
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] text-emerald-200 font-medium">Ligne 2 :</div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone2, 'banner-phone2')}
                        className="font-mono font-black text-sm text-white hover:text-[#D4AF37] transition-colors cursor-pointer text-left block"
                        title="Cliquer pour copier"
                      >
                        {OFFICIAL_CONTACT.phone2}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone2, 'banner-phone2')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold transition-all active:scale-95 shrink-0 flex items-center gap-1 cursor-pointer"
                      title="Copier le numéro 76 440 14 41"
                      aria-label="Copier le numéro 76 440 14 41"
                    >
                      <AnimatePresence mode="wait">
                        {copiedKey === 'banner-phone2' ? (
                          <motion.span
                            key="copied"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.18 }}
                            className="inline-flex items-center gap-1 text-emerald-400 font-extrabold text-[11px]"
                          >
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copié</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.18 }}
                            className="inline-flex items-center gap-1 text-[11px]"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copier</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Wave Card */}
            <div className="bg-white p-5 rounded-2xl border-2 border-sky-300 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center font-black text-xs">
                    W
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-gray-900 block">WAVE SÉNÉGAL</span>
                    <span className="text-[11px] text-gray-500">Compte officiel association ASJY</span>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                  0% de frais
                </span>
              </div>

              {/* Ligne 1 Wave */}
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase font-bold text-sky-700 tracking-wider">Numéro Wave 1</div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone1, 'wave1')}
                    className="text-base sm:text-lg font-black text-[#0D3823] font-mono hover:text-sky-700 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                    title="Cliquer pour copier le numéro Wave 1"
                  >
                    <span>{OFFICIAL_CONTACT.phone1}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone1, 'wave1')}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-sky-100 text-sky-800 border border-sky-200 transition-all text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer shrink-0"
                  aria-label="Copier le numéro Wave 1"
                >
                  <AnimatePresence mode="wait">
                    {copiedKey === 'wave1' ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                        className="inline-flex items-center gap-1 text-emerald-600 font-extrabold text-[11px]"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copié !</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                        className="inline-flex items-center gap-1 text-[11px]"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Ligne 2 Wave */}
              <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase font-bold text-sky-700 tracking-wider">Numéro Wave 2</div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone2, 'wave2')}
                    className="text-base sm:text-lg font-black text-[#0D3823] font-mono hover:text-sky-700 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                    title="Cliquer pour copier le numéro Wave 2"
                  >
                    <span>{OFFICIAL_CONTACT.phone2}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone2, 'wave2')}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-sky-100 text-sky-800 border border-sky-200 transition-all text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer shrink-0"
                  aria-label="Copier le numéro Wave 2"
                >
                  <AnimatePresence mode="wait">
                    {copiedKey === 'wave2' ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                        className="inline-flex items-center gap-1 text-emerald-600 font-extrabold text-[11px]"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copié !</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                        className="inline-flex items-center gap-1 text-[11px]"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Ouvrez Wave et envoyez vers le <strong>{OFFICIAL_CONTACT.phone1}</strong> ou le <strong>{OFFICIAL_CONTACT.phone2}</strong></span>
              </div>
            </div>

            {/* Orange Money Card */}
            <div className="bg-white p-5 rounded-2xl border-2 border-orange-300 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#FF7900] text-white flex items-center justify-center font-black text-xs">
                    OM
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-gray-900 block">ORANGE MONEY</span>
                    <span className="text-[11px] text-gray-500">Trésorerie nationale officielle</span>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                  Sécurisé
                </span>
              </div>

              {/* Ligne 1 OM */}
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase font-bold text-orange-700 tracking-wider">Numéro Orange Money 1</div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone1, 'om1')}
                    className="text-base sm:text-lg font-black text-[#0D3823] font-mono hover:text-[#FF7900] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                    title="Cliquer pour copier le numéro Orange Money 1"
                  >
                    <span>{OFFICIAL_CONTACT.phone1}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone1, 'om1')}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-orange-100 text-orange-800 border border-orange-200 transition-all text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer shrink-0"
                  aria-label="Copier le numéro Orange Money 1"
                >
                  <AnimatePresence mode="wait">
                    {copiedKey === 'om1' ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                        className="inline-flex items-center gap-1 text-emerald-600 font-extrabold text-[11px]"
                      >
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Copié !</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                        className="inline-flex items-center gap-1 text-[11px]"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copier</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Ligne 2 OM */}
              <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-100 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase font-bold text-orange-700 tracking-wider">Numéro Orange Money 2</div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone2, 'om2')}
                    className="text-base sm:text-lg font-black text-[#0D3823] font-mono hover:text-[#FF7900] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                    title="Cliquer pour copier le numéro Orange Money 2"
                  >
                    <span>{OFFICIAL_CONTACT.phone2}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone2, 'om2')}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-orange-100 text-orange-800 border border-orange-200 transition-all text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer shrink-0"
                  aria-label="Copier le numéro Orange Money 2"
                >
                  <AnimatePresence mode="wait">
                    {copiedKey === 'om2' ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                        className="inline-flex items-center gap-1 text-emerald-600 font-extrabold text-[11px]"
                      >
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Copié !</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                        className="inline-flex items-center gap-1 text-[11px]"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copier</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>Tapez <strong>#144#</strong> ou utilisez Maxit vers le <strong>{OFFICIAL_CONTACT.phone1}</strong> ou le <strong>{OFFICIAL_CONTACT.phone2}</strong></span>
              </div>
            </div>

            {/* Direct Action Buttons: Appeler & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${OFFICIAL_CONTACT.phone1Raw}`}
                className="py-3 px-3 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm text-center active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Appeler : {OFFICIAL_CONTACT.phone1}</span>
              </a>

              <a
                href={`https://wa.me/${OFFICIAL_CONTACT.whatsappRaw}?text=${encodeURIComponent("As-salamu alaykum. Je viens d'effectuer un don pour l'association ASJY. Voici ma capture de confirmation :")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm text-center active:scale-95"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirmer sur WhatsApp</span>
              </a>
            </div>

            {/* Notice de transparence */}
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-600 space-y-2">
              <div className="font-bold text-[#0D3823] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#145334]" />
                  <span>Transparence comptable & Reçu</span>
                </div>
              </div>
              <p className="leading-relaxed">
                Après chaque transfert (Wave ou Orange Money vers{' '}
                <button
                  type="button"
                  onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone1, 'notice-phone1')}
                  className="font-bold text-[#0D3823] hover:underline cursor-pointer font-mono inline-flex items-center gap-0.5"
                  title="Cliquer pour copier"
                >
                  {OFFICIAL_CONTACT.phone1}
                </button>
                {' '}ou{' '}
                <button
                  type="button"
                  onClick={() => copyToClipboard(OFFICIAL_CONTACT.phone2, 'notice-phone2')}
                  className="font-bold text-[#0D3823] hover:underline cursor-pointer font-mono inline-flex items-center gap-0.5"
                  title="Cliquer pour copier"
                >
                  {OFFICIAL_CONTACT.phone2}
                </button>
                ), envoyez votre capture par WhatsApp afin de recevoir votre accusé de réception et votre reçu de sadaqa.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. DONS EN NATURE */}
      {activeTab === 'nature' && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#0D3823]/15 shadow-sm space-y-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-[#0D3823]" />
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#19241C]">
                Matériel & Fournitures Recherchés
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Vous pouvez déposer ou faire livrer directement ces équipements auprès de notre dépôt central ou des coordinateurs régionaux.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-gray-200 space-y-2">
              <h4 className="font-bold text-sm text-[#0D3823]">Matériel de Lavage</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Raclettes professionnelles larges (60cm+)</li>
                <li>• Balais brosse en crin dur</li>
                <li>• Serpillières en microfibre et seaux essoreurs</li>
                <li>• Tuyaux d'arrosage renforcés (50m)</li>
              </ul>
            </div>

            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-gray-200 space-y-2">
              <h4 className="font-bold text-sm text-[#0D3823]">Produits d'Entretien</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Eau de Javel en bidons de 20 litres</li>
                <li>• Détergents désinfectants parfumés</li>
                <li>• Désodorisants d'ambiance pour nefs de prière</li>
                <li>• Poudres à récurer les bacs d'ablution</li>
              </ul>
            </div>

            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-gray-200 space-y-2">
              <h4 className="font-bold text-sm text-[#0D3823]">Équipements & Plomberie</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Bouilloires en plastique rigide (satala)</li>
                <li>• Robinets quart de tour 15/21</li>
                <li>• Projecteurs et tubes LED lumière du jour</li>
                <li>• Rouleaux de nattes lavables</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-[#0D3823] text-white hover:bg-[#145334] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Organiser un don en nature avec notre équipe
            </button>
          </div>
        </div>
      )}

      {/* 3. PARRAINAGE D'OPÉRATION */}
      {activeTab === 'parrainage' && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#0D3823]/15 shadow-sm space-y-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[#D4AF37]" />
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#19241C]">
                Parrainer l'Intégralité d'un Chantier
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Entreprises, familles, mécènes : prenez en charge les coûts logistiques et matériels d'un nettoyage complet d'une mosquée donnée.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-gray-200 space-y-3">
              <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded bg-[#0D3823]/10 text-[#0D3823]">
                Formule Mosquée de Quartier
              </span>
              <div className="text-2xl font-black text-[#0D3823]">50 000 FCFA</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Prise en charge de tous les produits d'entretien, rafraîchissements pour les 25 bénévoles mobilisés, renouvellement des 15 bouilloires et robinetterie.
              </p>
            </div>

            <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-gray-200 space-y-3">
              <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#0D3823]">
                Formule Grande Mosquée Communale
              </span>
              <div className="text-2xl font-black text-[#0D3823]">100 000 FCFA</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Chantier XXL mobilisant plus de 50 bénévoles : lavage complet esplanades, changement nattes, remise à neuf des blocs sanitaires et sonorisation.
              </p>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-[#0D3823] text-white hover:bg-[#145334] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Échanger avec le président pour un parrainage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
