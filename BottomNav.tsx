import React from 'react';
import { Home, BarChart2, Flame, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TabId } from '../types';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, accentConfig, settings } = useApp();

  const tabs: Array<{ id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'today', label: 'Today', icon: Home },
    { id: 'progress', label: 'Progress', icon: BarChart2 },
    { id: 'streak', label: 'Streak', icon: Flame },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const barStyle = settings.reduceTransparency
    ? 'bg-[#18191E] border-t border-white/10'
    : 'bg-[#15171C]/85 backdrop-blur-2xl border-t border-white/10';

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 ${barStyle}`}
      aria-label="Main Navigation"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 h-16 px-2">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = currentTab === id;

          return (
            <button
              key={id}
              onClick={() => setCurrentTab(id)}
              className="flex flex-col items-center justify-center py-1 transition-all group cursor-pointer focus:outline-none"
              aria-label={label}
            >
              <div
                className={`transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'group-hover:scale-105 opacity-60'
                }`}
              >
                <Icon
                  className="w-5 h-5 transition-colors"
                  // Using style directly for accent
                />
              </div>

              <span
                className={`text-[10px] font-medium tracking-tight mt-1 transition-colors ${
                  isActive ? 'font-semibold' : 'text-white/50'
                }`}
                style={{
                  color: isActive ? accentConfig.hex : undefined,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
