import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { OFFICIAL_CONTACT, OFFICIAL_SOCIALS } from '../data/content';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Building,
  CheckCircle2,
  ExternalLink,
  Send,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [activeForm, setActiveForm] = useState<'proposer' | 'message'>('proposer');
  const [phoneCopied, setPhoneCopied] = useState<boolean>(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(OFFICIAL_CONTACT.phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2200);
  };

  // Proposal Form State
  const [mosqueName, setMosqueName] = useState('');
  const [region, setRegion] = useState('Dakar');
  const [address, setAddress] = useState('');
  const [imamContact, setImamContact] = useState('');
  const [needs, setNeeds] = useState('');
  const [proposedSubmitted, setProposedSubmitted] = useState(false);

  // General Message State
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [messageSubmitted, setMessageSubmitted] = useState(false);

  const handleProposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProposedSubmitted(true);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSubmitted(true);
  };

  const getProposalWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `As-salamu alaykum. Je souhaite proposer une mosquée pour une opération de nettoyage ASJY :\n\n` +
      `Nom de la mosquée : ${mosqueName}\n` +
      `Région : ${region}\n` +
      `Adresse / Quartier : ${address}\n` +
      `Contact Imam / Gestionnaire : ${imamContact}\n` +
      `Besoins constatés : ${needs}`
    );
    return `https://wa.me/${OFFICIAL_CONTACT.whatsappRaw}?text=${text}`;
  };

  const getGeneralWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `As-salamu alaykum. Message pour l'Association Andeu Setal Jummah Yi :\n\n` +
      `De la part de : ${senderName}\n` +
      `Téléphone : ${senderPhone}\n\n` +
      `Message :\n${senderMessage}`
    );
    return `https://wa.me/${OFFICIAL_CONTACT.whatsappRaw}?text=${text}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="contact-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>Échanger Avec Nous</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
          Contact & Proposition de Mosquée
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          Que vous souhaitiez proposer un lieu de culte nécessitant une intervention, solliciter un partenariat ou échanger avec le bureau national, notre équipe reste à votre entière disposition.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form Area */}
        <div className="lg:col-span-7 space-y-6">
          {/* Form Switcher */}
          <div className="flex p-1.5 bg-[#F0EFEA] rounded-2xl border border-[#0D3823]/10">
            <button
              onClick={() => setActiveForm('proposer')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeForm === 'proposer'
                  ? 'bg-[#0D3823] text-white shadow'
                  : 'text-gray-700 hover:bg-white hover:text-[#0D3823]'
              }`}
            >
              <Building className="w-4 h-4 text-[#D4AF37]" />
              <span>Proposer une Mosquée</span>
            </button>

            <button
              onClick={() => setActiveForm('message')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeForm === 'message'
                  ? 'bg-[#0D3823] text-white shadow'
                  : 'text-gray-700 hover:bg-white hover:text-[#0D3823]'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              <span>Message Général</span>
            </button>
          </div>

          {/* Form 1: Proposer une mosquée */}
          {activeForm === 'proposer' && (
            <div className="bg-white rounded-3xl p-8 border border-[#0D3823]/15 shadow-sm space-y-6 animate-fade-in">
              {proposedSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0D3823] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-[#145334]" />
                  </div>
                  <h3 className="text-2xl font-black text-[#0D3823]">
                    Fiche de proposition enregistrée !
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    La proposition pour la <strong>{mosqueName}</strong> ({region}) a bien été préparée. Veuillez finaliser l'envoi au coordinateur pour planifier la visite préparatoire.
                  </p>

                  <div className="pt-2 space-y-3 max-w-md mx-auto">
                    <a
                      href={getProposalWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Transmettre la proposition sur WhatsApp</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => setProposedSubmitted(false)}
                      className="text-xs text-gray-500 hover:text-gray-800 underline"
                    >
                      Proposer une autre mosquée
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleProposeSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <h3 className="text-lg font-black text-[#19241C]">
                      Fiche de Recensement de Mosquée
                    </h3>
                    <p className="text-xs text-gray-500">
                      Remplissez ce formulaire pour soumettre un lieu de prière aux commissions régionales de chantiers.
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Nom de la Mosquée *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Grande Mosquée de Diourbel / Mosquée Al-Rahma"
                      value={mosqueName}
                      onChange={(e) => setMosqueName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Région *
                      </label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none bg-white font-medium"
                      >
                        <option value="Dakar">Dakar</option>
                        <option value="Thiès">Thiès</option>
                        <option value="Diourbel">Diourbel / Mbacké</option>
                        <option value="Fatick">Fatick</option>
                        <option value="Autre">Autre région</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Commune / Quartier / Repère *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex : Médina Rue 15 x 18"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Contact de l'Imam ou du Comité de Gestion *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nom et téléphone du responsable de la mosquée"
                      value={imamContact}
                      onChange={(e) => setImamContact(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Besoins constatés *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Précisez l'état des lieux : nettoyage en profondeur des dalles, dépoussiérage des nattes, besoin de bouilloires (satala), réparation des robinets d'ablution, éclairage..."
                      value={needs}
                      onChange={(e) => setNeeds(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    Valider la proposition de mosquée
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Form 2: Message Général */}
          {activeForm === 'message' && (
            <div className="bg-white rounded-3xl p-8 border border-[#0D3823]/15 shadow-sm space-y-6 animate-fade-in">
              {messageSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0D3823] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-[#145334]" />
                  </div>
                  <h3 className="text-2xl font-black text-[#0D3823]">
                    Message prêt à être transmis !
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Merci <strong>{senderName}</strong>. Vous pouvez envoyer directement votre message au secrétariat national de l'ASJY sur WhatsApp.
                  </p>

                  <div className="pt-2 space-y-3 max-w-md mx-auto">
                    <a
                      href={getGeneralWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer sur WhatsApp officiel</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => setMessageSubmitted(false)}
                      className="text-xs text-gray-500 hover:text-gray-800 underline"
                    >
                      Écrire un autre message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleMessageSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <h3 className="text-lg font-black text-[#19241C]">
                      Envoyer un Message au Bureau
                    </h3>
                    <p className="text-xs text-gray-500">
                      Pour toute question administrative, proposition de partenariat ou demande d'information.
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Votre Nom et Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Fatou Diagne"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Votre Numéro de Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: +221 78 000 00 00"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Votre Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Expliquez l'objet de votre prise de contact..."
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    Valider le message
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Right Info Area: Contacts & Official Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF9F5] p-8 rounded-3xl border border-[#0D3823]/15 space-y-6">
            <h3 className="text-xl font-black text-[#0D3823]">
              Coordonnées Officielles
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0D3823] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#19241C]">Siège National :</div>
                  <div>Dakar, Sénégal</div>
                  <div className="text-xs text-gray-500">Présence et coordinations régionales</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#0D3823] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#19241C]">Numéro Officiel Unique :</div>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <a
                      href={`tel:${OFFICIAL_CONTACT.phoneRaw}`}
                      className="font-mono font-bold text-lg text-[#0D3823] hover:text-[#145334] hover:underline"
                      title="Lancer un appel téléphonique"
                    >
                      {OFFICIAL_CONTACT.phone}
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className="relative inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#0D3823]/10 hover:bg-[#0D3823]/20 text-[#0D3823] border border-[#0D3823]/20 transition-all active:scale-95 cursor-pointer"
                      title="Copier le numéro de téléphone"
                      aria-label="Copier le numéro de téléphone"
                    >
                      <AnimatePresence mode="wait">
                        {phoneCopied ? (
                          <motion.span
                            key="copied"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.18 }}
                            className="inline-flex items-center gap-1 text-emerald-700 font-extrabold"
                          >
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copié !</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.18 }}
                            className="inline-flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copier</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Appels directs, WhatsApp, Wave & Orange Money
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#0D3823] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#19241C]">Courriel Officiel :</div>
                  <a
                    href={`mailto:${OFFICIAL_CONTACT.email}`}
                    className="hover:underline text-[#0D3823] font-semibold"
                  >
                    {OFFICIAL_CONTACT.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons: Appeler, WhatsApp, Soutenir */}
            <div className="pt-2 space-y-2.5">
              <a
                href={`tel:${OFFICIAL_CONTACT.phoneRaw}`}
                className="w-full py-3 px-4 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
                id="btn-call-official"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Appeler : {OFFICIAL_CONTACT.phone}</span>
              </a>

              <a
                href={`https://wa.me/${OFFICIAL_CONTACT.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
                id="btn-whatsapp-official"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contacter sur WhatsApp</span>
              </a>

              <button
                onClick={() => onNavigate('soutenir')}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F0EFEA] border border-[#0D3823]/30 text-[#0D3823] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                id="btn-soutenir-from-contact"
              >
                <span>Nous Soutenir (Wave & Orange Money)</span>
              </button>
            </div>

            {/* Social channels cards */}
            <div className="pt-4 border-t border-[#0D3823]/10 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-600">
                Réseaux Sociaux Officiels :
              </div>

              <div className="space-y-2">
                <a
                  href={OFFICIAL_SOCIALS.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-red-50 border border-gray-200 transition-colors group"
                >
                  <span className="font-bold text-gray-800 text-xs flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                    <span>YouTube : {OFFICIAL_SOCIALS.youtube.handle}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-600" />
                </a>

                <a
                  href={OFFICIAL_SOCIALS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-pink-50 border border-gray-200 transition-colors group"
                >
                  <span className="font-bold text-gray-800 text-xs flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-600" />
                    <span>Instagram : {OFFICIAL_SOCIALS.instagram.handle}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-pink-600" />
                </a>

                <a
                  href={OFFICIAL_SOCIALS.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 transition-colors group"
                >
                  <span className="font-bold text-gray-800 text-xs flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-black" />
                    <span>TikTok : {OFFICIAL_SOCIALS.tiktok.handle}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-black" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
