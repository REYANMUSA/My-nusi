import React from 'react';
import { useApp } from '../context/AppContext';

export const BackgroundWallpaper: React.FC = () => {
  const { themeConfig, settings } = useApp();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base Canvas Gradient */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background: themeConfig.gradient,
        }}
      />

      {/* Atmospheric Silhouette for Dusk (moody mountain / pine landscape) */}
      {settings.theme === 'dusk' && (
        <div className="absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-700">
          <svg
            className="w-full h-full object-cover"
            preserveAspectRatio="none"
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="fogGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E2D33" stopOpacity="0" />
                <stop offset="50%" stopColor="#131F24" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0B1013" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {/* Distant mountain silhouette */}
            <path
              d="M0 600 L180 480 L350 560 L520 440 L700 550 L860 460 L1000 540 L1000 1000 L0 1000 Z"
              fill="#10191D"
              opacity="0.6"
            />
            {/* Midground ridge */}
            <path
              d="M0 680 L220 590 L420 670 L640 580 L820 660 L1000 600 L1000 1000 L0 1000 Z"
              fill="#0B1215"
              opacity="0.8"
            />
            {/* Foreground pines silhouette */}
            <path
              d="M0 800 C150 780 280 820 400 790 C550 750 700 810 1000 770 L1000 1000 L0 1000 Z"
              fill="#070C0E"
            />
            {/* Soft fog overlay */}
            <rect width="1000" height="1000" fill="url(#fogGrad)" />
          </svg>
        </div>
      )}

      {/* Subtle organic noise/vignette overlay for tactile glass depth */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(10,11,14,0.45)_100%] pointer-events-none" />
    </div>
  );
};
