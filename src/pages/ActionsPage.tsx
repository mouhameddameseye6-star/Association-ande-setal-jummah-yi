import React, { useState } from 'react';
import { PageId, ActivityKey } from '../types';
import { ActivityPhotoCarousel } from '../components/ActivityPhotoCarousel';
import { PhotoUploaderModal } from '../components/PhotoUploaderModal';
import {
  Sparkles,
  TreePine,
  Wrench,
  HeartHandshake,
  Moon,
  Droplets,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
  Calendar,
  Image as ImageIcon,
  Plus
} from 'lucide-react';

interface ActionsPageProps {
  onNavigate: (page: PageId) => void;
}

export const ActionsPage: React.FC<ActionsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'nettoyage' | 'embellissement' | 'equipements' | 'social' | 'ramadan' | 'autres'>('nettoyage');
  const [modalOpen, setModalOpen] = useState(false);
  const [targetActivity, setTargetActivity] = useState<ActivityKey>('nettoyage');

  const openUploadModal = (key: ActivityKey) => {
    setTargetActivity(key);
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="actions-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sur Le Terrain</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
          Nos Actions & Chantiers
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          Toutes les deux semaines, les bénévoles de l'Association Andeu Setal Jummah Yi interviennent directement dans les mosquées selon un protocole rigoureux et respectueux des lieux.
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#F0EFEA] dark:bg-[#0d1b14] rounded-2xl border border-[#0D3823]/10 dark:border-[#D4AF37]/20">
        <button
          onClick={() => setActiveTab('nettoyage')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'nettoyage'
              ? 'bg-[#0D3823] dark:bg-[#1E4D34] text-white shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-[#162e22] hover:text-[#0D3823] dark:hover:text-[#D4AF37]'
          }`}
        >
          <span>🧹 Nettoyage Intégral</span>
        </button>

        <button
          onClick={() => setActiveTab('embellissement')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'embellissement'
              ? 'bg-[#0D3823] dark:bg-[#1E4D34] text-white shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-[#162e22] hover:text-[#0D3823] dark:hover:text-[#D4AF37]'
          }`}
        >
          <span>🌱 Embellissement</span>
        </button>

        <button
          onClick={() => setActiveTab('equipements')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'equipements'
              ? 'bg-[#0D3823] dark:bg-[#1E4D34] text-white shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-[#162e22] hover:text-[#0D3823] dark:hover:text-[#D4AF37]'
          }`}
        >
          <span>🔧 Entretien & Équipements</span>
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'social'
              ? 'bg-[#0D3823] dark:bg-[#1E4D34] text-white shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-[#162e22] hover:text-[#0D3823] dark:hover:text-[#D4AF37]'
          }`}
        >
          <span>🤝 Actions Sociales</span>
        </button>

        <button
          onClick={() => setActiveTab('ramadan')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'ramadan'
              ? 'bg-[#0D3823] dark:bg-[#1E4D34] text-white shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-[#162e22] hover:text-[#0D3823] dark:hover:text-[#D4AF37]'
          }`}
        >
          <span>🌙 Ramadan & Ndogou</span>
        </button>

        <button
          onClick={() => setActiveTab('autres')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'autres'
              ? 'bg-[#0D3823] dark:bg-[#1E4D34] text-white shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-[#162e22] hover:text-[#0D3823] dark:hover:text-[#D4AF37]'
          }`}
        >
          <span>📦 Autres Activités</span>
        </button>
      </div>

      {/* Tab Content 1: Nettoyage */}
      {activeTab === 'nettoyage' && (
        <div className="space-y-8 animate-fade-in">
          {/* Photos Carousel for Nettoyage */}
          <ActivityPhotoCarousel
            activityKey="nettoyage"
            onOpenUploadModal={() => openUploadModal('nettoyage')}
          />

          <div className="bg-white dark:bg-[#0f1f17] rounded-3xl p-8 sm:p-12 border border-[#0D3823]/10 dark:border-[#D4AF37]/20 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧹</span>
              <div>
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#0D3823] dark:text-[#D4AF37]">
                  Axe Opérationnel Principal
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#19241C] dark:text-white">
                  Nettoyage, Lavage & Dépoussiérage des Mosquées
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
              Le nettoyage complet d'une mosquée demande de la méthode, du matériel adapté et une forte cohésion d'équipe. Chaque chantier dure généralement 4 à 5 heures le dimanche matin, avant la prière de Dhuhr.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#0D3823] dark:bg-[#1E4D34] text-[#D4AF37] flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Lavage à Grande Eau</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Lavage minutieux des carrelages, dalles des cours intérieures, escaliers et esplanades extérieures avec des détergents écologiques et désinfectants agréés.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#0D3823] dark:bg-[#1E4D34] text-[#D4AF37] flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Balayage Systématique</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Dégagement des sables éoliens, feuilles mortes, abords immédiats de la mosquée pour éviter l'introduction de poussière dans l'enceinte sacrée.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#0D3823] dark:bg-[#1E4D34] text-[#D4AF37] flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Dépoussiérage Profond</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Aspiration et aération des moquettes, nettoyage des boiseries sculptées du Minbar, des rebords de fenêtres, grilles d'aération et luminaires en hauteur.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#0D3823] dark:bg-[#1E4D34] text-[#D4AF37] flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Désinfection Ablutions</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Curage des caniveaux d'évacuation, décapage des bacs d'ablution, désodorisation et mise en place d'un protocole d'hygiène rigoureux pour la santé des fidèles.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Embellissement */}
      {activeTab === 'embellissement' && (
        <div className="space-y-8 animate-fade-in">
          {/* Photos Carousel for Embellissement */}
          <ActivityPhotoCarousel
            activityKey="embellissement"
            onOpenUploadModal={() => openUploadModal('embellissement')}
          />

          <div className="bg-white dark:bg-[#0f1f17] rounded-3xl p-8 sm:p-12 border border-[#0D3823]/10 dark:border-[#D4AF37]/20 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌱</span>
              <div>
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#0D3823] dark:text-[#D4AF37]">
                  Cadre de Vie & Écologie
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#19241C] dark:text-white">
                  Plantation d'Arbres & Amélioration de l'Environnement
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
              Une mosquée ne doit pas être un îlot minéral étouffant. L'ASJY s'engage pour faire des cours de mosquées des espaces ombragés, aérés et respectueux de la création.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-6 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-[#1E4D34] text-[#0D3823] dark:text-[#D4AF37] flex items-center justify-center">
                  <TreePine className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Plantation d'Arbres d'Ombrage</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Plantation de neems, flamboyants, acacias et dattiers sahéliens capables de résister aux chaleurs et d'offrir un abri rafraîchissant pour les fidèles attendant la prière.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-6 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-[#1E4D34] text-[#0D3823] dark:text-[#D4AF37] flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Gestion Raisonnée de l'Eau</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Sensibilisation contre le gaspillage de l'eau lors des ablutions, raccordement des eaux grises filtrées pour l'arrosage des espaces verts et des jeunes plants.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-6 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-[#1E4D34] text-[#0D3823] dark:text-[#D4AF37] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Valorisation des Espaces</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Pose de gravillons, aménagement de voies d'accès propres, retrait des gravats et élimination des dépôts sauvages autour des murs de clôture de la mosquée.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Entretien & Équipements */}
      {activeTab === 'equipements' && (
        <div className="space-y-8 animate-fade-in">
          {/* Photos Carousel for Entretien */}
          <ActivityPhotoCarousel
            activityKey="entretien"
            onOpenUploadModal={() => openUploadModal('entretien')}
          />

          <div className="bg-white dark:bg-[#0f1f17] rounded-3xl p-8 sm:p-12 border border-[#0D3823]/10 dark:border-[#D4AF37]/20 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔧</span>
              <div>
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#0D3823] dark:text-[#D4AF37]">
                  Maintenance & Matériel
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#19241C] dark:text-white">
                  Remplacement et Réparation des Équipements
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
              Grâce aux cotisations mensuelles des membres de 1 000 FCFA et aux dons bienfaiteurs, l'ASJY prend en charge le renouvellement d'équipements cruciaux souvent dégradés par l'usure quotidienne.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-2">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300 flex items-center gap-2">
                  <span>🫖 Bouilloires en Plastique (Satala)</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Remplacement des bouilloires percées ou vieillissantes par des satalas neuves, solides et nettoyées régulièrement.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-2">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300 flex items-center gap-2">
                  <span>🚰 Robinetterie & Plomberie</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Réparation des fuites d'eau continues, pose de robinets neufs à fermeture quart de tour plus résistants.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-2">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300 flex items-center gap-2">
                  <span>🧶 Nattes & Tapis de Prière</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Fourniture de rouleaux de nattes lavables pour les nefs et cours d'extension extérieure afin de protéger les fidèles du sol chaud.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-2">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300 flex items-center gap-2">
                  <span>💡 Lampes & Éclairage Basse Consommation</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Remplacement des ampoules grillées par des projecteurs et tubes LED pour éclairer les prières de Fajr et d'Isha tout en réduisant la facture électrique.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-2">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300 flex items-center gap-2">
                  <span>📻 Radios & Sonorisation</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Vérification des câblages des microphones de l'Adhan, dépoussiérage des amplificateurs et des haut-parleurs des minarets.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-2">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300 flex items-center gap-2">
                  <span>🧼 Matériel d'Entretien Mis à Disposition</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Dotation aux comités de gestion des mosquées en balais, raclettes professionnelles, détergents désinfectants et serpillières.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 4: Actions Sociales */}
      {activeTab === 'social' && (
        <div className="space-y-8 animate-fade-in">
          {/* Photos Carousel for Social */}
          <ActivityPhotoCarousel
            activityKey="social"
            onOpenUploadModal={() => openUploadModal('social')}
          />

          <div className="bg-white dark:bg-[#0f1f17] rounded-3xl p-8 sm:p-12 border border-[#0D3823]/10 dark:border-[#D4AF37]/20 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤝</span>
              <div>
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#0D3823] dark:text-[#D4AF37]">
                  Fraternité & Entraide
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#19241C] dark:text-white">
                  Actions Sociales & Solidarité Communautaire
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
              L'ASJY n'est pas une simple entreprise de nettoyage : c'est un mouvement humain et spirituel engagé aux côtés des populations les plus vulnérables.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-6 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-3">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Soutien aux Écoles Coraniques (Daaras)</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Lors des interventions dans les mosquées abritant un Daara, nos équipes nettoient les espaces d'apprentissage et apportent des dons de savonnettes, bouilloires et fournitures d'hygiène pour les jeunes talibés.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-6 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-3">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Accompagnement des Personnes Âgées</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Soulager concrètement les aînés et gardiens bénévoles de mosquée qui portaient seuls la lourde charge physique du nettoyage, en restaurant un dialogue intergénérationnel bienveillant.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 5: Ramadan */}
      {activeTab === 'ramadan' && (
        <div className="space-y-8 animate-fade-in">
          {/* Photos Carousel for Ramadan */}
          <ActivityPhotoCarousel
            activityKey="ramadan"
            onOpenUploadModal={() => openUploadModal('ramadan')}
          />

          <div className="bg-white dark:bg-[#0f1f17] rounded-3xl p-8 sm:p-12 border border-[#0D3823]/10 dark:border-[#D4AF37]/20 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌙</span>
              <div>
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#0D3823] dark:text-[#D4AF37]">
                  Mois Sacré
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#19241C] dark:text-white">
                  Opérations Ramadan & Distributions de Ndogou
                </h2>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-[#221808] border border-amber-200 dark:border-amber-700/50 text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-medium leading-relaxed">
              <strong>Précision officielle importante :</strong> Les distributions de Ndogou ne sont PAS limitées à Dakar. L'action est déployée de façon solidaire dans les différentes régions du Sénégal où l'association est implantée (Thiès, Diourbel, Fatick, etc.).
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-2">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Kits Alimentaires Complets</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Dattes fraîches, baguettes de pain garnies, café Touba traditionnel chaud, lait et bouteilles d'eau minérale fraîche distribués à l'heure du coucher du soleil.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-2">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Sur le Parvis & Carrefours</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Accueil chaleureux des fidèles, des usagers de la route, des chauffeurs et des passants pris par le temps pour leur permettre de rompre le jeûne en toute dignité.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-5 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-2">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Mobilisation Régionale Décentralisée</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Chaque section régionale prépare et distribue ses propres paniers Ndogou grâce à l'appui des bienfaiteurs et aux cotisations des membres locaux.
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => onNavigate('ramadan')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3823] hover:bg-[#145334] dark:bg-[#1E4D34] dark:hover:bg-[#276343] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <span>Voir la page complète Ramadan</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 6: Autres Activités */}
      {activeTab === 'autres' && (
        <div className="space-y-8 animate-fade-in">
          {/* Photos Carousel for Autres Activités */}
          <ActivityPhotoCarousel
            activityKey="autres"
            onOpenUploadModal={() => openUploadModal('autres')}
          />

          <div className="bg-white dark:bg-[#0f1f17] rounded-3xl p-8 sm:p-12 border border-[#0D3823]/10 dark:border-[#D4AF37]/20 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📦</span>
              <div>
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#0D3823] dark:text-[#D4AF37]">
                  Engagement & Communauté
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#19241C] dark:text-white">
                  Autres Activités & Vie Associative
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
              L'ASJY organise tout au long de l'année des assemblées de sensibilisation, des rencontres de sections régionales et des initiatives citoyennes pour renforcer la cohésion de la jeunesse musulmane.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-6 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-3">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Rencontres & Assemblées de Sections</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Coordination entre les bureaux de Dakar, Thiès, Diourbel, Kaolack, Touba et les sections locales pour planifier les chantiers bimensuels.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-6 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-3">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Sensibilisation Civique</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Sensibilisation des riverains et fidèles au respect de la propreté des abords des lieux de culte et à la gestion citoyenne des ordures.
                </p>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#13261c] p-6 rounded-2xl border border-gray-200 dark:border-[#1E4D34]/50 space-y-3">
                <h4 className="font-bold text-base text-[#0D3823] dark:text-emerald-300">Mobilisation de la Jeunesse</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Ateliers pratiques, accueil des nouveaux bénévoles et formation aux techniques de dépoussiérage et d'entretien durable.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA to propose a mosque */}
      <div className="p-8 rounded-3xl bg-[#0D3823] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#D4AF37]/30">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold">Votre mosquée a besoin d'un nettoyage ou d'équipements ?</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Faites une demande en quelques clics auprès de notre bureau pour planifier un prochain chantier.
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2b] text-[#0A291A] font-extrabold text-xs uppercase tracking-wider transition-all shrink-0 active:scale-95 cursor-pointer"
        >
          Proposer une mosquée
        </button>
      </div>

      {/* Photo Uploader Modal */}
      <PhotoUploaderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultActivityKey={targetActivity}
      />
    </div>
  );
};
