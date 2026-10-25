import React from 'react';

interface Props {
  type: string;
  className?: string;
  accentColor?: string;
}

export const GymExerciseIllustration: React.FC<Props> = ({
  type,
  className = 'w-12 h-12',
  accentColor = '#22C55E',
}) => {
  switch (type) {
    case 'incline_bench':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Incline bench frame */}
          <line x1="12" y1="46" x2="38" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
          <line x1="38" y1="20" x2="48" y2="28" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
          <line x1="26" y1="32" x2="26" y2="52" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" />
          <line x1="10" y1="52" x2="54" y2="52" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
          {/* Dumbbells / Barbells */}
          <circle cx="28" cy="18" r="4.5" fill={accentColor} />
          <line x1="22" y1="18" x2="34" y2="18" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          {/* Muscle highlight indicator */}
          <circle cx="32" cy="27" r="2.5" fill={accentColor} opacity="0.8" />
        </svg>
      );

    case 'flat_bench':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Flat bench horizontal pad */}
          <rect x="12" y="34" width="40" height="5" rx="2" fill="rgba(255,255,255,0.4)" />
          <line x1="20" y1="39" x2="20" y2="52" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" />
          <line x1="44" y1="39" x2="44" y2="52" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" />
          <line x1="8" y1="52" x2="56" y2="52" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
          {/* Barbell suspended */}
          <line x1="10" y1="22" x2="54" y2="22" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <rect x="14" y="16" width="3.5" height="12" rx="1.5" fill={accentColor} />
          <rect x="46.5" y="16" width="3.5" height="12" rx="1.5" fill={accentColor} />
        </svg>
      );

    case 'overhead_press':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Head & torso silhouette */}
          <circle cx="32" cy="36" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
          <path d="M24 48 C24 43 27 41 32 41 C37 41 40 43 40 48" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms pressing up */}
          <path d="M22 41 L18 26 L14 18" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M42 41 L46 26 L50 18" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Barbell overhead */}
          <line x1="8" y1="16" x2="56" y2="16" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <circle cx="12" cy="16" r="3.5" fill={accentColor} />
          <circle cx="52" cy="16" r="3.5" fill={accentColor} />
        </svg>
      );

    case 'lateral_raise':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="22" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
          <line x1="32" y1="27" x2="32" y2="48" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
          {/* Arms flared lateral in T-position */}
          <path d="M12 32 L32 30 L52 32" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <circle cx="12" cy="32" r="4" fill={accentColor} />
          <circle cx="52" cy="32" r="4" fill={accentColor} />
          {/* Motion arc lines */}
          <path d="M16 42 Q 12 36 12 32" stroke={accentColor} strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M48 42 Q 52 36 52 32" stroke={accentColor} strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      );

    case 'tricep_rope':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Top Pulley wheel */}
          <circle cx="32" cy="12" r="4.5" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
          <line x1="32" y1="16.5" x2="32" y2="30" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          {/* Flared rope handles */}
          <path d="M32 30 L22 46" stroke={accentColor} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M32 30 L42 46" stroke={accentColor} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="21" cy="48" r="3.5" fill={accentColor} />
          <circle cx="43" cy="48" r="3.5" fill={accentColor} />
        </svg>
      );

    case 'lat_pulldown':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Pulley & Wide bar */}
          <circle cx="32" cy="10" r="3.5" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          <line x1="32" y1="13.5" x2="32" y2="22" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <path d="M8 26 L18 23 L46 23 L56 26" stroke={accentColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* V-Taper Lat indicators */}
          <path d="M26 34 L32 46 L38 34" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="30" r="3" fill="rgba(255,255,255,0.5)" />
        </svg>
      );

    case 'barbell_row':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* 45° Torso Hinge */}
          <circle cx="24" cy="20" r="4.5" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
          <line x1="26" y1="24" x2="38" y2="38" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
          <line x1="38" y1="38" x2="36" y2="52" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms pulling bar up */}
          <line x1="30" y1="28" x2="34" y2="40" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="40" x2="52" y2="40" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <rect x="18" y="35" width="3" height="10" rx="1" fill={accentColor} />
          <rect x="47" y="35" width="3" height="10" rx="1" fill={accentColor} />
        </svg>
      );

    case 'tbar_row':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <line x1="16" y1="50" x2="48" y2="18" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round" />
          <rect x="40" y="16" width="10" height="5" rx="1.5" transform="rotate(-45 40 16)" fill={accentColor} />
          <path d="M26 30 L38 34" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <circle cx="26" cy="30" r="3" fill={accentColor} />
        </svg>
      );

    case 'face_pull':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="44" cy="32" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
          <line x1="12" y1="32" x2="28" y2="32" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <path d="M28 32 L38 24" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M28 32 L38 40" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <circle cx="39" cy="23" r="3" fill={accentColor} />
          <circle cx="39" cy="41" r="3" fill={accentColor} />
        </svg>
      );

    case 'bicep_curl':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Torso & arm flexed */}
          <circle cx="32" cy="18" r="4.5" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <line x1="32" y1="22.5" x2="32" y2="44" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
          <path d="M28 26 L26 38 L36 30" stroke={accentColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="37" cy="29" r="4.5" fill={accentColor} />
        </svg>
      );

    case 'squat':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Squat depth silhouette */}
          <line x1="10" y1="18" x2="54" y2="18" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <rect x="12" y="13" width="3" height="10" rx="1" fill={accentColor} />
          <rect x="49" y="13" width="3" height="10" rx="1" fill={accentColor} />
          <circle cx="32" cy="23" r="4.5" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          {/* Deep squat legs */}
          <path d="M32 27 L32 38 L22 42 L24 54" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 38 L42 42 L40 54" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'rdl':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="22" r="4.5" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <path d="M22 26 L36 34 L38 52" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Barbell descending past knees */}
          <line x1="26" y1="28" x2="28" y2="44" stroke={accentColor} strokeWidth="2" />
          <line x1="16" y1="44" x2="42" y2="44" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <circle cx="16" cy="44" r="3.5" fill={accentColor} />
          <circle cx="42" cy="44" r="3.5" fill={accentColor} />
        </svg>
      );

    case 'leg_press':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* 45° Sled rail */}
          <line x1="14" y1="48" x2="48" y2="16" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round" />
          <rect x="36" y="22" width="14" height="6" rx="2" transform="rotate(-45 36 22)" fill={accentColor} />
          {/* Footplate */}
          <line x1="30" y1="36" x2="40" y2="26" stroke={accentColor} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'leg_curl':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="38" width="36" height="5" rx="2" fill="rgba(255,255,255,0.4)" />
          {/* Leg curled around roller */}
          <path d="M22 38 L34 38 L42 26" stroke={accentColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="43" cy="25" r="4" fill={accentColor} />
        </svg>
      );

    case 'calf_raise':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Step block */}
          <rect x="12" y="44" width="22" height="10" rx="1.5" fill="rgba(255,255,255,0.3)" />
          {/* Ankle extended high */}
          <line x1="28" y1="20" x2="28" y2="34" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="28" y1="34" x2="32" y2="44" stroke={accentColor} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="32" cy="44" r="3" fill={accentColor} />
        </svg>
      );

    default: // mobility
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="20" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
          {/* Curved spine stretch */}
          <path d="M22 46 Q 32 30 42 46" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="14" y1="52" x2="50" y2="52" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
};
