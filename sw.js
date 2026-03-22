// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAFFgp4m6fCssJiswmIMA6RLJ0cskUrAVk",
  authDomain: "senwear-team-pilot.firebaseapp.com",
  projectId: "senwear-team-pilot",
  storageBucket: "senwear-team-pilot.firebasestorage.app",
  messagingSenderId: "2002144696",
  appId: "1:2002144696:web:31f81e3c5c1764a290934d"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages (when app is closed)
messaging.onBackgroundMessage((payload) => {
  console.log('📱 Background message received:', payload);
  
  const notificationTitle = payload.notification?.title || 'SENwear Alert';
  const notificationOptions = {
    body: payload.notification?.body || 'New alert from SENwear',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200]
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Optional: handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
