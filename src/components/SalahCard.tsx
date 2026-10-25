import React, { useState } from 'react';
import { Clock, Moon, Sun, Sunrise, Sunset, Edit3, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrayerKey } from '../types';

export const SalahCard: React.FC = () => {
  const { prayersInfo, nextPrayer, prayerTimes, updatePrayerTime, settings, accentConfig } = useApp();
  const [isEditingTimes, setIsEditingTimes] = useState(false);

  const cardStyle = settings.reduceTransparency
    ? 'solid-panel'
    : settings.glassIntensity === 'tinted'
    ? 'glass-panel-tinted'
    : 'glass-panel';

  const getPrayerIcon = (key: PrayerKey, isNext: boolean) => {
    switch (key) {
      case 'fajr':
        return <Sunrise className={`w-4 h-4 ${isNext ? 'text-amber-300' : 'text-white/60'}`} />;
      case 'dhuhr':
        return <Sun className={`w-4 h-4 ${isNext ? 'text-amber-400' : 'text-white/60'}`} />;
      case 'asr':
        return <Sun className={`w-4 h-4 ${isNext ? 'text-orange-400' : 'text-white/60'}`} />;
      case 'maghrib':
        return <Sunset className={`w-4 h-4 ${isNext ? 'text-rose-400' : 'text-white/60'}`} />;
      case 'isha':
        return <Moon className={`w-4 h-4 ${isNext ? 'text-indigo-300' : 'text-white/60'}`} />;
    }
  };

  return (
    <section className={`p-4 sm:p-5 ${cardStyle}`}>
      {/* Header with next upcoming prayer countdown */}
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-white/95">
            Salat
          </h2>
          {nextPrayer && (
            <p className="text-[11px] text-white/50 mt-0.5">
              Next: <strong className="text-white font-medium">{nextPrayer.name}</strong>{' '}
              <span className="tabular-nums font-semibold" style={{ color: accentConfig.hex }}>
                ({nextPrayer.remainingFormatted})
              </span>
            </p>
          )}
        </div>

        <button
          onClick={() => setIsEditingTimes(!isEditingTimes)}
          className="p-1.5 rounded-lg text-white/35 hover:text-white/80 hover:bg-white/5 transition-colors cursor-pointer"
          title={isEditingTimes ? 'Done editing' : 'Adjust prayer times'}
          aria-label="Edit prayer times"
        >
          {isEditingTimes ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Edit3 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* 5 Prayers Grid (No task checklist marks, clean times and remaining badges) */}
      <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
        {prayersInfo.map((p) => {
          const isNext = p.isNext;

          return (
            <div
              key={p.key}
              className={`flex flex-col items-center py-2.5 px-1 rounded-2xl border transition-all duration-300 relative ${
                isNext
                  ? 'bg-white/[0.08] shadow-lg'
                  : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.05]'
              }`}
              style={{
                borderColor: isNext ? accentConfig.hex : undefined,
                boxShadow: isNext ? accentConfig.glowStyle : undefined,
              }}
            >
              {/* Prayer Icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 transition-colors ${
                  isNext ? 'bg-white/15' : 'bg-white/5'
                }`}
              >
                {getPrayerIcon(p.key, isNext)}
              </div>

              {/* Prayer Name */}
              <span
                className={`text-[11px] font-semibold tracking-tight ${
                  isNext ? 'text-white' : 'text-white/70'
                }`}
              >
                {p.name}
              </span>

              {/* Time display or editable input */}
              {!isEditingTimes ? (
                <span className="text-[10px] text-white/50 tabular-nums mt-0.5">
                  {p.timeStr}
                </span>
              ) : (
                <input
                  type="text"
                  value={prayerTimes[p.key]}
                  onChange={(e) => updatePrayerTime(p.key, e.target.value)}
                  className="w-12 text-[10px] text-center bg-black/60 border border-white/15 rounded py-0.5 text-white tabular-nums mt-0.5"
                />
              )}

              {/* Remaining time badge for next prayer */}
              {isNext ? (
                <div
                  className="mt-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-tight uppercase"
                  style={{
                    backgroundColor: `${accentConfig.hex}25`,
                    color: accentConfig.hex,
                  }}
                >
                  Next
                </div>
              ) : (
                <div className="h-4 mt-1.5" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
