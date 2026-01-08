// sw.js — Senware Hard Pilot Service Worker

const CACHE_NAME = 'senware-pilot-v1';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Icon-192.png',
  '/Icon-512.png',
  '/Team_Pilot.mp4'
];

// Install: save files for offline use
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: clean old versions
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: serve cached files first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
