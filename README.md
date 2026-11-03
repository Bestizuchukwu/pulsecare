# PulseCare

A polished iPhone-inspired health tracking dashboard for monitoring key wellness metrics.

Included metrics:
- Blood pressure
- Heart rate
- Temperature
- Weight
- Walk time
- Sleeping time
- Running time

Each metric includes an overview page (stats, SVG trend chart, tips) and a history page.

Features:
- Log new readings per metric (validated), delete readings, export history as CSV
- Readings persist in `localStorage`; seeded sample data is shown until you log your own
- Dashboard cards, quick stats and hero summary reflect the latest readings
- Status-based alerts in a notifications panel, plus metric search

## Run locally

From the project root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Project structure

- `index.html` — dashboard
- `styles.css` — iPhone-themed styling
- `app.js` — metric config, storage, rendering and interactions
- `metrics/` — overview and history pages for each metric (rendered by `app.js` from `data-metric`/`data-view`)
