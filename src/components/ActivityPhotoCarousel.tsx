import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ActivityKey, UserPhoto } from '../types';
import { usePhotos } from '../context/PhotoContext';
import { ACTIVITIES_CONFIG, MAX_PHOTOS_PER_ACTIVITY } from '../data/activities';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Sliders,
  Maximize2,
  X,
  MapPin,
  Calendar,
  Sparkles,
  Layers
} from 'lucide-react';

interface ActivityPhotoCarouselProps {
  activityKey: ActivityKey;
  onOpenUploadModal?: () => void;
  titleOverride?: string;
  className?: string;
}

export const ActivityPhotoCarousel: React.FC<ActivityPhotoCarouselProps> = ({
  activityKey,
  onOpenUploadModal,
  titleOverride,
  className = ''
}) => {
  const { photosByActivity } = usePhotos();
  const photos = photosByActivity[activityKey] || [];
  const activityConfig = ACTIVITIES_CONFIG[activityKey];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Keep index bounded
  useEffect(() => {
    if (photos.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= photos.length) {
      setCurrentIndex(photos.length - 1);
    }
  }, [photos.length, currentIndex]);

  const handlePrev = useCallback(() => {
    if (photos.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    if (photos.length <= 1) return;
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  // Autoplay with pause on hover / interaction
  useEffect(() => {
    if (photos.length <= 1 || isPaused || lightboxOpen) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5500);

    return () => clearInterval(timer);
  }, [photos.length, isPaused, lightboxOpen, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped left -> Next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> Prev
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation when in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setLightboxOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, handlePrev, handleNext]);

  // 1. EMPTY STATE (Exact text & style specified in prompt requirement 9)
  if (photos.length === 0) {
    return (
      <div
        className={`bg-white dark:bg-[#0f1f17] rounded-3xl border-2 border-dashed border-[#0D3823]/20 dark:border-[#1E4D34]/50 p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-sm ${className}`}
      >
        <div className="w-16 h-16 rounded-full bg-[#FAF9F5] dark:bg-[#13261c] border border-[#0D3823]/10 flex items-center justify-center text-3xl shadow-inner">
          📷
        </div>

        <div className="space-y-1.5 max-w-md">
          <h3 className="text-lg sm:text-xl font-black text-[#19241C] dark:text-white">
            📷 Aucune photo ajoutée
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Ajoutez jusqu'à {MAX_PHOTOS_PER_ACTIVITY} photos pour illustrer cette activité.
          </p>
        </div>

        {onOpenUploadModal && (
          <button
            type="button"
            onClick={onOpenUploadModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0D3823] dark:bg-[#1E4D34] hover:bg-[#145334] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>+ AJOUTER DES PHOTOS</span>
          </button>
        )}
      </div>
    );
  }

  const activePhoto = photos[currentIndex] || photos[0];

  return (
    <>
      <div
        className={`bg-white dark:bg-[#0f1f17] rounded-3xl border border-[#0D3823]/10 dark:border-[#D4AF37]/20 overflow-hidden shadow-sm flex flex-col ${className}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Top bar with activity label & manage button */}
        <div className="p-3 sm:p-4 bg-white dark:bg-[#102018] border-b border-gray-100 dark:border-[#1E4D34]/30 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{activityConfig.icon}</span>
            <span className="text-xs sm:text-sm font-extrabold text-[#0D3823] dark:text-emerald-300">
              {titleOverride || activityConfig.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FAF9F5] dark:bg-[#0c1a13] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#1E4D34]/40">
              Photo {currentIndex + 1} / {photos.length}
            </span>

            {onOpenUploadModal && (
              <button
                type="button"
                onClick={onOpenUploadModal}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-bold transition-all cursor-pointer"
                title="Gérer les photos de cette activité"
              >
                <Plus className="w-3.5 h-3.5 text-[#0D3823] dark:text-[#D4AF37]" />
                <span className="hidden sm:inline">Gérer ({photos.length}/{MAX_PHOTOS_PER_ACTIVITY})</span>
                <span className="sm:hidden">Gérer</span>
              </button>
            )}
          </div>
        </div>

        {/* Carousel Visual Viewport */}
        <div
          className="relative w-full aspect-[16/9] sm:aspect-[21/10] bg-black overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Active Photo with smooth transition */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <img
              src={activePhoto.dataUrl}
              alt={activePhoto.title || `Photo de ${activityConfig.shortTitle}`}
              className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
            />
          </div>

          {/* Bottom Gradient overlay for legibility */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

          {/* Photo caption / Location overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white z-10 flex items-end justify-between gap-4 pointer-events-none">
            <div className="space-y-0.5">
              <h4 className="font-extrabold text-sm sm:text-base drop-shadow-md line-clamp-1">
                {activePhoto.title || `Activité ${activityConfig.shortTitle}`}
              </h4>
              {activePhoto.location && (
                <p className="text-xs text-emerald-200 flex items-center gap-1 drop-shadow-sm">
                  <MapPin className="w-3 h-3 text-[#D4AF37]" />
                  <span>{activePhoto.location}</span>
                </p>
              )}
            </div>

            {/* Lightbox Trigger */}
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="pointer-events-auto p-2 rounded-xl bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
              title="Agrandir en plein écran"
              aria-label="Agrandir en plein écran"
            >
              <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Previous Arrow Button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-all shadow-md active:scale-95 cursor-pointer z-10"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          )}

          {/* Next Arrow Button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-all shadow-md active:scale-95 cursor-pointer z-10"
              aria-label="Photo suivante"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          )}
        </div>

        {/* Carousel Indicators / Dots (scrollable for up to 50 photos) */}
        {photos.length > 1 && (
          <div className="p-2.5 bg-white dark:bg-[#102018] flex items-center justify-center border-t border-gray-100 dark:border-[#1E4D34]/30 overflow-hidden">
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full px-2 py-1 scrollbar-none">
              {photos.map((_, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`transition-all rounded-full cursor-pointer shrink-0 ${
                      isActive
                        ? 'w-6 h-2 bg-[#0D3823] dark:bg-[#D4AF37]'
                        : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                    }`}
                    aria-label={`Aller à la photo ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Full-Screen View */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close & Info */}
            <div className="flex items-center justify-between text-white p-3">
              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  {activityConfig.title}
                </span>
                <h3 className="text-base sm:text-lg font-black">
                  {activePhoto.title || `Photo ${currentIndex + 1}`}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Main Image */}
            <div className="relative bg-black rounded-3xl overflow-hidden flex items-center justify-center min-h-[350px] max-h-[75vh]">
              <img
                src={activePhoto.dataUrl}
                alt={activePhoto.title || 'Aperçu plein écran'}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
                    aria-label="Photo précédente"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
                    aria-label="Photo suivante"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Dots */}
            {photos.length > 1 && (
              <div className="flex items-center justify-center gap-2 pt-3">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`transition-all rounded-full cursor-pointer ${
                      idx === currentIndex
                        ? 'w-6 h-2 bg-[#D4AF37]'
                        : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
