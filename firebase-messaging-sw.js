importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// ========== PUT YOUR FIREBASE CONFIG HERE (same as index.html) ==========
const firebaseConfig = {
  apiKey: "AIzaSyDbruzYo2ln8XY9MqTqXVkSsKUodeEux1U",
  authDomain: "senwear-pilot-2.firebaseapp.com",
  projectId: "senwear-pilot-2",
  storageBucket: "senwear-pilot-2.firebasestorage.app",",
  messagingSenderId: "926491466146",
  appId: "1:926491466146:web:1148a3e80ebeef3b15fafb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'SENwear Alert';
  const options = {
    body: payload.notification?.body || 'New alert',
    icon: '/Icon-192.png'
  };
  return self.registration.showNotification(title, options);
});