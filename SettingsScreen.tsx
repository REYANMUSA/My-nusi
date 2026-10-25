import React, { useState } from 'react';
import { Check, Bell, BellRing, Sliders, Sparkles, Moon, Lock, Volume2, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { THEMES, ACCENTS } from '../data/constants';
import { AccentId, ThemeId } from '../types';

export const SettingsScreen: React.FC = () => {
  const {
    settings,
    updateSettings,
    accentConfig,
    setIsMorningSetupOpen,
    setShowNotificationDrawer,
    setShowWidgetPreview,
    requestNotificationPermission,
    triggerTestAlarm,
  } = useApp();

  const [notesEditing, setNotesEditing] = useState(false);
  const [tempNotes, setTempNotes] = useState(settings.loveStrengtheningNotes);

  const cardStyle = settings.reduceTransparency
    ? 'solid-panel'
    : settings.glassIntensity === 'tinted'
    ? 'glass-panel-tinted'
    : 'glass-panel';

  const saveNotes = () => {
    updateSettings({ loveStrengtheningNotes: tempNotes });
    setNotesEditing(false);
  };

  return (
    <div className="space-y-4 pb-14">
      {/* Title */}
      <div className="pt-4 pb-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Settings
        </h1>
        <p className="text-xs text-white/50 mt-0.5">
          Appearance, preferences & notifications
        </p>
      </div>

      {/* 1. Theme Wallpaper (10 tiles) */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <h2 className="text-sm font-semibold tracking-tight text-white/95 mb-1">
          Theme wallpaper
        </h2>
        <p className="text-[11px] text-white/50 mb-3.5">
          10 atmospheric canvases behind frosted glass
        </p>

        <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
          {THEMES.map((theme) => {
            const isSelected = settings.theme === theme.id;

            return (
              <button
                key={theme.id}
                onClick={() => updateSettings({ theme: theme.id as ThemeId })}
                className="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl relative flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'border-2 scale-105'
                      : 'border-white/10 opacity-70 group-hover:opacity-100'
                  }`}
                  style={{
                    background: theme.gradient,
                    borderColor: isSelected ? accentConfig.hex : undefined,
                    boxShadow: isSelected ? accentConfig.glowStyle : undefined,
                  }}
                >
                  {isSelected && (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-zinc-950 font-bold"
                      style={{ backgroundColor: accentConfig.hex }}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium truncate ${
                    isSelected ? 'text-white' : 'text-white/50'
                  }`}
                >
                  {theme.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Accent Colour (6 dots) */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <h2 className="text-sm font-semibold tracking-tight text-white/95 mb-1">
          Accent colour
        </h2>
        <p className="text-[11px] text-white/50 mb-3">
          Applied to active checks, rings, and primary buttons
        </p>

        <div className="flex items-center justify-between sm:justify-start sm:gap-4 pt-1">
          {Object.entries(ACCENTS).map(([key, acc]) => {
            const isSelected = settings.accent === key;

            return (
              <button
                key={key}
                onClick={() => updateSettings({ accent: key as AccentId })}
                className="flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer"
                aria-label={`Select ${acc.name} accent`}
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'scale-110 shadow-lg' : 'hover:scale-105 opacity-80'
                  }`}
                  style={{
                    backgroundColor: acc.hex,
                    boxShadow: isSelected ? acc.glowStyle : undefined,
                  }}
                >
                  {isSelected && (
                    <Check className="w-4 h-4 text-zinc-950 stroke-[3]" />
                  )}
                </div>
                <span
                  className={`text-[10px] capitalize ${
                    isSelected ? 'text-white font-medium' : 'text-white/40'
                  }`}
                >
                  {acc.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Glass Intensity & Reduced Transparency */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <h2 className="text-sm font-semibold tracking-tight text-white/95 mb-3">
          Glass & Legibility
        </h2>

        {/* Glass Intensity Segmented Control */}
        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <span className="text-xs text-white/80">Glass intensity</span>
          <div className="flex p-0.5 rounded-xl bg-black/40 border border-white/10">
            <button
              onClick={() => updateSettings({ glassIntensity: 'clear' })}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                settings.glassIntensity === 'clear'
                  ? 'bg-white/20 text-white'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Clear
            </button>
            <button
              onClick={() => updateSettings({ glassIntensity: 'tinted' })}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                settings.glassIntensity === 'tinted'
                  ? 'bg-white/20 text-white'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Tinted
            </button>
          </div>
        </div>

        {/* Reduce Transparency Toggle */}
        <div className="flex items-center justify-between py-2.5">
          <div>
            <span className="text-xs text-white/80 block">Reduce transparency</span>
            <span className="text-[10px] text-white/40 block">
              Solid dark cards for maximum contrast
            </span>
          </div>
          <button
            onClick={() =>
              updateSettings({ reduceTransparency: !settings.reduceTransparency })
            }
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
              settings.reduceTransparency ? 'bg-green-500' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.reduceTransparency ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </section>

      {/* 4. Focus Preferences */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <h2 className="text-sm font-semibold tracking-tight text-white/95 mb-3">
          Focus defaults
        </h2>

        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div>
            <span className="text-xs text-white/80 block">Default focus session</span>
            <span className="text-[10px] text-white/40 block">Initial timer length</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[15, 25, 45, 60].map((mins) => (
              <button
                key={mins}
                onClick={() => updateSettings({ defaultFocusDuration: mins })}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                  settings.defaultFocusDuration === mins
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <span className="text-xs text-white/80 block">Break preference</span>
            <span className="text-[10px] text-white/40 block">
              Saved preference (no intrusive break timer)
            </span>
          </div>
          <span className="text-xs text-white/70 tabular-nums">
            {settings.breakLengthPreference} mins
          </span>
        </div>
      </section>

      {/* 5. Notifications & Alarms (Real Controls & Preview) */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-white/70" />
            <h2 className="text-sm font-semibold tracking-tight text-white/95">
              Phone alarms &amp; notifications
            </h2>
          </div>
          <button
            onClick={() => setShowNotificationDrawer(true)}
            className="text-[11px] font-semibold text-white/80 hover:text-white underline cursor-pointer"
          >
            Preview OS Cards
          </button>
        </div>

        {/* Real Browser/Phone Notification Permission Status */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 mb-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">System notifications:</span>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider ${
                  settings.notifications.permissionStatus === 'granted'
                    ? 'text-emerald-400'
                    : settings.notifications.permissionStatus === 'denied'
                    ? 'text-red-400'
                    : 'text-amber-400'
                }`}
              >
                {settings.notifications.permissionStatus}
              </span>
            </div>
            <span className="text-[10px] text-white/45 block mt-0.5">
              Alarms sound even when phone is locked or app is in background
            </span>
          </div>

          <div className="flex items-center gap-2">
            {settings.notifications.permissionStatus !== 'granted' && (
              <button
                onClick={requestNotificationPermission}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Enable
              </button>
            )}
            <button
              onClick={triggerTestAlarm}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/70 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="Test alarm sound & notification"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Test</span>
            </button>
          </div>
        </div>

        {/* School Schedule Notification Note */}
        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 mb-3 text-[11px] text-white/60 flex items-center justify-between">
          <span>School alarm:</span>
          <span className="font-semibold text-white tabular-nums">07:00 AM – 10:00 AM</span>
        </div>

        {/* Schedule Reminders */}
        <div className="flex items-center justify-between py-2.5 border-b border-white/5">
          <div>
            <span className="text-xs text-white/80 block">Schedule reminders</span>
            <span className="text-[10px] text-white/40 block">
              Where you need to be and configured times
            </span>
          </div>
          <button
            onClick={() =>
              updateSettings({
                notifications: {
                  ...settings.notifications,
                  scheduleReminders: !settings.notifications.scheduleReminders,
                },
              })
            }
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
              settings.notifications.scheduleReminders ? 'bg-green-500' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.notifications.scheduleReminders ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Focus Reminders */}
        <div className="flex items-center justify-between py-2.5 border-b border-white/5">
          <div>
            <span className="text-xs text-white/80 block">Focus reminders</span>
            <span className="text-[10px] text-white/40 block">
              Points back to your goal — building a life to marry
            </span>
          </div>
          <button
            onClick={() =>
              updateSettings({
                notifications: {
                  ...settings.notifications,
                  focusReminders: !settings.notifications.focusReminders,
                },
              })
            }
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
              settings.notifications.focusReminders ? 'bg-green-500' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.notifications.focusReminders ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Random 100 istighfar */}
        <div className="flex items-center justify-between py-2.5 border-b border-white/5">
          <div>
            <span className="text-xs text-white/80 block">Random 100 istighfar</span>
            <span className="text-[10px] text-white/40 block">
              Carries the approved love-strengthening reminder
            </span>
          </div>
          <button
            onClick={() =>
              updateSettings({
                notifications: {
                  ...settings.notifications,
                  randomIstighfar: !settings.notifications.randomIstighfar,
                },
              })
            }
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
              settings.notifications.randomIstighfar ? 'bg-green-500' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.notifications.randomIstighfar ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Quiet rules on Rest days */}
        <div className="flex items-center justify-between py-2.5 border-b border-white/5">
          <div>
            <span className="text-xs text-white/80 block">Quiet on Rest days</span>
            <span className="text-[10px] text-white/40 block">
              Mutes non-essential notifications on Rest paths
            </span>
          </div>
          <button
            onClick={() =>
              updateSettings({
                notifications: {
                  ...settings.notifications,
                  quietRestDays: !settings.notifications.quietRestDays,
                },
              })
            }
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
              settings.notifications.quietRestDays ? 'bg-green-500' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.notifications.quietRestDays ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Lock Screen Privacy */}
        <div className="flex items-center justify-between py-2.5">
          <div>
            <span className="text-xs text-white/80 block">Lock screen privacy</span>
            <span className="text-[10px] text-white/40 block">
              Keeps sensitive relationship text private on lock screen
            </span>
          </div>
          <button
            onClick={() =>
              updateSettings({
                notifications: {
                  ...settings.notifications,
                  lockScreenPrivacy: !settings.notifications.lockScreenPrivacy,
                },
              })
            }
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
              settings.notifications.lockScreenPrivacy ? 'bg-green-500' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.notifications.lockScreenPrivacy ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </section>

      {/* 6. Approved Love-Strengthening Evidence */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold tracking-tight text-white/95">
            Approved evidence & goal
          </h2>
          <button
            onClick={() => (notesEditing ? saveNotes() : setNotesEditing(true))}
            className="text-[11px] text-white/60 hover:text-white underline cursor-pointer"
          >
            {notesEditing ? 'Save' : 'Edit'}
          </button>
        </div>
        <p className="text-[11px] text-white/40 mb-3">
          Drawn only from facts you personally approve. Never claims to know another&apos;s thoughts.
        </p>

        {notesEditing ? (
          <div>
            <textarea
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
              rows={3}
              className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white leading-relaxed focus:outline-none focus:border-white/30"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setNotesEditing(false)}
                className="px-2.5 py-1 text-xs text-white/50 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={saveNotes}
                className="px-3 py-1 rounded-lg bg-white/15 text-xs font-semibold text-white"
              >
                Save Evidence
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-white/75 leading-relaxed italic">
            &ldquo;{settings.loveStrengtheningNotes}&rdquo;
          </div>
        )}
      </section>

      {/* 7. Android Clean Widget */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <h3 className="text-xs font-semibold text-white/90">
                Android clean widget
              </h3>
            </div>
            <p className="text-[10px] text-white/40 mt-0.5">
              Quick view: live clock, Salat countdown, gym routine &amp; 1-tap focus
            </p>
          </div>
          <button
            onClick={() => setShowWidgetPreview(true)}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Preview
          </button>
        </div>
      </section>

      {/* 8. Morning Setup Launcher */}
      <section className={`p-4 sm:p-5 ${cardStyle}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-white/90">
              Run morning setup again
            </h3>
            <p className="text-[10px] text-white/40">
              Pick a new path or task selection for today
            </p>
          </div>
          <button
            onClick={() => setIsMorningSetupOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Set Today
          </button>
        </div>
      </section>
    </div>
  );
};
