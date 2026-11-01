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

Each metric includes two information pages: an overview page and a history page.

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
- `app.js` — small UI enhancements
- `metrics/` — overview and history pages for each health metric
