import React from 'react';
import { ArrowLeft, Check, Dumbbell, Moon, Sparkles, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WEEKLY_GYM_SCHEDULE } from '../data/constants';
import { GymExerciseIllustration } from './GymExerciseIllustrations';

export const GymFullScreen: React.FC = () => {
  const {
    gym,
    selectedGymDay,
    setSelectedGymDay,
    toggleExercise,
    toggleGymSessionCompleted,
    isGymDrawerOpen,
    setIsGymDrawerOpen,
    accentConfig,
  } = useApp();

  if (!isGymDrawerOpen) return null;

  const daysMeta = [
    { idx: 1, label: 'M', name: 'Mon', routine: 'Push' },
    { idx: 2, label: 'T', name: 'Tue', routine: 'Pull' },
    { idx: 3, label: 'W', name: 'Wed', routine: 'Leg' },
    { idx: 4, label: 'T', name: 'Thu', routine: 'Push' },
    { idx: 5, label: 'F', name: 'Fri', routine: 'Rest' },
    { idx: 6, label: 'S', name: 'Sat', routine: 'Pull' },
    { idx: 0, label: 'S', name: 'Sun', routine: 'Leg' },
  ];

  const todayIdx = new Date().getDay();
  const completedExercisesCount = gym.exercises.filter((e) => e.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#121316] text-white overflow-hidden">
      {/* Top Header Bar */}
      <header className="px-4 py-3 border-b border-white/10 bg-[#16181D]/80 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsGymDrawerOpen(false)}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-white">
                {gym.dayName} · {gym.title}
              </h1>
              {selectedGymDay === todayIdx && (
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${accentConfig.hex}25`,
                    color: accentConfig.hex,
                  }}
                >
                  Today
                </span>
              )}
            </div>
            <p className="text-xs text-white/50">{gym.focus}</p>
          </div>
        </div>

        {/* Exercises completion status counter */}
        <div className="text-right">
          <span className="text-xs font-semibold tabular-nums text-white">
            {completedExercisesCount}/{gym.exercises.length}
          </span>
          <span className="text-[10px] text-white/40 block">Done</span>
        </div>
      </header>

      {/* Day Selector Pills Bar */}
      <div className="px-4 py-2.5 bg-black/40 border-b border-white/5 flex items-center justify-between gap-1 overflow-x-auto">
        {daysMeta.map((d) => {
          const isSelected = selectedGymDay === d.idx;
          const isActualToday = todayIdx === d.idx;

          return (
            <button
              key={d.name}
              onClick={() => setSelectedGymDay(d.idx)}
              className={`flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                isSelected
                  ? 'text-zinc-950 font-bold shadow-md'
                  : isActualToday
                  ? 'bg-white/10 text-white'
                  : 'bg-white/5 text-white/50 hover:bg-white/8 hover:text-white/80'
              }`}
              style={{
                backgroundColor: isSelected ? accentConfig.hex : undefined,
              }}
            >
              <span className="text-[11px] font-bold">{d.name}</span>
              <span className="text-[9px] opacity-80">{d.routine}</span>
            </button>
          );
        })}
      </div>

      {/* Scrollable Workouts Content */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 max-w-lg mx-auto w-full pb-24">
        {/* Rest Day Calm Hero */}
        {gym.isRestDay ? (
          <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full mx-auto bg-indigo-500/15 flex items-center justify-center text-indigo-300">
              <Moon className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-white">Friday Recovery Day</h2>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm mx-auto">
              Muscle fibers rebuild and nervous systems reset during deliberate rest. Prioritize clean nutrition, Jumu&apos;ah, and gentle mobility.
            </p>
          </div>
        ) : null}

        {/* Exercises Cards */}
        {gym.exercises.map((ex, idx) => (
          <div
            key={ex.id}
            className={`p-4 rounded-3xl border transition-all duration-200 ${
              ex.completed
                ? 'bg-white/[0.02] border-white/5 opacity-65'
                : 'bg-white/[0.05] border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              {/* Exercise Illustration Logo / Diagram */}
              <div
                className="w-14 h-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0 p-2"
                style={{
                  borderColor: ex.completed ? `${accentConfig.hex}40` : undefined,
                }}
              >
                <GymExerciseIllustration
                  type={ex.illustrationType}
                  className="w-full h-full"
                  accentColor={accentConfig.hex}
                />
              </div>

              {/* Title & Target Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white/40">#{idx + 1}</span>
                  <h3
                    className={`text-sm font-semibold tracking-tight truncate ${
                      ex.completed ? 'line-through text-white/50' : 'text-white'
                    }`}
                  >
                    {ex.name}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-white/60 mt-1">
                  <span className="font-semibold text-white/80 tabular-nums">{ex.sets}</span>
                  <span>·</span>
                  <span className="text-white/50">{ex.target}</span>
                </div>

                <span className="text-[10px] text-white/40 block mt-0.5 italic">
                  Muscle: {ex.muscleGroup}
                </span>
              </div>

              {/* Checkbox Toggle Button */}
              <button
                onClick={() => toggleExercise(ex.id)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  ex.completed
                    ? 'text-zinc-950 font-bold shadow-md'
                    : 'border border-white/25 hover:border-white/50 text-transparent'
                }`}
                style={{
                  backgroundColor: ex.completed ? accentConfig.hex : 'transparent',
                  borderColor: ex.completed ? accentConfig.hex : undefined,
                }}
                aria-label={`Mark ${ex.name} completed`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Form Cue / How to perform the workout ("to know how is the work out") */}
            <div className="mt-3 pt-3 border-t border-white/5 flex items-start gap-2 text-xs text-white/70 leading-relaxed bg-black/20 p-2.5 rounded-2xl">
              <Info className="w-3.5 h-3.5 text-white/40 shrink-0 mt-0.5" />
              <p className="text-[11px]">
                <strong className="text-white/90">Form Cue: </strong>
                {ex.formCue}
              </p>
            </div>
          </div>
        ))}
      </main>

      {/* Pinned Bottom CTA to Complete Entire Session */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#121316] via-[#121316]/90 to-transparent border-t border-white/10 z-10 backdrop-blur-md">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-white/50 block">Session Status</span>
            <span className="text-sm font-bold text-white">
              {gym.completed ? 'Workout Completed' : `${completedExercisesCount} of ${gym.exercises.length} Exercises Done`}
            </span>
          </div>

          <button
            onClick={() => {
              toggleGymSessionCompleted();
              setIsGymDrawerOpen(false);
            }}
            className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-zinc-950 flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
            style={{
              backgroundColor: accentConfig.hex,
              boxShadow: accentConfig.glowStyle,
            }}
          >
            {gym.completed ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Finished · Back to Day</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Mark Routine Complete</span>
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};
