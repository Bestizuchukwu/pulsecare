const CACHE_NAME = 'pulsecare-v1';
const APP_BASE = new URL('./', self.registration.scope);
const APP_PREFIX = APP_BASE.pathname;
const APP_FILES = [
  'index.html',
  'schedule.html',
  'find-care.html',
  'food-plan.html',
  'styles.css',
  'app.js',
  'manifest.webmanifest',
  'icons/icon-180.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'metrics/detail.html',
  'metrics/blood-pressure.html',
  'metrics/blood-pressure-history.html',
  'metrics/heart-rate.html',
  'metrics/heart-rate-history.html',
  'metrics/running-time.html',
  'metrics/running-time-history.html',
  'metrics/sleeping-time.html',
  'metrics/sleeping-time-history.html',
  'metrics/temperature.html',
  'metrics/temperature-history.html',
  'metrics/walk-time.html',
  'metrics/walk-time-history.html',
  'metrics/weight.html',
  'metrics/weight-history.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES.map((file) => new URL(file, APP_BASE))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('pulsecare-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(APP_PREFIX)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(request, { ignoreSearch: true }))
          || (await caches.match(new URL('index.html', APP_BASE)))
          || Response.error())
    );
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cached) => cached || fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      }))
  );
});
