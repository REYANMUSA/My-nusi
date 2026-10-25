import React from 'react';
import { Dumbbell, ChevronRight, Check, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WEEKLY_GYM_SCHEDULE } from '../data/constants';

export const GymCard: React.FC = () => {
  const {
    gym,
    selectedGymDay,
    setSelectedGymDay,
    setIsGymDrawerOpen,
    settings,
    accentConfig,
  } = useApp();

  const cardStyle = settings.reduceTransparency
    ? 'solid-panel'
    : settings.glassIntensity === 'tinted'
    ? 'glass-panel-tinted'
    : 'glass-panel';

  const daysMeta = [
    { idx: 1, label: 'M', name: 'Mon' },
    { idx: 2, label: 'T', name: 'Tue' },
    { idx: 3, label: 'W', name: 'Wed' },
    { idx: 4, label: 'T', name: 'Thu' },
    { idx: 5, label: 'F', name: 'Fri' },
    { idx: 6, label: 'S', name: 'Sat' },
    { idx: 0, label: 'S', name: 'Sun' },
  ];

  const todayDayIdx = new Date().getDay();

  return (
    <section className={`p-4 sm:p-5 ${cardStyle}`}>
      {/* Header with Day Selector */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold tracking-tight text-white/95">
            Gym
          </h2>
          <span className="text-[11px] text-white/40">
            {gym.dayName} {selectedGymDay === todayDayIdx ? '· Today' : ''}
          </span>
        </div>

        {/* Quick day switcher (M T W T F S S) */}
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/5">
          {daysMeta.map((d) => {
            const isSelected = selectedGymDay === d.idx;
            const isActualToday = todayDayIdx === d.idx;

            return (
              <button
                key={d.name}
                onClick={() => setSelectedGymDay(d.idx)}
                className={`w-6 h-6 rounded-lg text-[10px] font-semibold transition-all cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? 'text-zinc-950 font-bold'
                    : isActualToday
                    ? 'text-white bg-white/10'
                    : 'text-white/40 hover:text-white/70'
                }`}
                style={{
                  backgroundColor: isSelected ? accentConfig.hex : undefined,
                }}
                title={`${d.name}: ${WEEKLY_GYM_SCHEDULE[d.idx].title}`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Single Functional Key / Trigger as requested:
          "don't make it all appear in one js functional one key and when I tap it it contain that... give it a full page when tapping the gym open in all screen" */}
      <div
        onClick={() => setIsGymDrawerOpen(true)}
        className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
            style={{
              backgroundColor: gym.isRestDay ? 'rgba(99, 102, 241, 0.15)' : `${accentConfig.hex}20`,
            }}
          >
            {gym.isRestDay ? (
              <Moon className="w-5 h-5 text-indigo-300" />
            ) : (
              <Dumbbell className="w-5 h-5" style={{ color: accentConfig.hex }} />
            )}
          </div>

          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                {gym.title}
              </span>
              <span className="text-[10px] text-white/50 truncate">
                · {gym.focus}
              </span>
            </div>
            <span className="text-xs text-white/40 block mt-0.5 tabular-nums">
              {gym.isRestDay
                ? 'Muscles rebuild & recover · Tap for details'
                : `${gym.exercises.length} exercises with form cues · Tap for full page`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-2">
          {gym.completed && (
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-zinc-950 font-bold"
              style={{ backgroundColor: accentConfig.hex }}
            >
              <Check className="w-3 h-3 stroke-[3]" />
            </span>
          )}
          <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
        </div>
      </div>
    </section>
  );
};
