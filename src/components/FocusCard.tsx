import React, { useState } from 'react';
import { Play, Pause, Square, Maximize2, Plus, Minus, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FocusCard: React.FC = () => {
  const {
    focusSession,
    startFocus,
    pauseFocus,
    resumeFocus,
    endFocus,
    setIsFocusModalOpen,
    settings,
    accentConfig,
  } = useApp();

  const [selectedDuration, setSelectedDuration] = useState<number>(settings.defaultFocusDuration || 25);
  const [isEditingCustom, setIsEditingCustom] = useState<boolean>(false);

  const cardStyle = settings.reduceTransparency
    ? 'solid-panel'
    : settings.glassIntensity === 'tinted'
    ? 'glass-panel-tinted'
    : 'glass-panel';

  const durations = [15, 25, 45, 60];

  const formatRemaining = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAdjustMinutes = (delta: number) => {
    setSelectedDuration((prev) => Math.max(1, Math.min(180, prev + delta)));
  };

  return (
    <section className={`p-4 sm:p-5 ${cardStyle}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-white/60" />
          <h2 className="text-sm font-semibold tracking-tight text-white/95">
            Focus
          </h2>
        </div>
        <button
          onClick={() => setIsFocusModalOpen(true)}
          className="p-1 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors cursor-pointer"
          title="Open full focus screen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {!focusSession ? (
        // Idle State with Presets & Custom Time Editor
        <div className="space-y-3">
          {/* Preset Duration Chips */}
          <div className="flex items-center gap-1.5">
            {durations.map((duration) => {
              const isSelected = selectedDuration === duration;
              return (
                <button
                  key={duration}
                  onClick={() => setSelectedDuration(duration)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'text-zinc-950 font-bold'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                  style={{
                    backgroundColor: isSelected ? accentConfig.hex : undefined,
                    boxShadow: isSelected ? accentConfig.glowStyle : undefined,
                  }}
                >
                  {duration}m
                </button>
              );
            })}
          </div>

          {/* Custom Time Stepper / Editor as requested */}
          <div className="p-2 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between">
            <span className="text-[11px] text-white/50 pl-1">Custom minutes:</span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleAdjustMinutes(-5)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Decrease 5 minutes"
              >
                <Minus className="w-3 h-3" />
              </button>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={selectedDuration}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) setSelectedDuration(Math.max(1, Math.min(180, val)));
                  }}
                  className="w-14 text-center py-1 bg-black/60 border border-white/15 rounded-lg text-xs font-bold text-white tabular-nums focus:outline-none focus:border-white/40"
                  aria-label="Custom focus duration in minutes"
                />
                <span className="text-[10px] text-white/40 ml-1">min</span>
              </div>

              <button
                type="button"
                onClick={() => handleAdjustMinutes(5)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Increase 5 minutes"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <button
            onClick={() => startFocus(selectedDuration)}
            className="w-full py-2.5 rounded-xl font-bold text-xs text-zinc-950 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            style={{
              backgroundColor: accentConfig.hex,
              boxShadow: accentConfig.glowStyle,
            }}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start {selectedDuration}m Focus</span>
          </button>
        </div>
      ) : (
        // Running or Paused State
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[11px] text-white/50 block truncate max-w-[200px]">
                {focusSession.taskTitle || 'General session'}
              </span>
              <span className="text-2xl font-bold tracking-tight text-white tabular-nums">
                {formatRemaining(focusSession.remainingSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {focusSession.isPaused ? (
                <button
                  onClick={resumeFocus}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Resume</span>
                </button>
              ) : (
                <button
                  onClick={pauseFocus}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Pause className="w-3 h-3 fill-current" />
                  <span>Pause</span>
                </button>
              )}

              <button
                onClick={() => endFocus(true)}
                className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-xs font-medium text-red-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>End</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
