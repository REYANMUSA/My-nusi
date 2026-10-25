import {
  AccentConfig,
  AccentId,
  DailyPath,
  ExerciseItem,
  GymDayType,
  ThemeConfig,
  ThemeId,
  WorkArea,
} from '../types';

export const PATH_CONFIG: Record<
  DailyPath,
  { label: string; subtitle: string; description: string; icon: string }
> = {
  rest: {
    label: 'Rest',
    subtitle: 'Recharge. Be present.',
    description: 'Deen plus one tiny thing only. Quiet reminders and space to breathe.',
    icon: 'Moon',
  },
  locked_in: {
    label: 'Locked In',
    subtitle: 'Focus. Make progress.',
    description: 'The full mission — one main priority plus disciplined tasks.',
    icon: 'Target',
  },
  busy: {
    label: 'Busy',
    subtitle: "Handle what's needed.",
    description: "Essentials only — Salah, Qur'an revision, and the anchor card.",
    icon: 'Briefcase',
  },
};

export const WORK_AREA_CONFIG: Record<
  WorkArea,
  { label: string; subtitle: string; tagColor: string }
> = {
  find_niche: {
    label: 'Find Niche',
    subtitle: 'Build. Create. Grow.',
    tagColor: '#3B82F6', // soft blue
  },
  quran_nature: {
    label: "Qur'an with Nature",
    subtitle: 'Reflect. Reconnect.',
    tagColor: '#10B981', // emerald
  },
  school: {
    label: 'School',
    subtitle: 'Learn. Improve.',
    tagColor: '#F59E0B', // amber
  },
};

// Exact tasks per area from PRD v1.2 (do not invent more)
export const AREA_TASKS: Record<WorkArea, string[]> = {
  find_niche: [
    'Find product',
    'Edit video',
    'Review video',
    'Post / upload video',
    'Review your account',
  ],
  quran_nature: [
    'Find clip',
    'Edit video',
    'Review video',
    'Post video',
    'Review your account',
  ],
  school: [
    'Maths',
    'English',
    'Geography',
    'History',
    'Accounting',
    'IT',
    'Economics',
  ],
};

// User's exact Gym schedule:
// Monday push, Tuesday pull, Wednesday leg, Thursday push, Friday rest, Saturday pull, Sunday leg
export const WEEKLY_GYM_SCHEDULE: Record<
  number, // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  {
    dayName: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    type: GymDayType;
    title: string;
    focus: string;
    timeRange: string;
    isRestDay: boolean;
  }
> = {
  1: {
    dayName: 'Monday',
    type: 'push',
    title: 'Push',
    focus: 'Chest, Shoulders & Triceps',
    timeRange: '4:30 PM - 5:30 PM',
    isRestDay: false,
  },
  2: {
    dayName: 'Tuesday',
    type: 'pull',
    title: 'Pull',
    focus: 'Back, Rear Delts & Biceps',
    timeRange: '4:30 PM - 5:30 PM',
    isRestDay: false,
  },
  3: {
    dayName: 'Wednesday',
    type: 'leg',
    title: 'Leg',
    focus: 'Quads, Hamstrings & Calves',
    timeRange: '4:30 PM - 5:30 PM',
    isRestDay: false,
  },
  4: {
    dayName: 'Thursday',
    type: 'push',
    title: 'Push',
    focus: 'Chest & Overhead Press Focus',
    timeRange: '4:30 PM - 5:30 PM',
    isRestDay: false,
  },
  5: {
    dayName: 'Friday',
    type: 'rest',
    title: 'Friday Rest',
    focus: 'Muscle recovery & Jumuah',
    timeRange: 'Rest & Recover',
    isRestDay: true,
  },
  6: {
    dayName: 'Saturday',
    type: 'pull',
    title: 'Pull',
    focus: 'Heavy Rows & Bicep Volume',
    timeRange: '4:30 PM - 5:30 PM',
    isRestDay: false,
  },
  0: {
    dayName: 'Sunday',
    type: 'leg',
    title: 'Leg',
    focus: 'Squats & Posterior Chain',
    timeRange: '4:30 PM - 5:30 PM',
    isRestDay: false,
  },
};

export const WORKOUT_EXERCISES: Record<GymDayType, ExerciseItem[]> = {
  push: [
    {
      id: 'p_1',
      name: 'Incline Dumbbell Bench Press',
      sets: '3 sets × 8–10 reps',
      target: 'Upper Chest & Front Deltoids',
      formCue: 'Set bench to 30°. Keep scapulae retracted, lower dumbbells with elbows at 45°, drive up without clashing weights.',
      illustrationType: 'incline_bench',
      muscleGroup: 'Clavicular Pectoralis Major',
      completed: false,
    },
    {
      id: 'p_2',
      name: 'Flat Barbell Bench Press',
      sets: '3 sets × 6–8 reps',
      target: 'Mid & Lower Pectorals',
      formCue: 'Eyes under barbell, arch upper back, grip slightly wider than shoulder width. Touch mid-sternum with pause.',
      illustrationType: 'flat_bench',
      muscleGroup: 'Sternal Pectoralis Major',
      completed: false,
    },
    {
      id: 'p_3',
      name: 'Seated Dumbbell Shoulder Press',
      sets: '3 sets × 8–10 reps',
      target: 'Anterior & Lateral Deltoids',
      formCue: 'Vertical bench with slight incline. Press overhead in a natural arc, avoid flaring elbows wide.',
      illustrationType: 'overhead_press',
      muscleGroup: 'Anterior Deltoid & Triceps',
      completed: false,
    },
    {
      id: 'p_4',
      name: 'Dumbbell Lateral Raises',
      sets: '4 sets × 12–15 reps',
      target: 'Lateral Deltoids (Side Cap)',
      formCue: 'Slight forward torso lean. Lead with elbows, raise to parallel with ground. Control the eccentric lowering.',
      illustrationType: 'lateral_raise',
      muscleGroup: 'Lateral Deltoid',
      completed: false,
    },
    {
      id: 'p_5',
      name: 'Tricep Cable Rope Pushdowns',
      sets: '3 sets × 10–12 reps',
      target: 'Triceps Lateral & Medial Head',
      formCue: 'Pin elbows to your ribs. Push straight down and flare the rope ends outward at peak contraction.',
      illustrationType: 'tricep_rope',
      muscleGroup: 'Triceps Brachii',
      completed: false,
    },
    {
      id: 'p_6',
      name: 'Overhead Cable Tricep Extension',
      sets: '3 sets × 12 reps',
      target: 'Triceps Long Head (Peak Stretch)',
      formCue: 'Hinge forward with staggered stance. Extend elbows fully overhead while keeping upper arms steady.',
      illustrationType: 'tricep_rope',
      muscleGroup: 'Triceps Long Head',
      completed: false,
    },
  ],
  pull: [
    {
      id: 'pl_1',
      name: 'Lat Pulldown (Wide Grip)',
      sets: '4 sets × 8–10 reps',
      target: 'Latissimus Dorsi (V-Taper)',
      formCue: 'Slight lean back. Pull bar towards upper collarbone, driving elbows down and back into your hips.',
      illustrationType: 'lat_pulldown',
      muscleGroup: 'Latissimus Dorsi & Teres Major',
      completed: false,
    },
    {
      id: 'pl_2',
      name: 'Barbell Bent-Over Rows',
      sets: '3 sets × 8–10 reps',
      target: 'Upper Back, Rhomboids & Lats',
      formCue: 'Hinge at 45° with neutral spine. Pull bar to lower belly button, squeeze shoulder blades together at top.',
      illustrationType: 'barbell_row',
      muscleGroup: 'Rhomboids, Trapezius & Lats',
      completed: false,
    },
    {
      id: 'pl_3',
      name: 'Chest-Supported Row',
      sets: '3 sets × 10–12 reps',
      target: 'Mid Back Thickness & Rear Delts',
      formCue: 'Chest firm against pad. Pull handles back without rocking torso, hold squeeze for 1 second.',
      illustrationType: 'tbar_row',
      muscleGroup: 'Middle Trapezius & Lats',
      completed: false,
    },
    {
      id: 'pl_4',
      name: 'Cable Face Pulls',
      sets: '4 sets × 15 reps',
      target: 'Rear Delts & Rotator Cuff',
      formCue: 'Set pulley to eye level. Pull rope directly towards forehead, rotating hands outward and back.',
      illustrationType: 'face_pull',
      muscleGroup: 'Posterior Deltoid & Infraspinatus',
      completed: false,
    },
    {
      id: 'pl_5',
      name: 'Incline Dumbbell Bicep Curls',
      sets: '3 sets × 10–12 reps',
      target: 'Biceps Long Head (Peak)',
      formCue: 'Bench set to 45°. Let arms hang completely for full stretch. Supinate wrists as you curl.',
      illustrationType: 'bicep_curl',
      muscleGroup: 'Biceps Brachii Long Head',
      completed: false,
    },
    {
      id: 'pl_6',
      name: 'Standing Dumbbell Hammer Curls',
      sets: '3 sets × 12 reps',
      target: 'Brachialis & Forearm Thickness',
      formCue: 'Palms facing each other throughout. Lock elbows, avoid momentum, squeeze forearm and arm.',
      illustrationType: 'bicep_curl',
      muscleGroup: 'Brachialis & Brachioradialis',
      completed: false,
    },
  ],
  leg: [
    {
      id: 'l_1',
      name: 'Barbell Back Squats',
      sets: '4 sets × 6–8 reps',
      target: 'Quadriceps, Glutes & Core',
      formCue: 'Bar on upper traps. Deep abdominal brace, break at knees and hips together, squat to parallel or below.',
      illustrationType: 'squat',
      muscleGroup: 'Quadriceps Femoris & Gluteus Maximus',
      completed: false,
    },
    {
      id: 'l_2',
      name: 'Romanian Deadlifts (RDL)',
      sets: '3 sets × 8–10 reps',
      target: 'Hamstrings & Glute-Ham Tie-in',
      formCue: 'Soft knee bend. Push hips back as if touching a wall behind you. Feel deep stretch in hamstrings.',
      illustrationType: 'rdl',
      muscleGroup: 'Biceps Femoris & Semitendinosus',
      completed: false,
    },
    {
      id: 'l_3',
      name: 'Leg Press (Moderate Stance)',
      sets: '3 sets × 10–12 reps',
      target: 'Quadriceps Sweep',
      formCue: 'Feet hip-width on sled. Lower sled smoothly without tailbone lifting off pad. Press through mid-foot.',
      illustrationType: 'leg_press',
      muscleGroup: 'Vastus Lateralis & Rectus Femoris',
      completed: false,
    },
    {
      id: 'l_4',
      name: 'Lying Hamstring Curls',
      sets: '3 sets × 12 reps',
      target: 'Hamstrings Isolation',
      formCue: 'Keep hips pressed into pad. Curl heel towards glutes, control the negative for 3 full seconds.',
      illustrationType: 'leg_curl',
      muscleGroup: 'Hamstrings Complex',
      completed: false,
    },
    {
      id: 'l_5',
      name: 'Quad Leg Extensions',
      sets: '3 sets × 12–15 reps',
      target: 'Vastus Medialis (Teardrop)',
      formCue: 'Back tight against seat. Extend legs with toes pointed straight, squeeze quads hard at the top.',
      illustrationType: 'leg_curl',
      muscleGroup: 'Vastus Medialis',
      completed: false,
    },
    {
      id: 'l_6',
      name: 'Standing Calf Raises',
      sets: '4 sets × 15 reps',
      target: 'Gastrocnemius & Achilles',
      formCue: 'Balls of feet on step. Lower heels below step for deep stretch, rise onto big toes and pause 1s.',
      illustrationType: 'calf_raise',
      muscleGroup: 'Gastrocnemius & Soleus',
      completed: false,
    },
  ],
  rest: [
    {
      id: 'r_1',
      name: 'Full Body Mobility Flow',
      sets: '15 mins',
      target: 'Joints & Spinal Decompression',
      formCue: 'Gentle cat-cow, thoracic rotations, deep hip flexor stretches, and hanging from pull-up bar.',
      illustrationType: 'mobility',
      muscleGroup: 'Fascia & Spinal Erectors',
      completed: false,
    },
    {
      id: 'r_2',
      name: 'Adequate Hydration & Clean Nutrition',
      sets: 'All day',
      target: 'Tissue Repair & Glycogen Replenishment',
      formCue: '3+ liters of water with electrolytes, high protein intake, zero processed junk.',
      illustrationType: 'mobility',
      muscleGroup: 'Full Body Systemic',
      completed: false,
    },
    {
      id: 'r_3',
      name: 'Gentle Walk & Fresh Air',
      sets: '20–30 mins',
      target: 'Active Recovery & Lymphatic Drainage',
      formCue: 'Brisk nasal breathing walk outdoors. Promotes recovery without taxing central nervous system.',
      illustrationType: 'mobility',
      muscleGroup: 'Cardiovascular & Parasympathetic',
      completed: false,
    },
    {
      id: 'r_4',
      name: 'Deep Sleep & CNS Recovery',
      sets: '8 hours',
      target: 'Growth Hormone & Muscle Rebuilding',
      formCue: 'Dark room, cool temperature, phone away 30 mins before sleep. Growth occurs in rest.',
      illustrationType: 'mobility',
      muscleGroup: 'Central Nervous System',
      completed: false,
    },
  ],
};

export const THEMES: ThemeConfig[] = [
  {
    id: 'ash',
    name: 'Ash',
    gradient: 'radial-gradient(circle at 50% 20%, #202228 0%, #17181C 75%, #101114 100%)',
    previewBg: 'bg-zinc-800',
  },
  {
    id: 'sand',
    name: 'Sand',
    gradient: 'radial-gradient(circle at 50% 10%, #30261E 0%, #1E1A17 55%, #141312 100%)',
    previewBg: 'bg-amber-950',
  },
  {
    id: 'sage',
    name: 'Sage',
    gradient: 'radial-gradient(circle at 50% 15%, #1C2B22 0%, #16201B 60%, #111714 100%)',
    previewBg: 'bg-emerald-950',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    gradient: 'radial-gradient(circle at 40% 15%, #133230 0%, #132427 50%, #0F171A 100%)',
    previewBg: 'bg-teal-950',
  },
  {
    id: 'smoke',
    name: 'Smoke',
    gradient: 'radial-gradient(circle at 50% 30%, #282B33 0%, #1C1E24 60%, #141519 100%)',
    previewBg: 'bg-slate-800',
  },
  {
    id: 'tide',
    name: 'Tide',
    gradient: 'radial-gradient(circle at 50% 20%, #16263B 0%, #121B2A 60%, #0D131D 100%)',
    previewBg: 'bg-blue-950',
  },
  {
    id: 'bloom',
    name: 'Bloom',
    gradient: 'radial-gradient(circle at 50% 15%, #301B2E 0%, #221521 60%, #171017 100%)',
    previewBg: 'bg-purple-950',
  },
  {
    id: 'ember',
    name: 'Ember',
    gradient: 'radial-gradient(circle at 50% 15%, #351C17 0%, #231512 60%, #160F0D 100%)',
    previewBg: 'bg-orange-950',
  },
  {
    id: 'grove',
    name: 'Grove',
    gradient: 'radial-gradient(circle at 50% 20%, #142E1F 0%, #112117 60%, #0C1710 100%)',
    previewBg: 'bg-green-950',
  },
  {
    id: 'dusk',
    name: 'Dusk',
    gradient: 'radial-gradient(ellipse at 50% 35%, #1E2D33 0%, #182329 45%, #131A1E 75%, #0F1417 100%)',
    previewBg: 'bg-cyan-950',
  },
];

export const ACCENTS: Record<AccentId, AccentConfig> = {
  green: {
    id: 'green',
    name: 'Green',
    hex: '#22C55E',
    rgb: '34, 197, 94',
    borderClass: 'border-green-500',
    bgClass: 'bg-green-500',
    textClass: 'text-green-400',
    glowStyle: '0 0 16px rgba(34, 197, 94, 0.35)',
  },
  blue: {
    id: 'blue',
    name: 'Blue',
    hex: '#3B82F6',
    rgb: '59, 130, 246',
    borderClass: 'border-blue-500',
    bgClass: 'bg-blue-500',
    textClass: 'text-blue-400',
    glowStyle: '0 0 16px rgba(59, 130, 246, 0.35)',
  },
  purple: {
    id: 'purple',
    name: 'Purple',
    hex: '#A855F7',
    rgb: '168, 85, 247',
    borderClass: 'border-purple-500',
    bgClass: 'bg-purple-500',
    textClass: 'text-purple-400',
    glowStyle: '0 0 16px rgba(168, 85, 247, 0.35)',
  },
  pink: {
    id: 'pink',
    name: 'Pink',
    hex: '#EC4899',
    rgb: '236, 72, 153',
    borderClass: 'border-pink-500',
    bgClass: 'bg-pink-500',
    textClass: 'text-pink-400',
    glowStyle: '0 0 16px rgba(236, 72, 153, 0.35)',
  },
  orange: {
    id: 'orange',
    name: 'Orange',
    hex: '#F97316',
    rgb: '249, 115, 22',
    borderClass: 'border-orange-500',
    bgClass: 'bg-orange-500',
    textClass: 'text-orange-400',
    glowStyle: '0 0 16px rgba(249, 115, 22, 0.35)',
  },
  grey: {
    id: 'grey',
    name: 'Grey',
    hex: '#9CA3AF',
    rgb: '156, 163, 175',
    borderClass: 'border-neutral-400',
    bgClass: 'bg-neutral-400',
    textClass: 'text-neutral-300',
    glowStyle: '0 0 16px rgba(156, 163, 175, 0.35)',
  },
};

export const STREAK_MILESTONES = [7, 30, 60, 90, 180];

export const REST_DAY_MESSAGES = [
  "Take it easy today. Don't doomscroll all day.",
  "Don't forget Allah. Real rest begins when the heart is still.",
  'Try resting without your phone.',
  'Rest with purpose. Tomorrow you return to the climb.',
];

export const BUSY_DAY_ANCHOR = {
  title: 'Keep going.',
  subtitle: "You're doing what you can.",
  loveCardTitle: 'You got this.',
  loveCardSubtitle: 'Progress, not perfection.',
};

// Serene sound synthesizer for reminders and alarms
export function playSereneChime() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Serene bell harmonic
    osc.frequency.setValueAtTime(528, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(396, ctx.currentTime + 1.2);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.4);
  } catch {
    // Audio context not allowed or device muted
  }
}

// Clear ringing bell alarm when focus session completes
export function playFocusRingAlarm() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Distinct triple-bell sequence
    const tones = [587.33, 880, 1174.66];
    tones.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.3;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.4, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.5);
    });

    // Trigger device vibration if available
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 400]);
    }
  } catch {
    // Audio context unavailable
  }
}
