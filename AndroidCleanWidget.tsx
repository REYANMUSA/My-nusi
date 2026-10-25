import React, { useState, useEffect } from 'react';
import { X, Clock, Play, Dumbbell, Moon, Check, Smartphone, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AndroidCleanWidget: React.FC = () => {
  const {
    showWidgetPreview,
    setShowWidgetPreview,
    nextPrayer,
    gym,
    startFocus,
    setIsFocusModalOpen,
    accentConfig,
  } = useApp();

  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
      setDateStr(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!showWidgetPreview) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="max-w-sm w-full rounded-3xl bg-[#141519] border border-white/15 p-5 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/90">
              Android Clean Widget (4×2)
            </h3>
          </div>
          <button
            onClick={() => setShowWidgetPreview(false)}
            className="p-1 rounded-full text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-white/50 mb-4 leading-relaxed">
          Pristine home-screen companion for quick glances and 1-tap focus on Android.
        </p>

        {/* The Clean Widget Canvas (Simulating Android 14/15 Frosted Glass 4x2 Widget) */}
        <div className="p-4 rounded-[28px] bg-white/[0.06] border border-white/15 backdrop-blur-3xl shadow-xl space-y-3.5 relative overflow-hidden">
          {/* Subtle accent ambient glow */}
          <div
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 pointer-events-none blur-2xl"
            style={{ backgroundColor: accentConfig.hex }}
          />

          {/* Widget Row 1: Time, Date & Quick Focus Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-extrabold tracking-tight tabular-nums text-white">
                {timeStr}
              </span>
              <span className="text-xs text-white/60 block font-medium">
                {dateStr}
              </span>
            </div>

            <button
              onClick={() => {
                startFocus(25);
                setShowWidgetPreview(false);
                setIsFocusModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-full font-bold text-xs text-zinc-950 flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              style={{
                backgroundColor: accentConfig.hex,
                boxShadow: accentConfig.glowStyle,
              }}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Focus</span>
            </button>
          </div>

          {/* Widget Row 2: Salat Remaining Time (No marks!) */}
          <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-white/60" />
              <span className="text-xs font-semibold text-white/90">
                {nextPrayer ? nextPrayer.name : 'Salat'}
              </span>
            </div>
            <span
              className="text-xs font-bold tabular-nums"
              style={{ color: accentConfig.hex }}
            >
              {nextPrayer ? nextPrayer.remainingFormatted : 'On schedule'}
            </span>
          </div>

          {/* Widget Row 3: Gym Routine Key */}
          <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {gym.isRestDay ? (
                <Moon className="w-3.5 h-3.5 text-indigo-300" />
              ) : (
                <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span className="text-xs font-medium text-white/90">
                {gym.title}
              </span>
            </div>
            <span className="text-[11px] text-white/50">
              {gym.isRestDay ? 'Recovery' : gym.focus}
            </span>
          </div>
        </div>

        {/* Android PWA Install Instructions */}
        <div className="mt-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] text-white/70 space-y-1.5">
          <div className="flex items-center gap-1.5 text-white font-semibold">
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add to Android Home Screen</span>
          </div>
          <p className="leading-relaxed text-white/60">
            Open browser menu (<strong>⋮</strong>) and tap <strong>&ldquo;Add to Home screen&rdquo;</strong> or <strong>&ldquo;Install App&rdquo;</strong>. Nusi will run cleanly with offline storage, system alarms, and clean notifications.
          </p>
        </div>

        <button
          onClick={() => setShowWidgetPreview(false)}
          className="w-full mt-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
