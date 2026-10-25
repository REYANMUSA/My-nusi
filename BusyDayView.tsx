import React from 'react';
import { Sun, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SalahCard } from './SalahCard';
import { QuranRevisionCard } from './QuranRevisionCard';
import { BUSY_DAY_ANCHOR } from '../data/constants';

export const BusyDayView: React.FC = () => {
  const { settings, accentConfig } = useApp();

  const cardStyle = settings.reduceTransparency
    ? 'solid-panel'
    : settings.glassIntensity === 'tinted'
    ? 'glass-panel-tinted'
    : 'glass-panel';

  return (
    <div className="space-y-4">
      {/* Calm Header Card */}
      <section className={`p-5 text-center ${cardStyle}`}>
        <div
          className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-2.5"
          style={{ backgroundColor: `${accentConfig.hex}15` }}
        >
          <Sun
            className="w-5 h-5"
            style={{ color: accentConfig.hex }}
          />
        </div>
        <h2 className="text-base font-semibold tracking-tight text-white mb-0.5">
          {BUSY_DAY_ANCHOR.title}
        </h2>
        <p className="text-xs text-white/60">
          {BUSY_DAY_ANCHOR.subtitle}
        </p>
      </section>

      {/* 1. Salah Card (always first) */}
      <SalahCard />

      {/* 2. Qur'an Revision Card */}
      <QuranRevisionCard />

      {/* 3. Approved Love-Strengthening Message Card */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{ backgroundColor: `${accentConfig.hex}15` }}
          >
            <Heart
              className="w-4 h-4"
              style={{ color: accentConfig.hex }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white/95">
              {BUSY_DAY_ANCHOR.loveCardTitle}
            </h3>
            <p className="text-xs text-white/60 mb-2">
              {BUSY_DAY_ANCHOR.loveCardSubtitle}
            </p>

            {/* Evidence personally approved by the user */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-white/80 leading-relaxed italic">
              &ldquo;{settings.loveStrengtheningNotes}&rdquo;
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
