import React from 'react';
import { Moon, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SalahCard } from './SalahCard';
import { REST_DAY_MESSAGES } from '../data/constants';

export const RestDayView: React.FC = () => {
  const { tasks, toggleTask, settings, accentConfig } = useApp();

  const cardStyle = settings.reduceTransparency
    ? 'solid-panel'
    : settings.glassIntensity === 'tinted'
    ? 'glass-panel-tinted'
    : 'glass-panel';

  // Exactly one tiny task for rest day
  const tinyTask = tasks[0] || {
    id: 'rest_task_1',
    title: "Read Qur'an (1 page)",
    completed: false,
  };

  return (
    <div className="space-y-4">
      {/* Calm, Large Message Card */}
      <section className={`p-6 text-center ${cardStyle}`}>
        <div
          className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3.5 transition-all"
          style={{ backgroundColor: `${accentConfig.hex}15` }}
        >
          <Moon
            className="w-6 h-6"
            style={{ color: `${accentConfig.hex}CC` }}
          />
        </div>
        <h2 className="text-lg font-semibold tracking-tight text-white mb-1.5">
          Take it easy today.
        </h2>
        <p className="text-xs text-white/60 max-w-xs mx-auto leading-relaxed">
          {REST_DAY_MESSAGES[0]}
        </p>
      </section>

      {/* Salah card FIRST */}
      <SalahCard />

      {/* One Tiny Task Only */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold tracking-tight text-white/95">
            1 task
          </h2>
          <span className="text-[11px] text-white/40">Gentle anchor</span>
        </div>

        <div
          onClick={() => toggleTask(tinyTask.id)}
          className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
            tinyTask.completed
              ? 'bg-white/[0.02] border-white/5 opacity-60'
              : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.07]'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all shrink-0 ${
              tinyTask.completed ? '' : 'border border-white/30'
            }`}
            style={{
              backgroundColor: tinyTask.completed ? `${accentConfig.hex}CC` : 'transparent',
              borderColor: tinyTask.completed ? `${accentConfig.hex}CC` : undefined,
            }}
          >
            {tinyTask.completed && (
              <Check className="w-3.5 h-3.5 text-zinc-950 stroke-[3]" />
            )}
          </div>

          <span
            className={`text-xs sm:text-sm font-medium ${
              tinyTask.completed ? 'line-through text-white/50' : 'text-white/90'
            }`}
          >
            {tinyTask.title}
          </span>
        </div>
      </section>
    </div>
  );
};
