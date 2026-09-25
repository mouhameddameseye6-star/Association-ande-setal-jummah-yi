import React, { useState, useRef } from 'react';
import { ActivityKey, UserPhoto } from '../types';
import { usePhotos } from '../context/PhotoContext';
import { ACTIVITIES_CONFIG, ACTIVITIES_LIST, MAX_PHOTOS_PER_ACTIVITY } from '../data/activities';
import {
  X,
  Upload,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';

interface PhotoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultActivityKey?: ActivityKey;
}

export const PhotoUploaderModal: React.FC<PhotoUploaderModalProps> = ({
  isOpen,
  onClose,
  defaultActivityKey = 'nettoyage'
}) => {
  const { photosByActivity, addPhotosToActivity, removePhoto, replacePhoto, updatePhotoMeta } = usePhotos();
  const [selectedActivity, setSelectedActivity] = useState<ActivityKey>(defaultActivityKey);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Replacement tracking
  const [replacingPhotoId, setReplacingPhotoId] = useState<string | null>(null);

  // Hidden file input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentActivityConfig = ACTIVITIES_CONFIG[selectedActivity];
  const currentPhotos = photosByActivity[selectedActivity] || [];
  const count = currentPhotos.length;
  const isLimitReached = count >= MAX_PHOTOS_PER_ACTIVITY;

  // Handle native file input change for adding photos
  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    const fileList: File[] = Array.from(files);

    if (fileList.length > MAX_PHOTOS_PER_ACTIVITY - count) {
      setErrorMessage(`Vous pouvez ajouter maximum ${MAX_PHOTOS_PER_ACTIVITY} photos pour cette activité. (Actuellement ${count}/${MAX_PHOTOS_PER_ACTIVITY}, place restante : ${MAX_PHOTOS_PER_ACTIVITY - count}).`);
      // Reset input value so user can re-select
      e.target.value = '';
      return;
    }

    setIsProcessing(true);
    try {
      const result = await addPhotosToActivity(selectedActivity, fileList);
      if (result.error) {
        setErrorMessage(result.error);
      } else {
        setSuccessMessage(`${result.added} photo${result.added > 1 ? 's' : ''} ajoutée${result.added > 1 ? 's' : ''} avec succès !`);
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Erreur lors de l’ajout des photos.');
    } finally {
      setIsProcessing(false);
      e.target.value = '';
    }
  };

  // Handle replacement file
  const handleReplaceFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !replacingPhotoId) return;

    setIsProcessing(true);
    try {
      await replacePhoto(selectedActivity, replacingPhotoId, files[0]);
      setSuccessMessage('Photo remplacée avec succès.');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Erreur lors du remplacement.');
    } finally {
      setIsProcessing(false);
      setReplacingPhotoId(null);
      e.target.value = '';
    }
  };

  const triggerAddFileInput = () => {
    setErrorMessage(null);
    if (isLimitReached) {
      setErrorMessage(`Limite de ${MAX_PHOTOS_PER_ACTIVITY} photos atteinte. Supprimez une photo pour en ajouter une nouvelle.`);
      return;
    }
    fileInputRef.current?.click();
  };

  const triggerReplace = (photoId: string) => {
    setReplacingPhotoId(photoId);
    replaceInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFilesSelected}
        accept="image/*"
        multiple
        className="hidden"
        aria-hidden="true"
      />
      <input
        type="file"
        ref={replaceInputRef}
        onChange={handleReplaceFile}
        accept="image/*"
        className="hidden"
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-4xl bg-[#FAF9F5] dark:bg-[#0c1712] rounded-3xl shadow-2xl border border-[#0D3823]/20 dark:border-[#D4AF37]/30 flex flex-col max-h-[92vh] overflow-hidden text-[#19241C] dark:text-[#EAECE9]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-white dark:bg-[#102018] border-b border-[#0D3823]/10 dark:border-[#1E4D34]/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0D3823] dark:bg-[#1E4D34] text-[#D4AF37] flex items-center justify-center text-lg shadow-sm">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#0D3823]/10 dark:bg-[#1E4D34] text-[#0D3823] dark:text-emerald-300">
                  Espace Photos Authentiques
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  (Max {MAX_PHOTOS_PER_ACTIVITY} photos / activité)
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-[#19241C] dark:text-white mt-0.5">
                Ajout & Gestion des Photos
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
            aria-label="Fermer la fenêtre"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Activity Selector Tabs */}
        <div className="px-4 sm:px-6 pt-4 pb-2 bg-[#F3F2EB] dark:bg-[#07130c] border-b border-[#0D3823]/10 dark:border-[#1E4D34]/30">
          <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            1. Choisissez l'activité à illustrer :
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {ACTIVITIES_LIST.map((act) => {
              const actCount = (photosByActivity[act.key] || []).length;
              const isSelected = selectedActivity === act.key;
              return (
                <button
                  key={act.key}
                  type="button"
                  onClick={() => {
                    setSelectedActivity(act.key);
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0D3823] dark:bg-[#1E4D34] text-white shadow-md'
                      : 'bg-white dark:bg-[#12241b] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#183023] border border-gray-200 dark:border-[#1E4D34]/40'
                  }`}
                >
                  <span className="text-base">{act.icon}</span>
                  <span>{act.shortTitle}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#0A291A]'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {actCount}/{MAX_PHOTOS_PER_ACTIVITY}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Active Activity Summary & Status */}
          <div className="bg-white dark:bg-[#12241b] rounded-2xl p-4 sm:p-5 border border-[#0D3823]/10 dark:border-[#1E4D34]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentActivityConfig.icon}</span>
                <h3 className="font-extrabold text-base sm:text-lg text-[#0D3823] dark:text-emerald-300">
                  {currentActivityConfig.title}
                </h3>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                {currentActivityConfig.description}
              </p>
            </div>

            {/* Photo Counter Pill */}
            <div className="shrink-0 flex items-center gap-3">
              <div
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 ${
                  isLimitReached
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                    : 'bg-emerald-100 dark:bg-emerald-950/60 text-[#0D3823] dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                }`}
              >
                <span>{count} / {MAX_PHOTOS_PER_ACTIVITY} photos</span>
              </div>
            </div>
          </div>

          {/* Error and Success Alerts */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-xs font-semibold flex items-start gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMessage}</div>
              <button onClick={() => setErrorMessage(null)} className="text-red-500 hover:text-red-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-[#0D3823] dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <div className="flex-1">{successMessage}</div>
            </div>
          )}

          {/* Action Button: + AJOUTER DES PHOTOS */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              disabled={isLimitReached || isProcessing}
              onClick={triggerAddFileInput}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer ${
                isLimitReached
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none'
                  : 'bg-[#0D3823] dark:bg-[#1E4D34] hover:bg-[#145334] dark:hover:bg-[#276343] text-white hover:shadow-lg'
              }`}
              id="btn-ajouter-photos"
            >
              {isProcessing ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
              ) : (
                <Plus className="w-4 h-4 text-[#D4AF37]" />
              )}
              <span>+ AJOUTER DES PHOTOS</span>
            </button>

            <span className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
              {isLimitReached
                ? `Limite de ${MAX_PHOTOS_PER_ACTIVITY} photos atteinte. Supprimez une photo pour en ajouter une nouvelle.`
                : `Sélectionnez jusqu'à ${MAX_PHOTOS_PER_ACTIVITY - count} photo${MAX_PHOTOS_PER_ACTIVITY - count > 1 ? 's' : ''} depuis votre téléphone, tablette ou ordinateur.`}
            </span>
          </div>

          {/* Photos Preview Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Aperçu des photos ({count} / {MAX_PHOTOS_PER_ACTIVITY})
              </h4>
              {count > 0 && (
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  Photos affichées automatiquement sur le site
                </span>
              )}
            </div>

            {count === 0 ? (
              /* Requested Empty State */
              <div className="p-8 sm:p-12 rounded-3xl border-2 border-dashed border-gray-200 dark:border-[#1E4D34]/50 bg-white/50 dark:bg-[#0c1a13] text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-[#152e22] text-[#0D3823] dark:text-[#D4AF37] mx-auto flex items-center justify-center text-3xl">
                  📷
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base sm:text-lg text-[#19241C] dark:text-white">
                    Aucune photo ajoutée
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Ajoutez jusqu'à {MAX_PHOTOS_PER_ACTIVITY} photos pour illustrer cette activité. Vos photos apparaîtront immédiatement dans les carrousels de terrain.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={triggerAddFileInput}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3823] dark:bg-[#1E4D34] hover:bg-[#145334] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>+ AJOUTER DES PHOTOS</span>
                </button>
              </div>
            ) : (
              /* Grid of photos (responsive up to 50 photos) */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="bg-white dark:bg-[#12241b] rounded-2xl border border-[#0D3823]/15 dark:border-[#1E4D34]/50 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={photo.dataUrl}
                        alt={photo.title || `Photo ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Photo Badge */}
                      <div className="absolute top-2.5 left-2.5 bg-[#0D3823]/80 backdrop-blur-sm text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow">
                        Photo {index + 1}
                      </div>

                      {/* Delete Quick Button Overlay */}
                      <button
                        type="button"
                        onClick={() => removePhoto(selectedActivity, photo.id)}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-red-600/90 hover:bg-red-700 text-white transition-colors shadow-sm cursor-pointer"
                        title="Supprimer cette photo"
                        aria-label="Supprimer cette photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Meta Controls & Replace */}
                    <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={photo.title || ''}
                          onChange={(e) =>
                            updatePhotoMeta(selectedActivity, photo.id, { title: e.target.value })
                          }
                          placeholder={`Légende (ex: Chantier ${index + 1})...`}
                          className="w-full text-xs font-bold text-[#19241C] dark:text-white bg-[#FAF9F5] dark:bg-[#07130c] border border-gray-200 dark:border-[#1E4D34]/40 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0D3823]"
                        />

                        <input
                          type="text"
                          value={photo.location || ''}
                          onChange={(e) =>
                            updatePhotoMeta(selectedActivity, photo.id, { location: e.target.value })
                          }
                          placeholder="Lieu (ex: Mosquée Thiès, Dakar...)"
                          className="w-full text-[11px] text-gray-600 dark:text-gray-300 bg-[#FAF9F5] dark:bg-[#07130c] border border-gray-200 dark:border-[#1E4D34]/40 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#0D3823]"
                        />
                      </div>

                      <div className="pt-2 border-t border-gray-100 dark:border-[#1E4D34]/30 flex items-center justify-between text-[11px]">
                        <span className="text-gray-400 font-mono text-[10px]">
                          {(photo.size / 1024).toFixed(0)} Ko
                        </span>

                        <div className="flex items-center gap-1.5">
                          {/* Replace Button */}
                          <button
                            type="button"
                            onClick={() => triggerReplace(photo.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-[10px] font-bold transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Remplacer</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => removePhoto(selectedActivity, photo.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 hover:bg-red-100 text-red-700 dark:text-red-300 text-[10px] font-bold transition-colors cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white dark:bg-[#102018] border-t border-[#0D3823]/10 dark:border-[#1E4D34]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Info className="w-3.5 h-3.5 text-[#0D3823] dark:text-[#D4AF37]" />
            <span>
              Les photos sont conservées de manière sécurisée et immédiatement visibles dans les carrousels de terrain.
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0D3823] dark:bg-[#1E4D34] hover:bg-[#145334] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Terminer & Voir le résultat
          </button>
        </div>
      </div>
    </div>
  );
};
