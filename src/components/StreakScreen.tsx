import React, { useState } from 'react';
import { Flame, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STREAK_MILESTONES } from '../data/constants';

export const StreakScreen: React.FC = () => {
  const { streak, resetCurrentStreak, confirmStreakDay, settings, accentConfig } = useApp();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const now = new Date();
  const todayKey = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
  const didLogToday = streak.history.some((entry) => entry.date === todayKey && !entry.reset);

  const cardStyle = settings.reduceTransparency
    ? 'solid-panel'
    : settings.glassIntensity === 'tinted'
    ? 'glass-panel-tinted'
    : 'glass-panel';

  return (
    <div className="space-y-5 pb-12">
      {/* Title */}
      <div className="pt-4 pb-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          No-contact streak
        </h1>
        <p className="text-xs text-white/50 mt-0.5">
          Self-mastery · One day at a time
        </p>
      </div>

      {/* Main Big Counter Card */}
      <section className={`p-8 text-center ${cardStyle}`}>
        <div
          className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 transition-all"
          style={{ backgroundColor: `${accentConfig.hex}15` }}
        >
          <Flame
            className="w-8 h-8"
            style={{ color: accentConfig.hex }}
          />
        </div>

        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white tabular-nums">
            {streak.current}
          </span>
          <span className="text-lg font-medium text-white/60">days</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-white/50 mt-2">
          <ShieldCheck className="w-4 h-4 text-white/40" />
          <span>All-time best: {streak.best} days</span>
        </div>
      </section>

      {/* Milestones Card */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <h2 className="text-sm font-semibold tracking-tight text-white/95 mb-3.5">
          Milestones
        </h2>

        <div className="grid grid-cols-5 gap-2 text-center">
          {STREAK_MILESTONES.map((days) => {
            const isReached = streak.current >= days;

            return (
              <div key={days} className="flex flex-col items-center gap-2">
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-xs transition-all ${
                    isReached
                      ? 'text-zinc-950 shadow-md font-extrabold'
                      : 'bg-white/5 border border-white/10 text-white/30'
                  }`}
                  style={{
                    backgroundColor: isReached ? accentConfig.hex : undefined,
                    boxShadow: isReached ? accentConfig.glowStyle : undefined,
                  }}
                >
                  <span className="tabular-nums">{days}</span>
                </div>
                <span className="text-[10px] text-white/40">{days}d</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Honest daily check-in and explicit reset */}
      <section className={`p-4 sm:p-5 ${cardStyle} space-y-4`}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xs font-semibold text-white/90">Today's check-in</h3>
            <p className="text-[11px] text-white/45 mt-0.5">
              Confirm your no-contact goal honestly, once per day.
            </p>
          </div>
          <button
            onClick={confirmStreakDay}
            disabled={didLogToday}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{ backgroundColor: didLogToday ? 'rgba(255,255,255,0.10)' : accentConfig.hex, color: didLogToday ? 'white' : '#111318' }}
          >
            {didLogToday ? "Logged today ✓" : "Confirm today"}
          </button>
        </div>
        <div className="border-t border-white/10 pt-3 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-semibold text-white/80">Reset current streak</h3>
            <p className="text-[11px] text-white/40 mt-0.5">Best streak and history remain preserved.</p>
          </div>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium border border-red-500/20 transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </section>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="max-w-sm w-full p-6 rounded-3xl bg-[#1A1C22] border border-white/15 text-white shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-white mb-1.5">
              Reset streak?
            </h3>
            <p className="text-xs text-white/60 leading-relaxed mb-6">
              This will reset only your current streak to 0. Your best streak of{' '}
              <strong className="text-white">{streak.best} days</strong> and your historical records will stay intact.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetCurrentStreak();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
