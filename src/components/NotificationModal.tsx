import React from 'react';
import { X, Target, Clock, Heart, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationModal: React.FC = () => {
  const { showNotificationDrawer, setShowNotificationDrawer, settings } = useApp();

  if (!showNotificationDrawer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="max-w-sm w-full rounded-3xl bg-[#15171B] border border-white/15 p-5 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-white/60" />
            <h2 className="text-sm font-bold tracking-tight text-white">
              Phone Notification Previews
            </h2>
          </div>
          <button
            onClick={() => setShowNotificationDrawer(false)}
            className="p-1 rounded-full text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-white/50 mb-4 leading-relaxed">
          Simulated lock-screen &amp; heads-up OS cards respecting your privacy rules.
        </p>

        <div className="space-y-3">
          {/* Card 1: Focus reminder */}
          <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-[11px] text-white/50 mb-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-white/90">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nusi · Focus</span>
              </div>
              <span className="text-[10px]">5m ago</span>
            </div>
            <h4 className="text-xs font-semibold text-white">
              It&apos;s time to focus.
            </h4>
            <p className="text-[11px] text-white/70 mt-0.5">
              You&apos;re working towards something bigger.
            </p>
          </div>

          {/* Card 2: Schedule reminder */}
          <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-[11px] text-white/50 mb-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-white/90">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Nusi · Schedule</span>
              </div>
              <span className="text-[10px]">12m ago</span>
            </div>
            <h4 className="text-xs font-semibold text-white">
              Time for school.
            </h4>
            <p className="text-[11px] text-white/70 mt-0.5">
              School starts at 7:00 AM.
            </p>
          </div>

          {/* Card 3: Random 100 istighfar with love-strengthening reminder */}
          <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-[11px] text-white/50 mb-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-white/90">
                <Heart className="w-3.5 h-3.5 text-pink-400" />
                <span>Nusi · Dhikr &amp; Purpose</span>
              </div>
              <span className="text-[10px]">1h ago</span>
            </div>
            <h4 className="text-xs font-semibold text-white">
              100 istighfar
            </h4>
            <p className="text-[11px] text-white/70 mt-0.5 leading-relaxed">
              {settings.notifications.lockScreenPrivacy
                ? "You're not alone. Allah is with you, and He loves your effort."
                : `Remember why you build: ${settings.loveStrengtheningNotes}`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowNotificationDrawer(false)}
          className="w-full mt-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
