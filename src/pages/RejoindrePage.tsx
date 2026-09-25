import React, { useState } from 'react';
import { PageId } from '../types';
import { OFFICIAL_CONTACT } from '../data/content';
import { saveMembershipApplication } from '../services/membershipStorage';
import { usePhotos } from '../context/PhotoContext';
import {
  UserPlus,
  CheckCircle2,
  Phone,
  MessageSquare,
  ShieldCheck,
  Heart,
  Calendar,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MapPin,
  Mail,
  User
} from 'lucide-react';

interface RejoindrePageProps {
  onNavigate: (page: PageId) => void;
}

export const RejoindrePage: React.FC<RejoindrePageProps> = ({ onNavigate }) => {
  const { siteSettings } = usePhotos();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cityRegion, setCityRegion] = useState('');
  const [motivation, setMotivation] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedCandidate, setSubmittedCandidate] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
    cityRegion: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !cityRegion.trim() || !motivation.trim()) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setIsSubmitting(true);
    try {
      await saveMembershipApplication({
        firstName,
        lastName,
        phone,
        email,
        cityRegion,
        motivation
      });

      setSubmittedCandidate({
        firstName,
        lastName,
        phone,
        cityRegion
      });
      setIsSubmitted(true);
      // Reset form
      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setCityRegion('');
      setMotivation('');
    } catch (err) {
      console.error("Erreur enregistrement demande d'adhésion:", err);
      alert("Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppUrl = () => {
    if (!submittedCandidate) return `https://wa.me/${OFFICIAL_CONTACT.whatsappRaw}`;
    const text = encodeURIComponent(
      `As-salamu alaykum. Je souhaite confirmer ma demande d'adhésion à l'Association Andeu Setal Jummah Yi (ASJY).\n\n` +
      `Prénom : ${submittedCandidate.firstName}\n` +
      `Nom : ${submittedCandidate.lastName}\n` +
      `Téléphone : ${submittedCandidate.phone}\n` +
      `Région/Ville : ${submittedCandidate.cityRegion}\n\n` +
      `« Jeff té YALLA rek takh »`
    );
    return `https://wa.me/${OFFICIAL_CONTACT.whatsappRaw}?text=${text}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="rejoindre-page-view">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 dark:border-[#1E4D34]/30 pb-8 space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 dark:bg-[#1E4D34] text-xs font-bold text-[#0D3823] dark:text-[#D4AF37] uppercase tracking-wider">
          <UserPlus className="w-3.5 h-3.5" />
          <span>Engagement & Bénévolat</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] dark:text-white uppercase tracking-tight">
          Rejoindre l'Association ASJY
        </h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
          Unissez votre intention à celle d'une jeunesse dévouée au service des mosquées du Sénégal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-7">
          {isSubmitted && submittedCandidate ? (
            <div className="bg-white dark:bg-[#0f1f17] rounded-3xl p-8 sm:p-10 border border-[#0D3823]/20 dark:border-[#D4AF37]/30 shadow-md space-y-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#0D3823] dark:text-emerald-400">
                  Demande d'adhésion enregistrée avec succès !
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                  Merci <strong>{submittedCandidate.firstName} {submittedCandidate.lastName}</strong> pour votre engagement sincère. Votre candidature pour <strong>{submittedCandidate.cityRegion}</strong> a bien été enregistrée et transmise à la coordination.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 text-left text-xs sm:text-sm space-y-2 max-w-md mx-auto">
                <div className="font-bold text-[#0D3823] dark:text-[#D4AF37] pb-1 border-b border-gray-200 dark:border-gray-700">
                  Récapitulatif de votre engagement :
                </div>
                <div><strong>Candidat :</strong> {submittedCandidate.firstName} {submittedCandidate.lastName}</div>
                <div><strong>Téléphone :</strong> {submittedCandidate.phone}</div>
                <div><strong>Région / Ville :</strong> {submittedCandidate.cityRegion}</div>
                <div><strong>Cotisation :</strong> {siteSettings.cotisationAmount}</div>
                <div><strong>Rythme :</strong> {siteSettings.scheduleNotice}</div>
              </div>

              <div className="pt-2 space-y-3 max-w-md mx-auto">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Confirmer directement sur WhatsApp</span>
                  <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-white underline cursor-pointer"
                >
                  Envoyer une autre demande
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#0f1f17] rounded-3xl p-6 sm:p-10 border border-[#0D3823]/15 dark:border-[#D4AF37]/25 shadow-sm space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-[#19241C] dark:text-white">
                  Formulaire de Demande d'Adhésion
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Renseignez vos coordonnées pour rejoindre la section ASJY de votre région.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Prénom *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Votre prénom"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Votre nom de famille"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Numéro de Téléphone (WhatsApp) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+221 ..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white focus:ring-2 focus:ring-[#0D3823] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Adresse Email (Optionnelle)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="votre.email@domaine.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Région / Ville / Commune de résidence *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Votre région, ville ou commune"
                      value={cityRegion}
                      onChange={(e) => setCityRegion(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Votre motivation *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Pourquoi souhaitez-vous rejoindre l'Association ASJY et quelles sont vos disponibilités ?"
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white focus:ring-2 focus:ring-[#0D3823] focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#13261c] border border-gray-200 dark:border-gray-800 text-[11px] text-gray-600 dark:text-gray-300 space-y-1">
                  <div className="font-bold text-[#0D3823] dark:text-[#D4AF37]">
                    Engagement désintéressé :
                  </div>
                  <div>• Devise : « Jeff té YALLA rek takh » (Agir uniquement pour Allah).</div>
                  <div>• Rythme : Par quinzaine de dimanche (deux dimanches par mois).</div>
                  <div>• Cotisation mensuelle modique : {siteSettings.cotisationAmount} pour l'achat du matériel.</div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4 text-[#D4AF37]" />
                  <span>{isSubmitting ? 'Enregistrement de la demande...' : 'Envoyer ma demande d’adhésion'}</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF9F5] dark:bg-[#0c1712] p-6 rounded-3xl border border-[#0D3823]/15 dark:border-[#D4AF37]/25 space-y-4">
            <h3 className="font-extrabold text-lg text-[#19241C] dark:text-white">
              Pourquoi adhérer à l'ASJY ?
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Participer activement à la propreté et à la beauté des lieux saints.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Rejoindre une communauté fraternelle, jeune, unie et bienveillante.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Agir dans le respect strict des 8 chartes et de la neutralité politique.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Prendre part aux opérations solidaires de Ndogou lors du Ramadan.</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-[#0D3823]/10 dark:border-[#1E4D34]/30">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Besoin d'un renseignement direct ?
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="font-mono font-bold text-[#0D3823] dark:text-[#D4AF37]">
                  {siteSettings.phone1} / {siteSettings.phone2}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  Permanence téléphonique et WhatsApp ouverte 7j/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
