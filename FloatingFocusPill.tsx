import React from 'react';
import { useApp } from '../context/AppContext';

export const FloatingFocusPill: React.FC = () => {
  const { focusSession, setIsFocusModalOpen, isFocusModalOpen, accentConfig } = useApp();

  if (!focusSession || isFocusModalOpen) {
    return null;
  }

  const mins = Math.floor(focusSession.remainingSeconds / 60);
  const secs = focusSession.remainingSeconds % 60;
  const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <button
        onClick={() => setIsFocusModalOpen(true)}
        className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#181A20]/90 border border-white/15 backdrop-blur-xl shadow-lg shadow-black/40 hover:bg-[#20222A] active:scale-95 transition-all cursor-pointer"
        aria-label="Open active focus timer"
      >
        {/* Pulsing indicator dot or paused indicator */}
        <span className="relative flex h-2 w-2">
          {focusSession.isPaused ? (
            <span className="h-2 w-2 rounded-full bg-amber-400" />
          ) : (
            <>
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: accentConfig.hex }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: accentConfig.hex }}
              />
            </>
          )}
        </span>

        <span className="text-xs font-medium text-white/90 tracking-wide">
          {focusSession.isPaused ? 'Paused' : 'Focus'}
        </span>

        <span className="text-xs font-semibold tabular-nums text-white">
          {timeFormatted}
        </span>
      </button>
    </div>
  );
};
