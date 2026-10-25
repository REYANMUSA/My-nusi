import React from 'react';
import { Flame, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StreakCard: React.FC = () => {
  const { streak, setCurrentTab, settings, accentConfig } = useApp();

  const cardStyle = settings.reduceTransparency
    ? 'solid-panel'
    : settings.glassIntensity === 'tinted'
    ? 'glass-panel-tinted'
    : 'glass-panel';

  return (
    <section
      onClick={() => setCurrentTab('streak')}
      className={`p-4 sm:p-5 ${cardStyle} cursor-pointer group hover:border-white/20 transition-all`}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold tracking-tight text-white/95">
          No-contact streak
        </h2>
        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
            style={{ backgroundColor: `${accentConfig.hex}20` }}
          >
            <Flame
              className="w-5 h-5"
              style={{ color: accentConfig.hex }}
            />
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-white tabular-nums">
                {streak.current}
              </span>
              <span className="text-xs text-white/60">days</span>
            </div>
            <span className="text-[11px] text-white/40 block">
              Best: {streak.best} days
            </span>
          </div>
        </div>

        {/* Milestone Indicator */}
        <div className="text-right">
          <span className="text-[10px] text-white/40 block">Next Milestone</span>
          <span className="text-xs font-semibold text-white/80 tabular-nums">
            {streak.current < 30 ? '30 days' : streak.current < 60 ? '60 days' : '90 days'}
          </span>
        </div>
      </div>
    </section>
  );
};
