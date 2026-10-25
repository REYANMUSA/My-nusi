# Nusi — Personal Daily Progress

Nusi is a personal daily planner for salah, Qur'an revision, focus sessions, school tasks, gym routines, and a manually confirmed no-contact streak.

## Run locally

Requirements: Node.js 22 or later.

1. Run `npm install`.
2. Run `npm run dev`.
3. Open the local URL printed by Vite.

## Build and type-check

- `npm run lint` runs TypeScript validation.
- `npm run build` validates TypeScript and creates the production site in `dist/`.

No Gemini API key is needed; the app does not call Gemini.

## Data and privacy

Progress is stored in this browser's local storage. It does not synchronize across devices. Clearing browser storage removes the locally saved progress. The repository is public, so do not commit private notes, credentials, or personal records.

Daily task, Qur'an page, and focus counters roll over locally. Weekly focus and gym checks use the local Monday-to-Sunday week. New installs start with honest zero progress rather than fabricated history.

## Notifications and offline mode

The service worker caches visited same-origin app resources for improved offline access. Browser reminders run only while the app is open and the browser allows timers/notifications; they are not reliable alarms after the browser has been closed or suspended. The Android widget screen is an in-app preview, not a native Android home-screen widget.

## Hosting

Vercel can build this project using `npm run build` and the `dist` output directory. GitHub Pages builds should set `GITHUB_PAGES=true` so Vite emits the `/My-nusi/` base path.
