import React from 'react';
import { Check, Timer } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WORK_AREA_CONFIG } from '../data/constants';

export const MyTasksCard: React.FC = () => {
  const { tasks, toggleTask, startFocus, setIsFocusModalOpen, settings, accentConfig } = useApp();

  const cardStyle = settings.reduceTransparency
    ? 'solid-panel'
    : settings.glassIntensity === 'tinted'
    ? 'glass-panel-tinted'
    : 'glass-panel';

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <section className={`p-4 sm:p-5 ${cardStyle}`}>
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-sm font-semibold tracking-tight text-white/95">
          My tasks
        </h2>
        <span className="text-xs font-medium text-white/50 tabular-nums">
          Today {completedCount}/{tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <p className="text-xs text-white/50 py-4 text-center">
          No tasks planned for today
        </p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => {
            const areaInfo = WORK_AREA_CONFIG[task.area] || WORK_AREA_CONFIG.school;

            return (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 group ${
                  task.completed
                    ? 'bg-white/[0.02] border-white/5 opacity-55'
                    : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.07]'
                }`}
              >
                {/* Left: Tick box & title */}
                <div
                  className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                  onClick={() => toggleTask(task.id)}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all shrink-0 ${
                      task.completed
                        ? ''
                        : 'border border-white/30 group-hover:border-white/50'
                    }`}
                    style={{
                      backgroundColor: task.completed ? accentConfig.hex : 'transparent',
                      borderColor: task.completed ? accentConfig.hex : undefined,
                    }}
                  >
                    {task.completed && (
                      <Check className="w-3.5 h-3.5 text-zinc-950 stroke-[3]" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span
                      className={`text-xs sm:text-sm font-medium block truncate ${
                        task.completed
                          ? 'line-through text-white/50'
                          : 'text-white/90'
                      }`}
                    >
                      {task.title}
                    </span>

                    {/* Clean unboxed Area Tag (Zero-pill discipline with subtle dot) */}
                    <div className="flex items-center gap-1.5 text-[10px] text-white/45 mt-0.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: areaInfo.tagColor }}
                      />
                      <span>{areaInfo.label}</span>
                      {task.focusMinutes > 0 && (
                        <>
                          <span>·</span>
                          <span className="tabular-nums">{task.focusMinutes}m focus</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Quick focus launch */}
                {!task.completed && (
                  <button
                    onClick={() => {
                      startFocus(25, { id: task.id, title: task.title });
                      setIsFocusModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-white/30 hover:text-white/80 hover:bg-white/10 transition-colors ml-2 cursor-pointer"
                    title={`Focus on ${task.title}`}
                  >
                    <Timer className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
