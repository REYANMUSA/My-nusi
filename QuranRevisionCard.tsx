import React, { useState } from 'react';
import { Plus, Minus, Edit2, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QuranRevisionCard: React.FC = () => {
  const {
    quran,
    logQuranPage,
    setJuz,
    setWeakestPage,
    settings,
    accentConfig,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [tempJuz, setTempJuz] = useState(quran.currentJuz);
  const [tempWeakest, setTempWeakest] = useState(quran.weakestPage);

  const cardStyle = settings.reduceTransparency
    ? 'solid-panel'
    : settings.glassIntensity === 'tinted'
    ? 'glass-panel-tinted'
    : 'glass-panel';

  const saveEdits = () => {
    setJuz(Number(tempJuz));
    setWeakestPage(Number(tempWeakest));
    setIsEditing(false);
  };

  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <section className={`p-4 sm:p-5 ${cardStyle}`}>
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-sm font-semibold tracking-tight text-white/95">
          Qur&apos;an revision
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/45">Today</span>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 rounded-md text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors cursor-pointer"
            title="Edit Juz and weakest page"
          >
            {isEditing ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Edit2 className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Main Target & Counter Display */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 mb-3.5">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold tracking-tight text-white tabular-nums">
              {quran.completedPagesToday}
            </span>
            <span className="text-sm text-white/50">
              / {quran.targetPages} pages
            </span>
          </div>

          {!isEditing ? (
            <div className="flex items-center gap-2 text-xs text-white/60 mt-1">
              <span>Juz {quran.currentJuz}</span>
              <span>·</span>
              <span>Weakest page: {quran.weakestPage}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-white/80 mt-1.5">
              <label className="flex items-center gap-1">
                <span className="text-[10px] text-white/50">Juz:</span>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={tempJuz}
                  onChange={(e) => setTempJuz(Number(e.target.value))}
                  className="w-10 px-1 py-0.5 rounded bg-black/40 border border-white/10 text-center text-xs"
                />
              </label>
              <label className="flex items-center gap-1">
                <span className="text-[10px] text-white/50">Page:</span>
                <input
                  type="number"
                  min="1"
                  max="604"
                  value={tempWeakest}
                  onChange={(e) => setTempWeakest(Number(e.target.value))}
                  className="w-12 px-1 py-0.5 rounded bg-black/40 border border-white/10 text-center text-xs"
                />
              </label>
              <button
                onClick={saveEdits}
                className="px-2 py-0.5 rounded bg-white/10 text-[10px] hover:bg-white/20"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Quick Page Stepper */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => logQuranPage(-1)}
            disabled={quran.completedPagesToday <= 0}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Decrease completed page"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => logQuranPage(1)}
            disabled={quran.completedPagesToday >= quran.targetPages}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Increase completed page"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar for Today */}
      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden mb-3">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${(quran.completedPagesToday / quran.targetPages) * 100}%`,
            backgroundColor: accentConfig.hex,
            boxShadow: accentConfig.glowStyle,
          }}
        />
      </div>

      {/* Week Progress Row (Mon - Sun circles) */}
      <div className="flex items-center justify-between pt-1 text-[11px] text-white/50">
        <span className="text-[10px]">Week progress</span>
        <div className="flex items-center gap-1.5">
          {quran.weeklyCompletedDays.map((isDone, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-semibold transition-colors ${
                  isDone
                    ? 'text-zinc-950 font-bold'
                    : 'bg-white/5 border border-white/10 text-white/30'
                }`}
                style={{
                  backgroundColor: isDone ? accentConfig.hex : undefined,
                  borderColor: isDone ? accentConfig.hex : undefined,
                }}
              >
                {isDone ? '✓' : ''}
              </div>
              <span className="text-[9px] text-white/40">{dayLabels[idx]}</span>
            </div>
          ))}
          <span className="ml-2 text-xs font-semibold tabular-nums text-white/80">
            {quran.weeklyCompletedDays.filter(Boolean).length}/7
          </span>
        </div>
      </div>
    </section>
  );
};
