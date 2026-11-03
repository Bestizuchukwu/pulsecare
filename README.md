# PulseCare

A polished health tracking dashboard designed for modern wellness monitoring, maternal care, symptom tracking, and AI-guided daily wellbeing.

Included metrics and health tools:

- Blood pressure
- Heart rate
- Temperature
- Weight
- Walk time
- Sleeping time
- Running time
- Blood oxygen
- Fever monitoring
- Pregnancy care
- Hydration tracking
- Stress level
- AI coach
- Voice dictation
- Cycle tracking

Each metric includes overview and history pages.

## Run locally

From the project root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Project structure

- `index.html` — dashboard
- `styles.css` — responsive dashboard and metric-page styles
- `app.js` — dashboard interactions and metric overview/history rendering
- `metrics/detail.html` — shared metric detail and history view
- `schedule.html` — local calendar, meeting planner, reminders, and annual world observances
- `find-care.html` — specialty directory and local check-up planner
- `food-plan.html` — flexible daily meal timing, food ideas, and general benefits
- `metrics/` — existing metric URLs, supported alongside the shared view

Choose from four appearance themes—Classic, Midnight, Vibrant, and Ocean—using the Theme control. The selected theme is saved in this browser and shared across the dashboard, schedule, and metric pages.

Metric readings shown in this prototype are sample data and are not connected to a health device or medical service.

Schedule entries are saved in the current browser using local storage. Meeting times can be entered in any supported time zone and are also shown in your device's time zone. Browser notifications require permission, and reminders can only fire while the schedule page is open.

The schedule includes a built-in selection of recurring international days and cultural observances. These are informational dates, not a country-specific holiday feed; dates and public-holiday status can vary by location.

The care directory gives general descriptions of common specialties. Planned check-ups are handed to the local schedule for review and saving; they are not appointments booked with a healthcare provider.

The food plan is general wellness information with flexible example meal times, not an individualized diet or medical nutrition plan.
