import React from 'react';
import { useApp } from '../context/AppContext';

export const ProgressScreen: React.FC = () => {
  const {
    tasks,
    weeklyFocusMinutes,
    weeklyRingsFraction,
    streak,
    quran,
    settings,
    accentConfig,
  } = useApp();

  const cardStyle = settings.reduceTransparency
    ? 'solid-panel'
    : settings.glassIntensity === 'tinted'
    ? 'glass-panel-tinted'
    : 'glass-panel';

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxFocus = Math.max(...weeklyFocusMinutes, 60);
  const todayWeekIndex = (new Date().getDay() + 6) % 7;

  const completedTasks = tasks.filter((t) => t.completed);
  const unfinishedTasks = tasks.filter((t) => !t.completed);

  return (
    <div className="space-y-4 pb-12">
      {/* Title */}
      <div className="pt-4 pb-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Progress
        </h1>
        <p className="text-xs text-white/50 mt-0.5">
          Current week · Honest factual tracking
        </p>
      </div>

      {/* 1. Week at a Glance: Seven Day Circles */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <h2 className="text-sm font-semibold tracking-tight text-white/95 mb-3.5">
          Week at a glance
        </h2>

        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
          {dayNames.map((day, idx) => {
            const fraction = weeklyRingsFraction[idx] || 0;
            const isCompleted = fraction >= 0.99;
            const isPartial = fraction > 0 && fraction < 0.99;
            const isFuture = idx > todayWeekIndex;

            return (
              <div key={day} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                    isFuture
                      ? 'border border-dashed border-white/10 text-white/20'
                      : isCompleted
                      ? 'text-zinc-950 font-bold'
                      : isPartial
                      ? 'border-2 text-white'
                      : 'border border-white/15 text-white/30'
                  }`}
                  style={{
                    backgroundColor: isCompleted ? accentConfig.hex : undefined,
                    borderColor: isPartial ? accentConfig.hex : undefined,
                    boxShadow: isCompleted ? accentConfig.glowStyle : undefined,
                  }}
                >
                  <span className="text-[11px] font-semibold tabular-nums">
                    {isCompleted ? '✓' : isFuture ? '' : isPartial ? `${Math.round(fraction * 100)}%` : '—'}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-white/50">{day}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Focus Time Bar Chart for Current Week */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold tracking-tight text-white/95">
            Focus time
          </h2>
          <span className="text-[11px] text-white/40">
            Total {weeklyFocusMinutes.reduce((a, b) => a + b, 0)}m this week
          </span>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-36 pt-4 pb-2 px-1">
          {dayNames.map((day, idx) => {
            const mins = weeklyFocusMinutes[idx] || 0;
            const heightPercent = maxFocus > 0 ? (mins / maxFocus) * 100 : 0;

            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-medium tabular-nums text-white/60">
                  {mins > 0 ? `${mins}m` : ''}
                </span>
                <div className="w-full max-w-[28px] bg-white/5 rounded-t-lg overflow-hidden h-full flex items-end">
                  <div
                    className="w-full rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${Math.max(4, heightPercent)}%`,
                      backgroundColor: mins > 0 ? accentConfig.hex : 'transparent',
                    }}
                  />
                </div>
                <span className="text-[10px] font-medium text-white/50">{day}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Done vs Not Done Breakdown */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <h2 className="text-sm font-semibold tracking-tight text-white/95 mb-3">
          Done vs Not done
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-[11px] text-white/50 block">Completed</span>
            <span className="text-xl font-bold text-white tabular-nums">
              {completedTasks.length}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-[11px] text-white/50 block">Unfinished</span>
            <span className="text-xl font-bold text-white tabular-nums">
              {unfinishedTasks.length}
            </span>
          </div>
        </div>

        {/* Breakdown list */}
        <div className="space-y-1.5 text-xs">
          {completedTasks.map((t) => (
            <div key={t.id} className="flex items-center justify-between text-white/60 py-1">
              <span className="flex items-center gap-2 truncate">
                <span className="text-green-400">✓</span>
                <span className="line-through truncate">{t.title}</span>
              </span>
              <span className="text-[10px] text-white/40 shrink-0">Done</span>
            </div>
          ))}

          {unfinishedTasks.map((t) => (
            <div key={t.id} className="flex items-center justify-between text-white/80 py-1">
              <span className="flex items-center gap-2 truncate">
                <span className="text-white/30">○</span>
                <span className="truncate">{t.title}</span>
              </span>
              <span className="text-[10px] text-amber-400/70 shrink-0">Planned</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Qur'an Progress & Weakest Page */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <h2 className="text-sm font-semibold tracking-tight text-white/95 mb-3">
          Qur&apos;an progress
        </h2>
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] text-white/45 block">Current Juz</span>
            <span className="text-lg font-bold text-white tabular-nums">
              {quran.currentJuz}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] text-white/45 block">Weakest page</span>
            <span className="text-lg font-bold text-white tabular-nums">
              {quran.weakestPage}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] text-white/45 block">Days logged</span>
            <span className="text-lg font-bold text-white tabular-nums">
              {quran.weeklyCompletedDays.filter(Boolean).length}/7
            </span>
          </div>
        </div>
      </section>

      {/* 5. Streaks Summary */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <h2 className="text-sm font-semibold tracking-tight text-white/95 mb-2">
          No-contact streak
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-white tabular-nums">
              {streak.current}
            </span>
            <span className="text-xs text-white/60 ml-1">days current</span>
          </div>
          <div className="text-right">
            <span className="text-base font-semibold text-white/80 tabular-nums">
              {streak.best} days
            </span>
            <span className="text-[10px] text-white/40 block">All-time best</span>
          </div>
        </div>
      </section>
    </div>
  );
};
