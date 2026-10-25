import React from 'react';
import { Check, Clock, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SingleRingProps {
  label: string;
  value: string;
  fraction: number; // 0 to 1
  icon: React.ReactNode;
  accentColor: string;
  glowStyle: string;
  subDetail?: string;
}

const RingCircle: React.FC<SingleRingProps> = ({
  label,
  value,
  fraction,
  icon,
  accentColor,
  glowStyle,
  subDetail,
}) => {
  const radius = 26;
  const strokeWidth = 4.5;
  const circumference = 2 * Math.PI * radius;
  const clampedFraction = Math.max(0, Math.min(1, fraction));
  const strokeDashoffset = circumference * (1 - clampedFraction);

  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center">
        <svg
          className="w-full h-full -rotate-90 transform"
          viewBox="0 0 64 64"
        >
          {/* Track */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
          />
          {/* Progress stroke */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="transparent"
            stroke={accentColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              filter: clampedFraction > 0 ? `drop-shadow(${glowStyle})` : 'none',
              transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </svg>

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-white/80">
          {icon}
        </div>
      </div>

      <span className="text-[11px] font-medium text-white/50 mt-2">{label}</span>
      <span className="text-xs font-semibold tabular-nums text-white/95 mt-0.5">{value}</span>
      {subDetail && (
        <span className="text-[10px] text-white/40 text-center mt-0.5 leading-tight">{subDetail}</span>
      )}
    </div>
  );
};

export const TodayRingsCard: React.FC = () => {
  const {
    tasks,
    todayFocusMinutes,
    dailyFocusGoalMinutes,
    quran,
    nextPrayer,
    settings,
    accentConfig,
  } = useApp();

  const cardStyle = settings.reduceTransparency
    ? 'solid-panel'
    : settings.glassIntensity === 'tinted'
    ? 'glass-panel-tinted'
    : 'glass-panel';

  // 1. Tasks ring: completed tasks / planned tasks
  const completedTasks = tasks.filter((t) => t.completed).length;
  const taskFraction = tasks.length > 0 ? completedTasks / tasks.length : 0;

  // 2. Focus ring: focus minutes / goal minutes
  const focusFraction = todayFocusMinutes / dailyFocusGoalMinutes;
  const focusDisplay =
    todayFocusMinutes >= 60
      ? `${Math.floor(todayFocusMinutes / 60)}h${todayFocusMinutes % 60 ? ` ${todayFocusMinutes % 60}m` : ''}/${Math.floor(dailyFocusGoalMinutes / 60)}h`
      : `${todayFocusMinutes}m/${Math.floor(dailyFocusGoalMinutes / 60)}h`;

  // 3. Deen ring: Quran daily target pages (4 pages)
  const quranFraction = quran.targetPages > 0 ? quran.completedPagesToday / quran.targetPages : 0;

  return (
    <section className={`p-4 sm:p-5 ${cardStyle}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold tracking-tight text-white/95">
          Today
        </h2>
        <span className="text-[11px] text-white/40">
          Qur&apos;an {quran.completedPagesToday}/{quran.targetPages}p · {nextPrayer ? `${nextPrayer.name} ${nextPrayer.remainingFormatted}` : 'Salat'}
        </span>
      </div>

      <div className="flex items-start justify-between gap-2 pt-1 pb-1">
        <RingCircle
          label="Tasks"
          value={`${completedTasks}/${tasks.length}`}
          fraction={taskFraction}
          icon={<Check className="w-4 h-4 stroke-[2.5]" />}
          accentColor={accentConfig.hex}
          glowStyle={accentConfig.glowStyle}
        />

        <RingCircle
          label="Focus"
          value={focusDisplay}
          fraction={focusFraction}
          icon={<Clock className="w-4 h-4 stroke-[2.5]" />}
          accentColor={accentConfig.hex}
          glowStyle={accentConfig.glowStyle}
        />

        <RingCircle
          label="Qur'an"
          value={`${quran.completedPagesToday}/${quran.targetPages}p`}
          fraction={quranFraction}
          icon={<Moon className="w-4 h-4 stroke-[2.5]" />}
          accentColor={accentConfig.hex}
          glowStyle={accentConfig.glowStyle}
          subDetail={`Juz ${quran.currentJuz}`}
        />
      </div>
    </section>
  );
};
