import React, { useState } from 'react';
import { AsjyLogo } from './AsjyLogo';
import { Image as ImageIcon } from 'lucide-react';

interface AsjyImageProps {
  src: string;
  alternateSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackTitle?: string;
  filename?: string;
}

export const AsjyImage: React.FC<AsjyImageProps> = ({
  src,
  alternateSrc,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'w-full h-full',
  fallbackTitle,
  filename
}) => {
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [triedAlt, setTriedAlt] = useState(false);

  const handleError = () => {
    if (!triedAlt && alternateSrc) {
      setTriedAlt(true);
      setCurrentSrc(alternateSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0D3823]/5 to-[#D4AF37]/10 dark:from-[#0D3823]/20 dark:to-[#091a11] border border-[#0D3823]/10 dark:border-emerald-800/30 ${containerClassName}`}
      >
        <div className="w-14 h-14 mb-3 rounded-full bg-white dark:bg-[#0D3823]/50 p-2 shadow-sm border border-[#D4AF37]/30 flex items-center justify-center">
          <AsjyLogo className="w-10 h-10" />
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0D3823] dark:text-emerald-400 bg-[#0D3823]/10 dark:bg-emerald-900/40 px-2.5 py-0.5 rounded-full mb-1.5 inline-flex items-center gap-1">
          <ImageIcon className="w-3 h-3 text-[#D4AF37]" />
          Photo Officielle ASJY
        </span>
        <p className="text-xs font-bold text-[#19241C] dark:text-white max-w-xs line-clamp-2">
          {fallbackTitle || alt}
        </p>
        {filename && (
          <p className="text-[10px] text-gray-400 font-mono mt-1">
            Fichier : {filename}
          </p>
        )}
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      className={className}
      loading="lazy"
    />
  );
};
