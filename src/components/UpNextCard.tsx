import React from 'react';
import { Clock, MapPin, School, BookOpen, Dumbbell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScheduleItem } from '../types';

export const UpNextCard: React.FC = () => {
  const { scheduleItems, settings, accentConfig } = useApp();

  const cardStyle = settings.reduceTransparency
    ? 'solid-panel'
    : settings.glassIntensity === 'tinted'
    ? 'glass-panel-tinted'
    : 'glass-panel';

  if (!scheduleItems || scheduleItems.length === 0) {
    return (
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <h2 className="text-sm font-semibold tracking-tight text-white/95 mb-2">
          Up next
        </h2>
        <p className="text-xs text-white/50 py-3 text-center">
          Nothing scheduled next
        </p>
      </section>
    );
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const ordered = [...scheduleItems].sort((a, b) => {
    const [ah, am] = a.startTime.split(':').map(Number);
    const [bh, bm] = b.startTime.split(':').map(Number);
    return ah * 60 + am - (bh * 60 + bm);
  });
  const activeItem = ordered.find((item) => {
    const [sh, sm] = item.startTime.split(':').map(Number);
    const [eh, em] = item.endTime.split(':').map(Number);
    return currentMinutes >= sh * 60 + sm && currentMinutes < eh * 60 + em;
  });
  const primaryNext = activeItem || ordered.find((item) => {
    const [h, m] = item.startTime.split(':').map(Number);
    return h * 60 + m > currentMinutes;
  });
  const upcomingList = primaryNext
    ? ordered.filter((item) => item.id !== primaryNext.id && (() => {
        const [h, m] = item.startTime.split(':').map(Number);
        return h * 60 + m > currentMinutes;
      })())
    : [];

  const getContextIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('school') || lower.includes('study')) return <School className="w-4 h-4 text-white/70" />;
    if (lower.includes('qur') || lower.includes('read')) return <BookOpen className="w-4 h-4 text-white/70" />;
    if (lower.includes('gym') || lower.includes('push')) return <Dumbbell className="w-4 h-4 text-white/70" />;
    return <Clock className="w-4 h-4 text-white/70" />;
  };

  if (!primaryNext) {
    return (
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <h2 className="text-sm font-semibold tracking-tight text-white/95 mb-2">Up next</h2>
        <p className="text-xs text-white/50 py-3 text-center">All planned activities are finished for today.</p>
      </section>
    );
  }

  const [startH, startM] = primaryNext.startTime.split(':').map(Number);
  const [endH, endM] = primaryNext.endTime.split(':').map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  let remainingText = '';
  if (currentMinutes < startMinutes) {
    const diff = startMinutes - currentMinutes;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    remainingText = h > 0 ? `${h}h ${m}m left` : `${m}m left`;
  } else if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
    const diff = endMinutes - currentMinutes;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    remainingText = h > 0 ? `In progress · ${h}h ${m}m left` : `In progress · ${m}m left`;
  } else {
    remainingText = 'Completed today';
  }

  return (
    <section className={`p-4 sm:p-5 ${cardStyle}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold tracking-tight text-white/95">
          Up next
        </h2>
        <span className="text-[11px] text-white/40 tabular-nums">
          {scheduleItems.length} planned
        </span>
      </div>

      {/* Highlighted Main Block */}
      <div
        className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border transition-all mb-3"
        style={{ borderColor: `${accentConfig.hex}40` }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 flex items-center justify-center">
              {getContextIcon(primaryNext.title)}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white/95">
                {primaryNext.title}
              </h3>
              <p className="text-xs text-white/60">{primaryNext.context}</p>
            </div>
          </div>

          {/* Time Remaining Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-medium text-white/80">
            <Clock className="w-3 h-3 text-white/60" />
            <span>{remainingText}</span>
          </div>
        </div>

        {/* Schedule Time & Place */}
        <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-white/5 text-[11px] text-white/50">
          <span className="tabular-nums">
            {primaryNext.startTime} – {primaryNext.endTime}
          </span>
          {primaryNext.place && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {primaryNext.place}
            </span>
          )}
        </div>
      </div>

      {/* Smaller Upcoming Rows */}
      {upcomingList.length > 0 && (
        <div className="space-y-2 pt-1">
          {upcomingList.map((item: ScheduleItem) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-1.5 h-6 rounded-full shrink-0"
                  style={{ backgroundColor: `${accentConfig.hex}80` }}
                />
                <div className="truncate">
                  <span className="text-xs font-medium text-white/90 block truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-white/50 block truncate">
                    {item.context}
                  </span>
                </div>
              </div>

              <span className="text-[11px] tabular-nums text-white/50 shrink-0 ml-2">
                {item.startTime} – {item.endTime}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
