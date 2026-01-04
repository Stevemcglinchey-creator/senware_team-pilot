const cacheName = 'senware-pilot-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/Icon-192.png',
  '/Icon-512.png',
  '/Team_Pilot.mp4'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
