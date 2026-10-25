export type DailyPath = 'rest' | 'locked_in' | 'busy';

export type WorkArea = 'find_niche' | 'quran_nature' | 'school';

export interface TaskItem {
  id: string;
  title: string;
  area: WorkArea;
  completed: boolean;
  completedAt?: number;
  focusMinutes: number;
}

export type PrayerKey = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface PrayerInfo {
  key: PrayerKey;
  name: string;
  timeStr: string;
  remainingSeconds: number;
  remainingFormatted: string;
  isNext: boolean;
  isCurrent: boolean;
}

export type GymDayType = 'push' | 'pull' | 'leg' | 'rest';

export interface ExerciseItem {
  id: string;
  name: string;
  sets: string;
  target: string;
  formCue: string;
  illustrationType: 'incline_bench' | 'flat_bench' | 'overhead_press' | 'lateral_raise' | 'tricep_rope' | 'lat_pulldown' | 'barbell_row' | 'tbar_row' | 'face_pull' | 'bicep_curl' | 'squat' | 'rdl' | 'leg_press' | 'leg_curl' | 'calf_raise' | 'mobility';
  muscleGroup: string;
  completed: boolean;
}

export interface GymSession {
  dayName: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  type: GymDayType;
  title: string;
  focus: string;
  timeRange: string;
  isRestDay: boolean;
  exercises: ExerciseItem[];
  completed: boolean;
}

export type ThemeId =
  | 'ash'
  | 'sand'
  | 'sage'
  | 'aurora'
  | 'smoke'
  | 'tide'
  | 'bloom'
  | 'ember'
  | 'grove'
  | 'dusk';

export type AccentId = 'green' | 'blue' | 'purple' | 'pink' | 'orange' | 'grey';

export type GlassIntensity = 'clear' | 'tinted';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  gradient: string;
  previewBg: string;
}

export interface AccentConfig {
  id: AccentId;
  name: string;
  hex: string;
  rgb: string;
  borderClass: string;
  bgClass: string;
  textClass: string;
  glowStyle: string;
}

export type TabId = 'today' | 'progress' | 'streak' | 'settings';

export interface FocusSession {
  taskId?: string;
  taskTitle: string;
  durationMinutes: number;
  remainingSeconds: number;
  isRunning: boolean;
  isPaused: boolean;
  startedAt: number;
  elapsedSeconds: number;
}

export interface ScheduleItem {
  id: string;
  title: string;
  context: string;
  startTime: string;
  endTime: string;
  place?: string;
}

export interface QuranProgress {
  targetPages: number;
  completedPagesToday: number;
  currentJuz: number;
  weakestPage: number;
  weeklyCompletedDays: boolean[]; // Mon - Sun
}

export interface StreakData {
  current: number;
  best: number;
  startDate: string;
  history: Array<{ date: string; streak: number; reset?: boolean }>;
}

export interface NotificationSettings {
  scheduleReminders: boolean;
  focusReminders: boolean;
  randomIstighfar: boolean;
  quietRestDays: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  lockScreenPrivacy: boolean;
  permissionStatus: 'granted' | 'default' | 'denied';
  soundEnabled: boolean;
}

export interface AppSettings {
  theme: ThemeId;
  accent: AccentId;
  glassIntensity: GlassIntensity;
  reduceTransparency: boolean;
  defaultFocusDuration: number;
  breakLengthPreference: number;
  userName: string;
  loveStrengtheningNotes: string;
  prayerTimes: PrayerTimes;
  notifications: NotificationSettings;
}
