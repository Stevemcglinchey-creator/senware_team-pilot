importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAFFgp4m6fCssJiswmIMA6RLJ0cskUrAVk",
  authDomain: "senwear-team-pilot.firebaseapp.com",
  projectId: "senwear-team-pilot",
  storageBucket: "senwear-team-pilot.firebasestorage.app",
  messagingSenderId: "2002144696",
  appId: "1:2002144696:web:31f81e3c5c1764a290934d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Background message received:', payload);
  
  const notificationTitle = payload.notification?.title || 'SENwear Alert';
  const notificationOptions = {
    body: payload.notification?.body || 'New alert from team',
    icon: '/Icon-192.png',
    badge: '/Icon-192.png'
  };
  
  return self.registration.showNotification(notificationTitle, notificationOptions);
});