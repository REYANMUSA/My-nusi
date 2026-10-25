import React from 'react';
import { Timer, SlidersHorizontal, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PATH_CONFIG } from '../data/constants';

export const Header: React.FC = () => {
  const {
    selectedPath,
    settings,
    focusSession,
    setIsFocusModalOpen,
    setIsMorningSetupOpen,
    setShowWidgetPreview,
    accentConfig,
  } = useApp();

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12
      ? `Good morning, ${settings.userName}`
      : hour < 17
      ? `Good afternoon, ${settings.userName}`
      : `Good evening, ${settings.userName}`;

  // Format date like "Thu, Oct 23"
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const pathInfo = PATH_CONFIG[selectedPath];

  return (
    <header className="pt-4 pb-2 flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white/95 truncate">
            {greeting}
          </h1>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-white/60">
          <span className="font-medium text-white/70">{dateStr}</span>
          <span>·</span>
          {/* Path Pill - tappable to change path or re-run morning setup */}
          <button
            onClick={() => setIsMorningSetupOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-white/80 active:scale-95 cursor-pointer"
            title="Click to change today's path"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentConfig.hex }}
            />
            <span className="font-medium text-[11px]">{pathInfo.label}</span>
            <SlidersHorizontal className="w-2.5 h-2.5 text-white/40 ml-0.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-1 shrink-0">
        {/* Android Clean Widget Trigger */}
        <button
          onClick={() => setShowWidgetPreview(true)}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white/80 transition-colors cursor-pointer"
          title="Android Clean Widget"
          aria-label="View Android Widget"
        >
          <Smartphone className="w-3.5 h-3.5" />
        </button>

        {/* Right-side primary action: Focus shortcut when no timer running */}
        {!focusSession && (
          <button
            onClick={() => setIsFocusModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-medium text-white/90 active:scale-95 transition-all cursor-pointer"
            aria-label="Start Focus Session"
          >
            <Timer className="w-3.5 h-3.5 text-white/80" />
            <span>Focus</span>
          </button>
        )}
      </div>
    </header>
  );
};
