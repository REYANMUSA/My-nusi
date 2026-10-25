import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { BackgroundWallpaper } from './components/BackgroundWallpaper';
import { FloatingFocusPill } from './components/FloatingFocusPill';
import { Header } from './components/Header';
import { StatChips } from './components/StatChips';
import { SalahCard } from './components/SalahCard';
import { TodayRingsCard } from './components/TodayRingsCard';
import { UpNextCard } from './components/UpNextCard';
import { FocusCard } from './components/FocusCard';
import { MyTasksCard } from './components/MyTasksCard';
import { QuranRevisionCard } from './components/QuranRevisionCard';
import { GymCard } from './components/GymCard';
import { StreakCard } from './components/StreakCard';
import { RestDayView } from './components/RestDayView';
import { BusyDayView } from './components/BusyDayView';
import { ProgressScreen } from './components/ProgressScreen';
import { StreakScreen } from './components/StreakScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { FocusScreen } from './components/FocusScreen';
import { MorningSetupModal } from './components/MorningSetupModal';
import { NotificationModal } from './components/NotificationModal';
import { AndroidCleanWidget } from './components/AndroidCleanWidget';
import { GymFullScreen } from './components/GymFullScreen';
import { BottomNav } from './components/BottomNav';

const TodayContent: React.FC = () => {
  const { selectedPath } = useApp();

  return (
    <div className="space-y-3 pb-16">
      <Header />
      <StatChips />

      {selectedPath === 'rest' && <RestDayView />}

      {selectedPath === 'busy' && <BusyDayView />}

      {selectedPath === 'locked_in' && (
        <>
          {/* Salah Card FIRST, always */}
          <SalahCard />

          {/* My Tasks Checklist directly under Salat as requested */}
          <MyTasksCard />

          {/* Today Rings Card */}
          <TodayRingsCard />

          {/* Up Next Card */}
          <UpNextCard />

          {/* Quick Focus Card */}
          <FocusCard />

          {/* Qur'an Revision Card */}
          <QuranRevisionCard />

          {/* Gym Card */}
          <GymCard />

          {/* Streak Card */}
          <StreakCard />
        </>
      )}
    </div>
  );
};

const MainLayout: React.FC = () => {
  const { currentTab } = useApp();

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-white/20">
      {/* Dynamic Background Wallpaper */}
      <BackgroundWallpaper />

      {/* Global Floating Focus Pill (visible on all screens when timer running/paused) */}
      <FloatingFocusPill />

      {/* Single-Column Phone Canvas with responsive expansion */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 pt-4 pb-20 flex-1">
        {currentTab === 'today' && <TodayContent />}
        {currentTab === 'progress' && <ProgressScreen />}
        {currentTab === 'streak' && <StreakScreen />}
        {currentTab === 'settings' && <SettingsScreen />}
      </main>

      {/* Full-screen Focus Timer View */}
      <FocusScreen />

      {/* Morning Setup Modal */}
      <MorningSetupModal />

      {/* Notification Preview Drawer */}
      <NotificationModal />

      {/* Android Clean Widget Companion */}
      <AndroidCleanWidget />

      {/* Gym Full Screen View */}
      <GymFullScreen />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
