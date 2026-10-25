import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ACCENTS, THEMES, WEEKLY_GYM_SCHEDULE, WORKOUT_EXERCISES, playSereneChime, playFocusRingAlarm } from '../data/constants';
import {
  AccentConfig,
  AppSettings,
  DailyPath,
  FocusSession,
  GymDayType,
  GymSession,
  PrayerInfo,
  PrayerKey,
  PrayerTimes,
  QuranProgress,
  ScheduleItem,
  StreakData,
  TabId,
  TaskItem,
  ThemeConfig,
  WorkArea,
} from '../types';

interface AppContextValue {
  currentTab: TabId;
  setCurrentTab: (tab: TabId) => void;
  selectedPath: DailyPath;
  setSelectedPath: (path: DailyPath) => void;
  primaryWorkArea: WorkArea;
  setPrimaryWorkArea: (area: WorkArea) => void;
  tasks: TaskItem[];
  toggleTask: (id: string) => void;
  prayerTimes: PrayerTimes;
  updatePrayerTime: (prayer: PrayerKey, time: string) => void;
  prayersInfo: PrayerInfo[];
  nextPrayer: PrayerInfo | null;
  quran: QuranProgress;
  logQuranPage: (delta: number) => void;
  setJuz: (juz: number) => void;
  setWeakestPage: (page: number) => void;
  gym: GymSession;
  selectedGymDay: number;
  setSelectedGymDay: (day: number) => void;
  toggleExercise: (exerciseId: string) => void;
  toggleGymSessionCompleted: () => void;
  isGymDrawerOpen: boolean;
  setIsGymDrawerOpen: (open: boolean) => void;
  isFriday: boolean;
  streak: StreakData;
  resetCurrentStreak: () => void;
  confirmStreakDay: () => void;
  focusSession: FocusSession | null;
  startFocus: (durationMinutes: number, task?: { id?: string; title: string }) => void;
  pauseFocus: () => void;
  resumeFocus: () => void;
  endFocus: (saveElapsed?: boolean) => void;
  todayFocusMinutes: number;
  dailyFocusGoalMinutes: number;
  weeklyFocusMinutes: number[];
  weeklyDoneStats: { completed: number; unfinished: number };
  weeklyRingsFraction: number[];
  scheduleItems: ScheduleItem[];
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  requestNotificationPermission: () => Promise<boolean>;
  triggerTestAlarm: () => void;
  themeConfig: ThemeConfig;
  accentConfig: AccentConfig;
  isFocusModalOpen: boolean;
  setIsFocusModalOpen: (open: boolean) => void;
  isMorningSetupOpen: boolean;
  setIsMorningSetupOpen: (open: boolean) => void;
  completeMorningSetup: (path: DailyPath, area: WorkArea, selectedTasks: string[]) => void;
  showNotificationDrawer: boolean;
  setShowNotificationDrawer: (open: boolean) => void;
  showWidgetPreview: boolean;
  setShowWidgetPreview: (open: boolean) => void;
}

const STORAGE_KEY = 'nusi_app_state_v3';

const localDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
};

const localWeekKey = (date = new Date()) => {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return localDateKey(monday);
};

const DEFAULT_PRAYER_TIMES: PrayerTimes = {
  fajr: '05:15',
  dhuhr: '12:30',
  asr: '15:45',
  maghrib: '18:15',
  isha: '19:45',
};

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dusk',
  accent: 'green',
  glassIntensity: 'clear',
  reduceTransparency: false,
  defaultFocusDuration: 25,
  breakLengthPreference: 5,
  userName: 'You',
  loveStrengtheningNotes:
    'Build a life rooted in faith, discipline, and kindness. Take one honest step toward your future each day.',
  prayerTimes: DEFAULT_PRAYER_TIMES,
  notifications: {
    scheduleReminders: true,
    focusReminders: true,
    randomIstighfar: true,
    quietRestDays: true,
    quietHoursStart: '22:00',
    quietHoursEnd: '07:00',
    lockScreenPrivacy: true,
    permissionStatus: 'default',
    soundEnabled: true,
  },
};

// School is strictly 07:00 morning to 10:00 as requested!
const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sch_1',
    title: 'School',
    context: 'Maths & Core Subjects',
    startTime: '07:00',
    endTime: '10:00',
    place: 'School',
  },
  {
    id: 'sch_2',
    title: "Qur'an revision",
    context: 'Juz 3 Review',
    startTime: '10:30',
    endTime: '10:50',
    place: 'Study Room',
  },
  {
    id: 'sch_3',
    title: 'Gym',
    context: 'Push / Pull / Leg',
    startTime: '16:30',
    endTime: '17:30',
    place: 'Gym',
  },
];

const INITIAL_TASKS: TaskItem[] = [
  { id: 't_1', title: 'Find product', area: 'find_niche', completed: false, focusMinutes: 0 },
  { id: 't_2', title: 'Edit video', area: 'find_niche', completed: false, focusMinutes: 0 },
  { id: 't_3', title: 'Review video', area: 'find_niche', completed: false, focusMinutes: 0 },
];

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<TabId>('today');
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [isMorningSetupOpen, setIsMorningSetupOpen] = useState(false);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const [showWidgetPreview, setShowWidgetPreview] = useState(false);
  const [isGymDrawerOpen, setIsGymDrawerOpen] = useState(false);

  const [selectedPath, setSelectedPath] = useState<DailyPath>('locked_in');
  const [primaryWorkArea, setPrimaryWorkArea] = useState<WorkArea>('find_niche');
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [lastActiveDate, setLastActiveDate] = useState(localDateKey());
  const [lastWeekKey, setLastWeekKey] = useState(localWeekKey());

  // Prayer Times (no checklist marks, remaining times calculated live)
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(DEFAULT_PRAYER_TIMES);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Qur'an Revision
  const [quran, setQuran] = useState<QuranProgress>({
    targetPages: 4,
    completedPagesToday: 0,
    currentJuz: 3,
    weakestPage: 18,
    weeklyCompletedDays: [false, false, false, false, false, false, false],
  });

  // Gym day index: 0 = Sun, 1 = Mon, ..., 6 = Sat
  const [selectedGymDay, setSelectedGymDay] = useState<number>(new Date().getDay());
  const [exerciseCompletionMap, setExerciseCompletionMap] = useState<Record<string, boolean>>({});
  const [gymCompletedMap, setGymCompletedMap] = useState<Record<string, boolean>>({});

  // Streak
  const [streak, setStreak] = useState<StreakData>({
    current: 0,
    best: 0,
    startDate: localDateKey(),
    history: [],
  });

  // Settings
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // Focus Timer
  const [focusSession, setFocusSession] = useState<FocusSession | null>(null);
  const [todayFocusMinutes, setTodayFocusMinutes] = useState(0);
  const dailyFocusGoalMinutes = 180;
  const [weeklyFocusMinutes, setWeeklyFocusMinutes] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  // Schedule items
  const [scheduleItems] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);

  // Clock tick every second for real-time countdowns & notifications
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Synchronize notification permission status
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const perm = Notification.permission as 'granted' | 'default' | 'denied';
      setSettings((s) => ({
        ...s,
        notifications: { ...s.notifications, permissionStatus: perm },
      }));
    }
  }, []);

  // Persistent storage load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const today = localDateKey();
      const thisWeek = localWeekKey();
      if (saved) {
        const p = JSON.parse(saved);
        const isNewDay = Boolean(p.lastActiveDate && p.lastActiveDate !== today);
        const isNewWeek = Boolean(p.lastWeekKey && p.lastWeekKey !== thisWeek);
        if (p.selectedPath) setSelectedPath(p.selectedPath);
        if (p.primaryWorkArea) setPrimaryWorkArea(p.primaryWorkArea);
        if (Array.isArray(p.tasks)) setTasks(isNewDay ? p.tasks.map((task: TaskItem) => ({ ...task, completed: false, completedAt: undefined })) : p.tasks);
        if (p.prayerTimes) setPrayerTimes({ ...DEFAULT_PRAYER_TIMES, ...p.prayerTimes });
        if (p.quran) setQuran({
          ...p.quran,
          completedPagesToday: isNewDay ? 0 : (p.quran.completedPagesToday || 0),
          weeklyCompletedDays: isNewWeek ? [false, false, false, false, false, false, false] : (p.quran.weeklyCompletedDays || [false, false, false, false, false, false, false]),
        });
        if (p.streak) setStreak(p.streak);
        if (p.settings) setSettings({ ...DEFAULT_SETTINGS, ...p.settings, notifications: { ...DEFAULT_SETTINGS.notifications, ...(p.settings.notifications || {}) } });
        if (!isNewDay && typeof p.todayFocusMinutes === 'number') setTodayFocusMinutes(p.todayFocusMinutes);
        if (Array.isArray(p.weeklyFocusMinutes) && !isNewWeek) setWeeklyFocusMinutes(p.weeklyFocusMinutes);
        if (p.gymCompletedMap) setGymCompletedMap(p.gymCompletedMap);
        if (p.exerciseCompletionMap) setExerciseCompletionMap(p.exerciseCompletionMap);
        if (!isNewDay && p.focusSession) setFocusSession({ ...p.focusSession, isPaused: true });
      }
      setLastActiveDate(today);
      setLastWeekKey(thisWeek);
    } catch {
      // Ignore corrupted or unavailable saved state and keep clean defaults
    } finally {
      setHasLoaded(true);
    }
  }, []);

  // Persistent storage save; wait for the initial read before writing defaults.
  useEffect(() => {
    if (!hasLoaded) return;
    try {
      const payload = {
        lastActiveDate,
        lastWeekKey,
        focusSession,
        selectedPath,
        primaryWorkArea,
        tasks,
        prayerTimes,
        quran,
        streak,
        settings,
        todayFocusMinutes,
        weeklyFocusMinutes,
        gymCompletedMap,
        exerciseCompletionMap,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage restricted
    }
  }, [
    hasLoaded,
    lastActiveDate,
    lastWeekKey,
    focusSession,
    selectedPath,
    primaryWorkArea,
    tasks,
    prayerTimes,
    quran,
    streak,
    settings,
    todayFocusMinutes,
    weeklyFocusMinutes,
    gymCompletedMap,
    exerciseCompletionMap,
  ]);

  // Roll daily counters over automatically when the local calendar changes.
  useEffect(() => {
    const today = localDateKey(currentTime);
    const thisWeek = localWeekKey(currentTime);
    if (today !== lastActiveDate) {
      setLastActiveDate(today);
      setTasks((cur) => cur.map((task) => ({ ...task, completed: false, completedAt: undefined })));
      setQuran((cur) => ({ ...cur, completedPagesToday: 0 }));
      setTodayFocusMinutes(0);
      setFocusSession(null);
    }
    if (thisWeek !== lastWeekKey) {
      setLastWeekKey(thisWeek);
      setWeeklyFocusMinutes([0, 0, 0, 0, 0, 0, 0]);
      setQuran((cur) => ({ ...cur, weeklyCompletedDays: [false, false, false, false, false, false, false] }));
      setGymCompletedMap({});
      setExerciseCompletionMap({});
    }
  }, [currentTime, lastActiveDate, lastWeekKey]);

  // Real-time Salat Remaining Time Calculation (no checklist marks!)
  const { prayersInfo, nextPrayer } = useMemo(() => {
    const list: PrayerKey[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const names: Record<PrayerKey, string> = {
      fajr: 'Fajr',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
    };

    const now = currentTime;
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const currentSecs = now.getSeconds();

    let foundNext: PrayerInfo | null = null;
    let minDiffSecs = Infinity;

    const infos: PrayerInfo[] = list.map((key) => {
      const [hStr, mStr] = prayerTimes[key].split(':');
      const h = parseInt(hStr, 10) || 0;
      const m = parseInt(mStr, 10) || 0;
      const prayerTotalSecs = (h * 60 + m) * 60;
      const nowTotalSecs = currentMins * 60 + currentSecs;

      let diffSecs = prayerTotalSecs - nowTotalSecs;
      if (diffSecs < 0) {
        // Prayer has passed for today; next occurrence is tomorrow
        diffSecs += 24 * 3600;
      }

      // Format clean remaining time
      const hours = Math.floor(diffSecs / 3600);
      const mins = Math.floor((diffSecs % 3600) / 60);
      let remainingFormatted = '';
      if (hours > 0) {
        remainingFormatted = `in ${hours}h ${mins}m`;
      } else if (mins > 0) {
        remainingFormatted = `in ${mins}m`;
      } else {
        remainingFormatted = `in ${diffSecs}s`;
      }

      const info: PrayerInfo = {
        key,
        name: names[key],
        timeStr: prayerTimes[key],
        remainingSeconds: diffSecs,
        remainingFormatted,
        isNext: false,
        isCurrent: diffSecs > 24 * 3600 - 30 * 60, // active prayer window
      };

      if (diffSecs < minDiffSecs) {
        minDiffSecs = diffSecs;
        foundNext = info;
      }

      return info;
    });

    if (foundNext) {
      (foundNext as PrayerInfo).isNext = true;
    }

    return { prayersInfo: infos, nextPrayer: foundNext };
  }, [prayerTimes, currentTime]);

  // Is today Friday?
  const isFriday = useMemo(() => currentTime.getDay() === 5, [currentTime]);

  // Gym Session derived from user's exact schedule
  const gymScheduleEntry = WEEKLY_GYM_SCHEDULE[selectedGymDay] || WEEKLY_GYM_SCHEDULE[1];
  const weekKey = localWeekKey(currentTime);
  const exerciseKeyPrefix = weekKey + ':' + selectedGymDay + ':';
  const activeExercises = (WORKOUT_EXERCISES[gymScheduleEntry.type] || []).map((exercise) => ({
    ...exercise,
    completed: !!exerciseCompletionMap[exerciseKeyPrefix + exercise.id],
  }));

  const gym: GymSession = useMemo(
    () => ({
      dayName: gymScheduleEntry.dayName,
      type: gymScheduleEntry.type,
      title: gymScheduleEntry.title,
      focus: gymScheduleEntry.focus,
      timeRange: gymScheduleEntry.timeRange,
      isRestDay: gymScheduleEntry.isRestDay,
      exercises: activeExercises,
      completed: !!gymCompletedMap[weekKey + ':' + selectedGymDay],
    }),
    [gymScheduleEntry, activeExercises, gymCompletedMap, selectedGymDay, weekKey]
  );

  const toggleExercise = (exerciseId: string) => {
    const key = weekKey + ':' + selectedGymDay + ':' + exerciseId;
    setExerciseCompletionMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleGymSessionCompleted = () => {
    const key = weekKey + ':' + selectedGymDay;
    setGymCompletedMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updatePrayerTime = (prayer: PrayerKey, time: string) => {
    setPrayerTimes((prev) => ({ ...prev, [prayer]: time }));
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }
    try {
      const result = await Notification.requestPermission();
      setSettings((s) => ({
        ...s,
        notifications: { ...s.notifications, permissionStatus: result },
      }));
      if (result === 'granted') {
        if (settings.notifications.soundEnabled) playSereneChime();
        new Notification('Nusi · Notifications Active', {
          body: 'System notifications are permitted. Reminder delivery depends on browser activity.',
          icon: import.meta.env.BASE_URL + 'icon.svg',
        });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const triggerTestAlarm = () => {
    if (settings.notifications.soundEnabled) playSereneChime();
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('Nusi · Schedule Reminder', {
        body: 'School begins at 07:00 AM · Maths & Core Subjects',
        icon: import.meta.env.BASE_URL + 'icon.svg',
      });
    }
  };

  // Background check for alarms (School at 07:00, next prayer, etc.)
  useEffect(() => {
    if (!settings.notifications.scheduleReminders) return;

    const checkInterval = setInterval(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const secs = now.getSeconds();
      // Browser reminders are only reliable while the app is running.
      if (secs > 5) return;
      if (settings.notifications.quietRestDays && selectedPath === 'rest') return;
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const quietStartParts = settings.notifications.quietHoursStart.split(':').map(Number);
      const quietEndParts = settings.notifications.quietHoursEnd.split(':').map(Number);
      const quietStart = quietStartParts[0] * 60 + quietStartParts[1];
      const quietEnd = quietEndParts[0] * 60 + quietEndParts[1];
      const isQuiet = quietStart === quietEnd ? false : quietStart < quietEnd ? nowMinutes >= quietStart && nowMinutes < quietEnd : nowMinutes >= quietStart || nowMinutes < quietEnd;
      if (isQuiet) return;

      // School alarm at 07:00
      if (timeStr === '07:00') {
        if (settings.notifications.soundEnabled) playSereneChime();
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Nusi · School Reminder', {
            body: 'School time: 07:00 to 10:00. Time to lock in.',
            icon: import.meta.env.BASE_URL + 'icon.svg',
          });
        }
      }

      // Gym alarm at 16:30 if not Friday rest
      if (timeStr === '16:30' && now.getDay() !== 5) {
        if (settings.notifications.soundEnabled) playSereneChime();
        const routine = WEEKLY_GYM_SCHEDULE[now.getDay()]?.title || 'Gym';
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`Nusi · Gym: ${routine}`, {
            body: 'Time for your session. Stay disciplined.',
            icon: import.meta.env.BASE_URL + 'icon.svg',
          });
        }
      }
    }, 15000);

    return () => clearInterval(checkInterval);
  }, [settings.notifications.scheduleReminders, settings.notifications.soundEnabled, settings.notifications.quietRestDays, settings.notifications.quietHoursStart, settings.notifications.quietHoursEnd, selectedPath]);

  // Random istighfar reminders run only while the app is open; the browser may suspend background timers.
  useEffect(() => {
    if (!settings.notifications.randomIstighfar) return;
    const reminderInterval = setInterval(() => {
      if (Math.random() > 0.45) return;
      const now = new Date();
      if (settings.notifications.quietRestDays && selectedPath === 'rest') return;
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const startParts = settings.notifications.quietHoursStart.split(':').map(Number);
      const endParts = settings.notifications.quietHoursEnd.split(':').map(Number);
      const quietStart = startParts[0] * 60 + startParts[1];
      const quietEnd = endParts[0] * 60 + endParts[1];
      const quiet = quietStart === quietEnd ? false : quietStart < quietEnd ? currentMinutes >= quietStart && currentMinutes < quietEnd : currentMinutes >= quietStart || currentMinutes < quietEnd;
      if (quiet || !('Notification' in window) || Notification.permission !== 'granted') return;
      new Notification('Nusi · Istighfar', {
        body: settings.notifications.lockScreenPrivacy ? 'Take a quiet moment for istighfar and renew your intention.' : 'Take a moment to say Astaghfirullah 100 times. ' + settings.loveStrengtheningNotes,
        icon: import.meta.env.BASE_URL + 'icon.svg',
      });
    }, 2 * 60 * 60 * 1000);
    return () => clearInterval(reminderInterval);
  }, [settings.notifications.randomIstighfar, settings.notifications.quietRestDays, settings.notifications.quietHoursStart, settings.notifications.quietHoursEnd, settings.notifications.lockScreenPrivacy, settings.loveStrengtheningNotes, selectedPath]);

  // Focus timer runner
  useEffect(() => {
    if (!focusSession || !focusSession.isRunning) {
      document.title = 'Nusi — Personal Daily Progress';
      return;
    }

    if (focusSession.isPaused) {
      const mins = Math.floor(focusSession.remainingSeconds / 60);
      const secs = focusSession.remainingSeconds % 60;
      document.title = `[Paused] ${mins}:${secs < 10 ? '0' : ''}${secs} - Focus | Nusi`;
      return;
    }

    const mins = Math.floor(focusSession.remainingSeconds / 60);
    const secs = focusSession.remainingSeconds % 60;
    document.title = `(${mins}:${secs < 10 ? '0' : ''}${secs}) ${focusSession.taskTitle} | Nusi`;

    const interval = setInterval(() => {
      setFocusSession((prev) => {
        if (!prev || !prev.isRunning || prev.isPaused) return prev;
        if (prev.remainingSeconds <= 1) {
          // Play ringing bell alarm as requested!
          if (settings.notifications.soundEnabled) playFocusRingAlarm();
          document.title = '🔔 Focus Completed! | Nusi';

          const elapsedMins = Math.ceil(prev.durationMinutes);
          setTodayFocusMinutes((m) => m + elapsedMins);
          setWeeklyFocusMinutes((arr) => {
            const next = [...arr];
            const dayIdx = (new Date().getDay() + 6) % 7;
            next[dayIdx] = (next[dayIdx] || 0) + elapsedMins;
            return next;
          });
          if (prev.taskId) {
            setTasks((cur) =>
              cur.map((t) =>
                t.id === prev.taskId ? { ...t, focusMinutes: t.focusMinutes + elapsedMins } : t
              )
            );
          }
          if (settings.notifications.focusReminders && 'Notification' in window && Notification.permission === 'granted') {
            new Notification('Nusi · Focus Finished 🔔', {
              body: settings.notifications.lockScreenPrivacy ? 'Your focus session is complete. Take a short break before the next step.' : `Completed ${elapsedMins}m of focus on ${prev.taskTitle}. Time to rest or switch tasks.`,
              icon: import.meta.env.BASE_URL + 'icon.svg',
            });
          }
          return null;
        }

        const nextSecs = prev.remainingSeconds - 1;
        const nextMins = Math.floor(nextSecs / 60);
        const remSecs = nextSecs % 60;
        document.title = `(${nextMins}:${remSecs < 10 ? '0' : ''}${remSecs}) ${prev.taskTitle} | Nusi`;

        return {
          ...prev,
          remainingSeconds: nextSecs,
          elapsedSeconds: prev.elapsedSeconds + 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [focusSession, settings.notifications.focusReminders, settings.notifications.soundEnabled, settings.notifications.lockScreenPrivacy]);

  // Actions
  const toggleTask = (id: string) => {
    setTasks((cur) =>
      cur.map((t) => t.id === id ? { ...t, completed: !t.completed, completedAt: !t.completed ? Date.now() : undefined } : t)
    );
  };

  const logQuranPage = (delta: number) => {
    setQuran((cur) => {
      const nextPages = Math.max(0, Math.min(cur.targetPages, cur.completedPagesToday + delta));
      const dayIndex = (currentTime.getDay() + 6) % 7;
      const weeklyCompletedDays = [...cur.weeklyCompletedDays];
      weeklyCompletedDays[dayIndex] = nextPages >= cur.targetPages;
      return { ...cur, completedPagesToday: nextPages, weeklyCompletedDays };
    });
  };

  const setJuz = (juz: number) => {
    setQuran((cur) => ({ ...cur, currentJuz: Math.max(1, Math.min(30, juz)) }));
  };

  const setWeakestPage = (page: number) => {
    setQuran((cur) => ({ ...cur, weakestPage: Math.max(1, Math.min(604, page)) }));
  };

  const resetCurrentStreak = () => {
    const today = localDateKey(currentTime);
    setStreak((cur) => ({ ...cur, current: 0, startDate: today, history: [...cur.history, { date: today, streak: cur.current, reset: true }] }));
  };

  const confirmStreakDay = () => {
    const today = localDateKey(currentTime);
    const yesterdayDate = new Date(currentTime);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = localDateKey(yesterdayDate);
    setStreak((cur) => {
      if (cur.history.some((entry) => entry.date === today && !entry.reset)) return cur;
      const lastSuccess = [...cur.history].reverse().find((entry) => !entry.reset);
      const nextCurrent = lastSuccess && lastSuccess.date === yesterday ? cur.current + 1 : 1;
      return { ...cur, current: nextCurrent, best: Math.max(cur.best, nextCurrent), startDate: nextCurrent === 1 ? today : cur.startDate, history: [...cur.history, { date: today, streak: nextCurrent }] };
    });
  };

  const startFocus = (durationMinutes: number, task?: { id?: string; title: string }) => {
    const safeDuration = Math.max(1, Math.min(180, Math.round(durationMinutes)));
    const totalSecs = safeDuration * 60;
    setFocusSession({
      taskId: task?.id,
      taskTitle: task?.title || 'General Focus',
      durationMinutes: safeDuration,
      remainingSeconds: totalSecs,
      isRunning: true,
      isPaused: false,
      startedAt: Date.now(),
      elapsedSeconds: 0,
    });
  };

  const pauseFocus = () => {
    setFocusSession((prev) => (prev ? { ...prev, isPaused: true } : null));
  };

  const resumeFocus = () => {
    setFocusSession((prev) => (prev ? { ...prev, isPaused: false } : null));
  };

  const endFocus = (saveElapsed = true) => {
    if (focusSession && saveElapsed && focusSession.elapsedSeconds > 30) {
      const elapsedMins = Math.round(focusSession.elapsedSeconds / 60);
      if (elapsedMins > 0) {
        setTodayFocusMinutes((m) => m + elapsedMins);
        setWeeklyFocusMinutes((arr) => {
          const next = [...arr];
          const dayIdx = (new Date().getDay() + 6) % 7;
          next[dayIdx] = (next[dayIdx] || 0) + elapsedMins;
          return next;
        });
        if (focusSession.taskId) {
          setTasks((cur) =>
            cur.map((t) =>
              t.id === focusSession.taskId
                ? { ...t, focusMinutes: t.focusMinutes + elapsedMins }
                : t
            )
          );
        }
      }
    }
    setFocusSession(null);
  };

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettings((cur) => ({ ...cur, ...partial }));
  };

  const completeMorningSetup = (
    path: DailyPath,
    area: WorkArea,
    selectedTaskTitles: string[]
  ) => {
    setSelectedPath(path);
    setPrimaryWorkArea(area);
    if (path === 'rest') {
      setTasks([
        {
          id: `t_rest_${Date.now()}`,
          title: "Read Qur'an (1 page)",
          area: 'quran_nature',
          completed: false,
          focusMinutes: 0,
        },
      ]);
    } else if (path === 'busy') {
      setTasks([]);
    } else {
      const newTasks: TaskItem[] = selectedTaskTitles.map((title, idx) => ({
        id: `t_${Date.now()}_${idx}`,
        title,
        area,
        completed: false,
        focusMinutes: 0,
      }));
      setTasks(newTasks);
    }
    setIsMorningSetupOpen(false);
  };

  const themeConfig = useMemo(() => {
    return THEMES.find((t) => t.id === settings.theme) || THEMES[0];
  }, [settings.theme]);

  const accentConfig = useMemo(() => {
    return ACCENTS[settings.accent] || ACCENTS.green;
  }, [settings.accent]);

  const weeklyDoneStats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    const unfinished = tasks.filter((t) => !t.completed).length;
    return { completed, unfinished };
  }, [tasks]);

  const weeklyRingsFraction = useMemo(() => weeklyFocusMinutes.map((minutes) => Math.max(0, Math.min(1, minutes / dailyFocusGoalMinutes))), [weeklyFocusMinutes, dailyFocusGoalMinutes]);

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        selectedPath,
        setSelectedPath,
        primaryWorkArea,
        setPrimaryWorkArea,
        tasks,
        toggleTask,
        prayerTimes,
        updatePrayerTime,
        prayersInfo,
        nextPrayer,
        quran,
        logQuranPage,
        setJuz,
        setWeakestPage,
        gym,
        selectedGymDay,
        setSelectedGymDay,
        toggleExercise,
        toggleGymSessionCompleted,
        isGymDrawerOpen,
        setIsGymDrawerOpen,
        isFriday,
        streak,
        resetCurrentStreak,
        confirmStreakDay,
        focusSession,
        startFocus,
        pauseFocus,
        resumeFocus,
        endFocus,
        todayFocusMinutes,
        dailyFocusGoalMinutes,
        weeklyFocusMinutes,
        weeklyDoneStats,
        weeklyRingsFraction,
        scheduleItems,
        settings,
        updateSettings,
        requestNotificationPermission,
        triggerTestAlarm,
        themeConfig,
        accentConfig,
        isFocusModalOpen,
        setIsFocusModalOpen,
        isMorningSetupOpen,
        setIsMorningSetupOpen,
        completeMorningSetup,
        showNotificationDrawer,
        setShowNotificationDrawer,
        showWidgetPreview,
        setShowWidgetPreview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
