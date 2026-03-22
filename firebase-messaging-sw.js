// ============================================
// FIREBASE NOTIFICATIONS ONLY
// ============================================
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCBSUdvQvD0KR15Sq7fLF9CmZ2LqmSMFxm",
  authDomain: "senwear-team-pilot.firebaseapp.com",
  projectId: "senwear-team-pilot",
  storageBucket: "senwear-team-pilot.firebasestorage.app",
  messagingSenderId: "20021144696",
  appId: "1:20021144696:web:31f81e3c5c1764a290934d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Background message received:', payload);
  
  const notificationTitle = payload.notification?.title || 'SENDwear';
  const notificationOptions = {
    body: payload.notification?.body || 'New notification',
    icon: '/Icon-192.png',
    badge: '/Icon-192.png'
  };
  
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
