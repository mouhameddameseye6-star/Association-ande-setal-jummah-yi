import React, { useState } from 'react';
import { PageId, RealisationPhoto } from '../types';
import { REALISATIONS_GALLERY } from '../data/content';
import { ASJY_PHOTOS } from '../data/assets';
import {
  Image as ImageIcon,
  Sliders,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Sparkles,
  Plus,
  Upload
} from 'lucide-react';

interface RealisationsPageProps {
  onNavigate: (page: PageId) => void;
}

export const RealisationsPage: React.FC<RealisationsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [beforeAfterSlider, setBeforeAfterSlider] = useState<number>(50);
  const [photosList, setPhotosList] = useState<RealisationPhoto[]>(REALISATIONS_GALLERY);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRegion, setNewRegion] = useState('Dakar');
  const [newCategory, setNewCategory] = useState<RealisationPhoto['category']>('Nettoyage');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const categories = ['Tous', 'Nettoyage', 'Embellissement', 'Actions Sociales', 'Ramadan', 'Vie Associative'];

  const filteredPhotos = selectedCategory === 'Tous'
    ? photosList
    : photosList.filter((p) => p.category === selectedCategory);

  const activePhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleAddCustomPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) return;

    const newPhoto: RealisationPhoto = {
      id: `photo-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      location: newLocation || 'Mosquée partenaire',
      region: newRegion,
      date: 'Récemment',
      image: newImageUrl,
      description: newDescription || 'Chantier réalisé par les bénévoles de l’Association ASJY.'
    };

    setPhotosList([newPhoto, ...photosList]);
    setShowAddModal(false);
    setNewTitle('');
    setNewImageUrl('');
    setNewDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="realisations-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Galerie & Chantiers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
            Nos Réalisations
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl leading-relaxed">
            Découvrez en images les interventions de nos bénévoles dans les mosquées du Sénégal. Authenticité, rigueur et ferveur au service des lieux sacrés.
          </p>
        </div>

        {/* Button to add an authentic photo */}
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-white border border-[#0D3823]/30 hover:bg-[#F3FAF5] text-[#0D3823] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          <span>Ajouter une photo de chantier</span>
        </button>
      </div>

      {/* 1. INTERACTIVE BEFORE / AFTER SLIDER */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#0D3823]/15 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#0D3823]">
              Comparatif Terrain
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#19241C]">
              Chantier : Avant / Après Nettoyage en Profondeur
            </h2>
          </div>
          <span className="text-xs text-gray-500 italic">
            Faites glisser le curseur pour voir la transformation
          </span>
        </div>

        {/* Comparison Viewer Container */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-inner select-none border border-gray-200">
          {/* After Image (Full background) */}
          <img
            src={ASJY_PHOTOS.heroMosque}
            alt="Après le nettoyage - Mosquée étincelante et espace purifié"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-[#0D3823]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow">
            Après intervention ASJY
          </div>

          {/* Before Image (Clipped by slider percentage) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${beforeAfterSlider}%` }}
          >
            <img
              src={ASJY_PHOTOS.nettoyageTapis}
              alt="Pendant le grand chantier - Déroulage et nettoyage des tapis"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', height: '100%' }}
            />
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow">
              Pendant le chantier
            </div>
          </div>

          {/* Draggable Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)] cursor-ew-resize flex items-center justify-center"
            style={{ left: `${beforeAfterSlider}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-[#0D3823] border-2 border-[#D4AF37] text-white flex items-center justify-center text-xs shadow-lg">
              <Sliders className="w-4 h-4 text-[#D4AF37]" />
            </div>
          </div>

          {/* Invisible HTML range input on top for touch/mouse interaction */}
          <input
            type="range"
            min="5"
            max="95"
            value={beforeAfterSlider}
            onChange={(e) => setBeforeAfterSlider(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            aria-label="Curseur avant et après intervention"
          />
        </div>

        <p className="text-xs text-gray-600 text-center">
          Lavage des dalles à grande eau, extraction de la poussière des moquettes et mise en place de nouvelles bouilloires d'ablution.
        </p>
      </section>

      {/* 2. CATEGORY FILTERS */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#0D3823] text-white shadow-md'
                : 'bg-white text-gray-700 border border-[#0D3823]/15 hover:bg-[#F0EFEA]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. PHOTO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhotoIndex(idx)}
            className="bg-white rounded-2xl border border-[#0D3823]/10 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col"
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
              <img
                src={photo.image}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#0D3823]/80 backdrop-blur-sm text-[#FAF9F5] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                {photo.category}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h4 className="font-bold text-sm text-[#19241C] group-hover:text-[#0D3823] transition-colors line-clamp-1">
                  {photo.title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {photo.description}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#0D3823]" />
                  {photo.region}
                </span>
                <span>{photo.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. LIGHTBOX MODAL */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#FAF9F5] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-white border-b border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0D3823]/10 text-[#0D3823]">
                  {activePhoto.category}
                </span>
                <h3 className="font-black text-base sm:text-xl text-[#0D3823] mt-1">
                  {activePhoto.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                aria-label="Fermer la vue agrandie"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative bg-black flex items-center justify-center flex-1 min-h-[300px] overflow-hidden">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] w-auto max-w-full object-contain"
              />

              {/* Prev / Next buttons */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                aria-label="Photo précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                aria-label="Photo suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Info Footer */}
            <div className="p-4 sm:p-6 bg-white border-t border-gray-200 space-y-2">
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {activePhoto.description}
              </p>
              <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 pt-1">
                <span className="flex items-center gap-1 font-semibold text-[#0D3823]">
                  <MapPin className="w-3.5 h-3.5" />
                  {activePhoto.location} ({activePhoto.region})
                </span>
                <span>Date de l'opération : {activePhoto.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL: AJOUTER UNE VRAIE PHOTO */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#0D3823]" />
                <h3 className="font-extrabold text-lg text-[#0D3823]">
                  Ajouter une Photo de Chantier
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600">
              Permet aux membres ou coordinateurs d'ajouter une photo authentique de chantier avec son URL ou un lien direct d'image.
            </p>

            <form onSubmit={handleAddCustomPhoto} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Titre de la photo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Nettoyage Grande Mosquée de Mbacké"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Catégorie</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                  >
                    <option value="Nettoyage">Nettoyage</option>
                    <option value="Embellissement">Embellissement</option>
                    <option value="Actions Sociales">Actions Sociales</option>
                    <option value="Ramadan">Ramadan</option>
                    <option value="Vie Associative">Vie Associative</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Région</label>
                  <select
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                  >
                    <option value="Dakar">Dakar</option>
                    <option value="Thiès">Thiès</option>
                    <option value="Diourbel">Diourbel</option>
                    <option value="Fatick">Fatick</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Lieu / Mosquée</label>
                <input
                  type="text"
                  placeholder="Ex : Mosquée Al-Houda"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">URL de l'image *</label>
                <input
                  type="url"
                  required
                  placeholder="https://... (URL de l'image)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description courte</label>
                <textarea
                  rows={2}
                  placeholder="Précisez ce qui a été réalisé lors de ce chantier..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0D3823] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0D3823] text-white hover:bg-[#145334] font-bold"
                >
                  Ajouter à la galerie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
