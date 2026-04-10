const CACHE_NAME = 'senwear-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Icon-192.png',
  '/Icon-512.png',
  '/Team_Pilot.mp4'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});


