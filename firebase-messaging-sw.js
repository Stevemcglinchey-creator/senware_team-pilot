importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDbruzYo2ln8XY9MqTqXVkSsKUodeEux1U",
  authDomain: "senwear-pilot-2.firebaseapp.com",
  projectId: "senwear-pilot-2",
  storageBucket: "senwear-pilot-2.firebasestorage.app",
  messagingSenderId: "926491466146",
  appId: "1:926491466146:web:1148a3e80ebeef3b15fafb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message:', payload);
  const title = payload.notification?.title || 'SENwear Alert';
  const options = {
    body: payload.notification?.body || '',
    icon: '/icon-192.png'
  };
  self.registration.showNotification(title, options);
});