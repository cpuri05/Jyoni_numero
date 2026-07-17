const CACHE_NAME = 'numerology-v5';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './numerology_core.js',
  './storage.js',
  './manifest.json',
  './js/translations.js',
  './js/ui.js',
  './js/tabs.js',
  './js/sw-register.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Force activation
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Delete old caches
          }
        })
      );
    })
  );
  return self.clients.claim(); // Take control immediately
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});