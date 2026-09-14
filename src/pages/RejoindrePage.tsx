import React, { useState } from 'react';
import { PageId, AdhesionFormData } from '../types';
import { OFFICIAL_CONTACT } from '../data/content';
import {
  UserPlus,
  CheckCircle2,
  HelpCircle,
  Phone,
  ShieldCheck,
  Heart,
  Calendar,
  DollarSign,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface RejoindrePageProps {
  onNavigate: (page: PageId) => void;
}

export const RejoindrePage: React.FC<RejoindrePageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<AdhesionFormData>({
    fullName: '',
    phone: '',
    email: '',
    region: 'Dakar',
    city: '',
    motivation: '',
    acceptChartes: false,
    acceptCotisation: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptChartes || !formData.acceptCotisation) {
      alert('Veuillez accepter les 8 chartes et le principe de cotisation mensuelle.');
      return;
    }
    setIsSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `As-salamu alaykum. Je souhaite finaliser mon adhésion à l'Association Andeu Setal Jummah Yi (ASJY).\n\n` +
      `Nom : ${formData.fullName}\n` +
      `Téléphone : ${formData.phone}\n` +
      `Région : ${formData.region}\n` +
      `Commune : ${formData.city}\n` +
      `Motivation : ${formData.motivation}\n\n` +
      `J'atteste avoir pris connaissance des 8 chartes et j'accepte la cotisation mensuelle de 1 000 FCFA.`
    );
    return `https://wa.me/${OFFICIAL_CONTACT.whatsappRaw}?text=${text}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="rejoindre-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
          <UserPlus className="w-3.5 h-3.5" />
          <span>Engagement Citoyen</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
          Devenir Membre de l'ASJY
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          Rejoignez une communauté fraternelle de jeunes dévoués à la propreté et à l'embellissement des maisons d'Allah au Sénégal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-7">
          {isSubmitted ? (
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#0D3823]/20 shadow-md space-y-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#0D3823]/10 text-[#0D3823] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#145334]" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#0D3823]">
                  Demande d'adhésion enregistrée !
                </h2>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Merci <strong>{formData.fullName}</strong> pour votre engagement. Votre fiche pour la région de <strong>{formData.region}</strong> a bien été préparée.
                </p>
              </div>

              <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-gray-200 text-left text-xs sm:text-sm space-y-2 max-w-md mx-auto">
                <div className="font-bold text-[#0D3823] pb-1 border-b border-gray-200">
                  Récapitulatif de votre engagement :
                </div>
                <div><strong>Nom complet :</strong> {formData.fullName}</div>
                <div><strong>Téléphone :</strong> {formData.phone}</div>
                <div><strong>Région / Commune :</strong> {formData.region} - {formData.city}</div>
                <div><strong>Chartes acceptées :</strong> Oui (8/8)</div>
                <div><strong>Cotisation :</strong> 1 000 FCFA / mois acceptée</div>
              </div>

              <div className="pt-2 space-y-3 max-w-md mx-auto">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Confirmer sur WhatsApp avec le Coordonnateur</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-gray-500 hover:text-gray-800 underline"
                >
                  Modifier mes informations
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#0D3823]/15 shadow-sm space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-[#19241C]">
                  Formulaire d'Inscription Officiel
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Remplissez ce formulaire pour être rattaché à la section ASJY de votre région.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Nom et Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cheikh Amadou Bamba Sow"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Numéro WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: +221 77 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Adresse Email (Optionnel)
                    </label>
                    <input
                      type="email"
                      placeholder="Ex: contact@exemple.sn"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Région de Résidence *
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none bg-white font-medium"
                    >
                      <option value="Dakar">Dakar (Siège & Communes)</option>
                      <option value="Thiès">Thiès</option>
                      <option value="Diourbel">Diourbel / Mbacké / Touba</option>
                      <option value="Fatick">Fatick</option>
                      <option value="Autre">Autre région du Sénégal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Commune / Quartier *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Parcelles Assainies U20"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Pourquoi souhaitez-vous rejoindre l'ASJY ? *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Exprimez brièvement votre motivation et vos disponibilités pour les chantiers du dimanche..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                  />
                </div>

                {/* Checkboxes Requirements */}
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-gray-200 space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={formData.acceptChartes}
                      onChange={(e) => setFormData({ ...formData, acceptChartes: e.target.checked })}
                      className="mt-1 w-4 h-4 text-[#0D3823] rounded border-gray-300 focus:ring-[#0D3823]"
                    />
                    <span className="text-xs text-gray-700 leading-relaxed">
                      J'atteste avoir lu et m'engage formellement à respecter <strong>les 8 chartes officielles</strong> (neutralité politique absolue, respect mutuel et pudeur, assiduité).
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={formData.acceptCotisation}
                      onChange={(e) => setFormData({ ...formData, acceptCotisation: e.target.checked })}
                      className="mt-1 w-4 h-4 text-[#0D3823] rounded border-gray-300 focus:ring-[#0D3823]"
                    />
                    <span className="text-xs text-gray-700 leading-relaxed">
                      J'accepte le principe de la <strong>cotisation mensuelle de 1 000 FCFA</strong> (Charte C4) nécessaire à l'achat du matériel d'entretien et des fournitures.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  Soumettre ma candidature d'adhésion
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right FAQ & Requirements Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-3xl border border-[#0D3823]/15 space-y-4">
            <h3 className="text-lg font-black text-[#0D3823] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <span>Pourquoi adhérer à l'ASJY ?</span>
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#145334] shrink-0 mt-0.5" />
                <span>Gagner la récompense divine en servant concrètement la maison d'Allah.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#145334] shrink-0 mt-0.5" />
                <span>Intégrer une jeunesse saine, disciplinée, fraternelle et solidaire.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#145334] shrink-0 mt-0.5" />
                <span>Participer aux opérations spéciales de Ndogou pendant le Ramadan.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#145334] shrink-0 mt-0.5" />
                <span>Vivre sa citoyenneté à travers un bénévolat utile et visible.</span>
              </li>
            </ul>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-[#19241C] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#0D3823]" />
              <span>Questions Fréquentes</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-gray-600">
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="font-bold text-[#0D3823] mb-1">
                  Les femmes peuvent-elles participer aux chantiers ?
                </div>
                <div>
                  Oui, absolument. Les sœurs sont engagées dans le nettoyage des mezzanines et espaces réservés aux femmes, la préparation des nattes et la logistique des Ndogou, dans le strict respect de la décence.
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="font-bold text-[#0D3823] mb-1">
                  Quel est le rythme obligatoire des présences ?
                </div>
                <div>
                  Les chantiers ont lieu par quinzaine de dimanche (deux dimanches par mois) de 8h30 à 12h30. Une présence régulière est demandée pour la dynamique du groupe.
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="font-bold text-[#0D3823] mb-1">
                  À quoi sert la cotisation de 1 000 FCFA ?
                </div>
                <div>
                  Elle sert exclusivement à acheter les détergents, les raclettes, les satalas neuves, les ampoules LED et les sacs poubelles pour les mosquées.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
