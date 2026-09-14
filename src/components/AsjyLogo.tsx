import React from 'react';

interface AsjyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightText?: boolean;
  variant?: 'standard' | 'badge-only';
}

export const AsjyOfficialEmblemSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Logo Officiel Association Andeu Setal Jummah Yi (ASJY)"
  >
    {/* Outer Oval Border */}
    <ellipse cx="250" cy="250" rx="236" ry="212" fill="#FFFFFF" stroke="#006847" strokeWidth="9" />

    {/* 8-Pointed Islamic Star (Rub el Hizb) */}
    <polygon
      points="
        250,74 
        281.7,105.7 
        326.5,105.7 
        326.5,150.5 
        358,182 
        326.5,213.5 
        326.5,258.3 
        281.7,258.3 
        250,290 
        218.3,258.3 
        173.5,258.3 
        173.5,213.5 
        142,182 
        173.5,150.5 
        173.5,105.7 
        218.3,105.7
      "
      fill="#006847"
    />

    {/* Crescent and Star above the Dome Finial */}
    <g fill="#FFFFFF">
      {/* 5-pointed star */}
      <polygon points="256,116 257.5,120 261.5,120 258.3,122.5 259.5,126.5 256,124 252.5,126.5 253.7,122.5 250.5,120 254.5,120" />
      {/* Crescent Moon */}
      <path d="M247,112 A7,7 0 1,0 255,126 A8.5,8.5 0 1,1 247,112 Z" />
    </g>

    {/* Mosque Silhouette in Crisp White on Green Star */}
    <g fill="#FFFFFF">
      {/* Left Minaret */}
      <polygon points="190,120 186,155 194,155" />
      <circle cx="190" cy="119" r="1.5" />
      <rect x="183" y="155" width="14" height="6" rx="1" />
      <rect x="185.5" y="161" width="9" height="75" />
      <polygon points="183,236 197,236 198,245 182,245" />

      {/* Right Minaret */}
      <polygon points="310,120 306,155 314,155" />
      <circle cx="310" cy="119" r="1.5" />
      <rect x="303" y="155" width="14" height="6" rx="1" />
      <rect x="305.5" y="161" width="9" height="75" />
      <polygon points="303,236 317,236 318,245 302,245" />

      {/* Central Dome */}
      <rect x="249" y="125" width="2" height="12" />
      <circle cx="250" cy="126" r="2.5" />
      <path d="M250,135 C242,143 218,155 218,180 L282,180 C282,155 258,143 250,135 Z" />
      <rect x="215" y="180" width="70" height="5" rx="1" />
      <rect x="216" y="185" width="68" height="60" />
    </g>

    {/* Arched Windows Cutouts on Facade & Minarets */}
    <g fill="#006847">
      <path d="M188,178 A2,2 0 0,1 192,178 L192,192 A2,2 0 0,1 188,192 Z" />
      <path d="M308,178 A2,2 0 0,1 312,178 L312,192 A2,2 0 0,1 308,192 Z" />
      <path d="M225,200 A5,5 0 0,1 235,200 L235,242 L225,242 Z" />
      <path d="M243,195 A7,7 0 0,1 257,195 L257,242 L243,242 Z" />
      <path d="M265,200 A5,5 0 0,1 275,200 L275,242 L265,242 Z" />
    </g>

    {/* Open Quran Book in Foreground */}
    {/* Stand/Rehal */}
    <polygon points="250,296 238,284 262,284" fill="#006847" />
    <path d="M250,296 L230,302 L230,296 L245,291 Z" fill="#006847" />
    <path d="M250,296 L270,302 L270,296 L255,291 Z" fill="#006847" />

    {/* Page Volume Edges */}
    <path
      d="M250,283 C215,274 165,260 152,246 C150,244 149,252 149,255 C155,268 215,285 250,295 Z"
      fill="#006847"
    />
    <path
      d="M250,283 C285,274 335,260 348,246 C350,244 351,252 351,255 C345,268 285,285 250,295 Z"
      fill="#006847"
    />

    {/* Left Curved Pages Stack */}
    <path
      d="M250,277 C215,268 170,253 155,240 C155,240 152,248 152,251 C165,263 215,278 250,288 Z"
      fill="#FFFFFF"
      stroke="#006847"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M250,270 C215,261 170,246 156,233 C154,236 153,242 153,245 C168,257 215,272 250,282 Z"
      fill="#FFFFFF"
      stroke="#006847"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    {/* Right Curved Pages Stack */}
    <path
      d="M250,277 C285,268 330,253 345,240 C345,240 348,248 348,251 C335,263 285,278 250,288 Z"
      fill="#FFFFFF"
      stroke="#006847"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M250,270 C285,261 330,246 344,233 C346,236 347,242 347,245 C332,257 285,272 250,282 Z"
      fill="#FFFFFF"
      stroke="#006847"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    {/* Top White Pages Surface */}
    <path
      d="M250,265 C220,255 175,238 158,224 C156,227 155,235 155,238 C170,250 220,266 250,276 C280,266 330,250 345,238 C345,235 344,227 342,224 C325,238 280,255 250,265 Z"
      fill="#FFFFFF"
      stroke="#006847"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />

    {/* Book Spine Line */}
    <line x1="250" y1="265" x2="250" y2="295" stroke="#006847" strokeWidth="2.5" />

    {/* Edge details */}
    <line x1="345" y1="238" x2="349" y2="251" stroke="#006847" strokeWidth="2" />
    <line x1="155" y1="238" x2="151" y2="251" stroke="#006847" strokeWidth="2" />

    {/* Subtle Quran Script Lines */}
    <path d="M174,236 C195,246 220,254 242,259" stroke="#006847" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M172,242 C194,251 220,259 242,264" stroke="#006847" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M175,248 C196,256 220,264 242,269" stroke="#006847" strokeWidth="1.8" strokeLinecap="round" fill="none" />

    <path d="M258,259 C280,254 305,246 326,236" stroke="#006847" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M258,264 C280,259 306,251 328,242" stroke="#006847" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M258,269 C280,264 304,256 325,248" stroke="#006847" strokeWidth="1.8" strokeLinecap="round" fill="none" />

    {/* Official Typography */}
    <text
      x="250"
      y="336"
      textAnchor="middle"
      fontFamily="'Plus Jakarta Sans', sans-serif"
      fontSize="20.5"
      fontWeight="800"
      fill="#006847"
      letterSpacing="0.4"
    >
      ASSOCIATION ANDEU SETAL JUMMAH YI
    </text>

    <text
      x="250"
      y="374"
      textAnchor="middle"
      fontFamily="'Plus Jakarta Sans', sans-serif"
      fontSize="26"
      fontWeight="900"
      fill="#006847"
      letterSpacing="3.5"
    >
      ASJY
    </text>
  </svg>
);

export const AsjyLogo: React.FC<AsjyLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  lightText = false,
  variant = 'standard'
}) => {
  const iconDimensions = {
    sm: 'w-10 h-10',
    md: 'w-13 h-13 sm:w-14 sm:h-14',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-28 h-28 sm:w-36 sm:h-36'
  }[size];

  if (variant === 'badge-only') {
    return (
      <div className={`inline-flex shrink-0 ${iconDimensions} ${className}`} title="Association Andeu Setal Jummah Yi (ASJY)">
        <AsjyOfficialEmblemSvg />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`} id="asjy-logo-container">
      {/* Official Insignia Symbol from User Attachment */}
      <div
        className={`${iconDimensions} rounded-2xl bg-white p-1 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center relative border border-[#006847]/20 shrink-0 ring-2 ring-[#006847]/10`}
        title="Association Andeu Setal Jummah Yi — Logo Officiel"
      >
        <AsjyOfficialEmblemSvg />
      </div>

      {showText && (
        <div className="flex flex-col leading-tight text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-wider uppercase text-base sm:text-lg ${
                lightText ? 'text-white' : 'text-[#0D3823]'
              }`}
            >
              ASJY
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
            <span
              className={`text-[10px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded ${
                lightText
                  ? 'bg-white/10 text-emerald-200 border border-white/10'
                  : 'bg-[#0D3823]/10 text-[#0D3823]'
              }`}
            >
              Sénégal
            </span>
          </div>
          <span
            className={`font-bold tracking-tight text-xs sm:text-sm uppercase ${
              lightText ? 'text-[#FAF9F5]/90' : 'text-[#19241C]'
            }`}
          >
            Andeu Setal Jummah Yi
          </span>
          <span className="text-[10.5px] italic text-[#C59B27] font-medium leading-none mt-0.5">
            « Jeff té YALLA rek takh »
          </span>
        </div>
      )}
    </div>
  );
};

