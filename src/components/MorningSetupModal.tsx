import React, { useState } from 'react';
import { ArrowLeft, Check, Moon, Target, Briefcase, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AREA_TASKS, PATH_CONFIG, WORK_AREA_CONFIG } from '../data/constants';
import { DailyPath, WorkArea } from '../types';

export const MorningSetupModal: React.FC = () => {
  const {
    isMorningSetupOpen,
    setIsMorningSetupOpen,
    completeMorningSetup,
    selectedPath: initialPath,
    primaryWorkArea: initialArea,
    accentConfig,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [chosenPath, setChosenPath] = useState<DailyPath>(initialPath || 'locked_in');
  const [chosenArea, setChosenArea] = useState<WorkArea>(initialArea || 'find_niche');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([
    'Edit product photos',
    'Post video',
  ]);

  if (!isMorningSetupOpen) return null;

  // Handle Step 1 Choice -> Auto-advance
  const handleSelectPath = (path: DailyPath) => {
    setChosenPath(path);
    if (path === 'rest') {
      // In Rest mode, no need for Step 2 & 3 tasks
      completeMorningSetup('rest', chosenArea, []);
      return;
    }
    if (path === 'busy') {
      // In Busy mode, essentials only
      completeMorningSetup('busy', chosenArea, []);
      return;
    }
    setStep(2);
  };

  // Handle Step 2 Choice -> Auto-advance
  const handleSelectArea = (area: WorkArea) => {
    setChosenArea(area);
    // Reset selected tasks to first 2 defaults of this area
    const defaults = AREA_TASKS[area].slice(0, 2);
    setSelectedTasks(defaults);
    setStep(3);
  };

  // Toggle Task in Step 3
  const toggleTaskSelection = (taskTitle: string) => {
    if (selectedTasks.includes(taskTitle)) {
      setSelectedTasks(selectedTasks.filter((t) => t !== taskTitle));
    } else {
      setSelectedTasks([...selectedTasks, taskTitle]);
    }
  };

  const handleBuildDay = () => {
    if (selectedTasks.length === 0) return;
    completeMorningSetup(chosenPath, chosenArea, selectedTasks);
  };

  const getPathIcon = (path: DailyPath) => {
    switch (path) {
      case 'rest':
        return <Moon className="w-5 h-5 text-indigo-300" />;
      case 'locked_in':
        return <Target className="w-5 h-5 text-emerald-400" />;
      case 'busy':
        return <Briefcase className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="max-w-md w-full rounded-3xl bg-[#17181C] border border-white/15 p-6 flex flex-col max-h-[90vh] shadow-2xl relative">
        {/* Top Navigation & Step Indicator */}
        <div className="flex items-center justify-between mb-4">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
              className="p-1.5 -ml-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsMorningSetupOpen(false)}
              className="text-xs text-white/40 hover:text-white/80"
            >
              Close
            </button>
          )}

          {/* 3-Step Progress Indicator */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-6'
                    : s < step
                    ? 'w-2 bg-white/40'
                    : 'w-2 bg-white/10'
                }`}
                style={{
                  backgroundColor: s === step ? accentConfig.hex : undefined,
                }}
              />
            ))}
          </div>

          <span className="text-xs font-semibold tabular-nums text-white/50">
            {step}/3
          </span>
        </div>

        {/* STEP 1: WHICH PATH ARE YOU TAKING TODAY? */}
        {step === 1 && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1">
                Which path are you taking today?
              </h2>
              <p className="text-xs text-white/50 mb-5">
                Choose the main direction for your day. One tap advances.
              </p>

              <div className="space-y-3">
                {(['rest', 'locked_in', 'busy'] as DailyPath[]).map((pathKey) => {
                  const info = PATH_CONFIG[pathKey];
                  const isSelected = chosenPath === pathKey;

                  return (
                    <button
                      key={pathKey}
                      onClick={() => handleSelectPath(pathKey)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white/[0.08] border-white/30 shadow-lg'
                          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                      }`}
                      style={{
                        borderColor: isSelected ? accentConfig.hex : undefined,
                      }}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          {getPathIcon(pathKey)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">
                              {info.label}
                            </span>
                            {isSelected && (
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: accentConfig.hex }}
                              />
                            )}
                          </div>
                          <span className="text-xs text-white/50 block mt-0.5">
                            {info.subtitle}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-white/30" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: WHAT IS YOUR MAIN WORK AREA TODAY? */}
        {step === 2 && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1">
                What are you working on today?
              </h2>
              <p className="text-xs text-white/50 mb-5">
                This sets your focus tasks. One tap advances.
              </p>

              <div className="space-y-3">
                {(['find_niche', 'quran_nature', 'school'] as WorkArea[]).map((areaKey) => {
                  const info = WORK_AREA_CONFIG[areaKey];
                  const isSelected = chosenArea === areaKey;

                  return (
                    <button
                      key={areaKey}
                      onClick={() => handleSelectArea(areaKey)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white/[0.08] border-white/30 shadow-lg'
                          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                      }`}
                      style={{
                        borderColor: isSelected ? accentConfig.hex : undefined,
                      }}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shrink-0 text-sm"
                          style={{ backgroundColor: `${info.tagColor}25`, color: info.tagColor }}
                        >
                          {info.label.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white block">
                            {info.label}
                          </span>
                          <span className="text-xs text-white/50 block mt-0.5">
                            {info.subtitle}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-white/30" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CHOOSE TODAY'S TASKS OR SUBJECTS (MULTI-SELECT) */}
        {step === 3 && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1">
                What do you want to work on today?
              </h2>
              <p className="text-xs text-white/50 mb-4">
                Pick one or multiple items for {WORK_AREA_CONFIG[chosenArea].label}.
              </p>

              <div className="space-y-2 max-h-[44vh] overflow-y-auto pr-1">
                {AREA_TASKS[chosenArea].map((taskTitle) => {
                  const isSelected = selectedTasks.includes(taskTitle);

                  return (
                    <button
                      key={taskTitle}
                      type="button"
                      onClick={() => toggleTaskSelection(taskTitle)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white/[0.08] border-white/25 shadow-sm'
                          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            isSelected
                              ? 'text-zinc-950 font-bold'
                              : 'border border-white/30'
                          }`}
                          style={{
                            backgroundColor: isSelected ? accentConfig.hex : 'transparent',
                            borderColor: isSelected ? accentConfig.hex : undefined,
                          }}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-white/90">
                          {taskTitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pinned Bottom "Build my day" Action with Count */}
            <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-white/60">
                {selectedTasks.length} selected
              </span>

              <button
                onClick={handleBuildDay}
                disabled={selectedTasks.length === 0}
                className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-zinc-950 flex items-center gap-2 transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: accentConfig.hex,
                  boxShadow: accentConfig.glowStyle,
                }}
              >
                <span>Build my day</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
