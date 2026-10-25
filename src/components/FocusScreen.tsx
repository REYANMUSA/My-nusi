import React, { useState } from 'react';
import { X, Play, Pause, Square, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FocusScreen: React.FC = () => {
  const {
    focusSession,
    startFocus,
    pauseFocus,
    resumeFocus,
    endFocus,
    isFocusModalOpen,
    setIsFocusModalOpen,
    accentConfig,
    settings,
  } = useApp();

  const [customDuration, setCustomDuration] = useState<number>(settings.defaultFocusDuration || 25);
  const durations = [15, 25, 45, 60];

  if (!isFocusModalOpen) return null;

  const totalSecs = focusSession ? focusSession.durationMinutes * 60 : customDuration * 60;
  const remainingSecs = focusSession ? focusSession.remainingSeconds : customDuration * 60;
  const fraction = totalSecs > 0 ? (totalSecs - remainingSecs) / totalSecs : 0;

  const mins = Math.floor(remainingSecs / 60);
  const secs = remainingSecs % 60;
  const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  const radius = 110;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - fraction);

  const adjustMinutes = (delta: number) => {
    setCustomDuration((prev) => Math.max(1, Math.min(180, prev + delta)));
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between p-6 bg-[#121316]/95 backdrop-blur-2xl text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsFocusModalOpen(false)}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close Focus View"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs font-medium tracking-wider uppercase text-white/50">
          Focus Session
        </span>

        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Center Countdown Ring */}
      <div className="flex flex-col items-center justify-center flex-1 my-6">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          <svg
            className="w-full h-full -rotate-90 transform"
            viewBox="0 0 256 256"
          >
            {/* Dim Track */}
            <circle
              cx="128"
              cy="128"
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth={strokeWidth}
            />
            {/* Animated Progress Stroke */}
            <circle
              cx="128"
              cy="128"
              r={radius}
              fill="transparent"
              stroke={accentConfig.hex}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(${accentConfig.glowStyle})`,
                transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </svg>

          {/* Central Time & Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white tabular-nums">
              {timeFormatted}
            </span>
            <span className="text-xs font-medium text-white/60 mt-1">
              {focusSession
                ? focusSession.isPaused
                  ? 'Paused'
                  : 'Focusing...'
                : `${customDuration} minutes`}
            </span>
            {focusSession?.taskTitle && (
              <span className="text-[11px] text-white/40 max-w-[180px] truncate mt-1">
                {focusSession.taskTitle}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="max-w-xs w-full mx-auto pb-4">
        {!focusSession ? (
          // Idle Controls
          <div className="space-y-3.5">
            {/* Preset chips */}
            <div className="grid grid-cols-4 gap-2">
              {durations.map((d) => (
                <button
                  key={d}
                  onClick={() => setCustomDuration(d)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    customDuration === d
                      ? 'text-zinc-950 font-bold'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                  style={{
                    backgroundColor: customDuration === d ? accentConfig.hex : undefined,
                    boxShadow: customDuration === d ? accentConfig.glowStyle : undefined,
                  }}
                >
                  {d}m
                </button>
              ))}
            </div>

            {/* Custom Minutes Stepper / Direct Input */}
            <div className="p-2.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/50 pl-1">Edit duration:</span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => adjustMinutes(-5)}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Subtract 5 minutes"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={customDuration}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) setCustomDuration(Math.max(1, Math.min(180, val)));
                    }}
                    className="w-14 text-center py-1 bg-black/70 border border-white/20 rounded-lg text-sm font-bold text-white tabular-nums focus:outline-none focus:border-white/50"
                  />
                  <span className="text-xs text-white/40">m</span>
                </div>

                <button
                  type="button"
                  onClick={() => adjustMinutes(5)}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Add 5 minutes"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={() => startFocus(customDuration)}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-zinc-950 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              style={{
                backgroundColor: accentConfig.hex,
                boxShadow: accentConfig.glowStyle,
              }}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start {customDuration}m Focus</span>
            </button>
          </div>
        ) : (
          // Active / Paused Controls
          <div className="flex items-center gap-3">
            {focusSession.isPaused ? (
              <button
                onClick={resumeFocus}
                className="flex-1 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={pauseFocus}
                className="flex-1 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={() => {
                endFocus(true);
                setIsFocusModalOpen(false);
              }}
              className="px-6 py-3.5 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>End</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
