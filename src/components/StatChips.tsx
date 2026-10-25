import React from 'react';
import { useApp } from '../context/AppContext';

export const StatChips: React.FC = () => {
  const { tasks, todayFocusMinutes, selectedPath, settings } = useApp();

  // Hide on Rest and Busy paths as specified
  if (selectedPath !== 'locked_in') {
    return null;
  }

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  const cardStyle = settings.reduceTransparency ? 'solid-chip' : 'glass-chip';

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
      {/* Done Today */}
      <div className={`px-3 py-1.5 flex items-center gap-2 ${cardStyle}`}>
        <span className="text-[11px] font-medium text-white/50">Done today</span>
        <span className="text-xs font-semibold tabular-nums text-white/90">
          {completedCount}/{totalCount}
        </span>
      </div>

      {/* Focus Today */}
      <div className={`px-3 py-1.5 flex items-center gap-2 ${cardStyle}`}>
        <span className="text-[11px] font-medium text-white/50">Focus today</span>
        <span className="text-xs font-semibold tabular-nums text-white/90">
          {todayFocusMinutes}m
        </span>
      </div>

      {/* Remaining tasks (tasks have no due-time field, so don't report fake missed counts) */}
      <div className={`px-3 py-1.5 flex items-center gap-2 ${cardStyle}`}>
        <span className="text-[11px] font-medium text-white/50">Remaining</span>
        <span className="text-xs font-semibold tabular-nums text-white/90">
          {Math.max(0, totalCount - completedCount)}
        </span>
      </div>
    </div>
  );
};
