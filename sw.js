// ============================================
// PWA CACHING CODE - Makes app work offline
// ============================================
const CACHE_NAME = 'sendwear-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Icon-192.png',
  '/Icon-512.png',
  '/Team_Pilot.mp4'
];

// Install service worker and cache files
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching files...');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Cache error:', err))
  );
  self.skipWaiting();
});

// Activate and clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// ============================================
// FIREBASE NOTIFICATION CODE
// ============================================
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase with YOUR config
firebase.initializeApp({
  apiKey: "AIzaSyCBSUdvQvD0KR15Sq7fLF9CmZ2LqmSMFxm",
  authDomain: "senwear-team-pilot.firebaseapp.com",
  projectId: "senwear-team-pilot",
  storageBucket: "senwear-team-pilot.firebasestorage.app",
  messagingSenderId: "20021144696",
  appId: "1:20021144696:web:31f81e3c5c1764a290934d"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('Background message received:', payload);
  
  const notificationTitle = payload.notification?.title || 'SENDwear';
  const notificationOptions = {
    body: payload.notification?.body || 'New notification',
    icon: '/Icon-192.png',
    badge: '/Icon-192.png',
    vibrate: [200, 100, 200]
  };
  
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  console.log('Notification clicked');
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
