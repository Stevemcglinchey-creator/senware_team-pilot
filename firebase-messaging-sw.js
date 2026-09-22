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

function openBadgeDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('senwear', 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('badge')) {
        db.createObjectStore('badge', { keyPath: 'key' });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e);
  });
}

async function incrementBadge() {
  try {
    const db = await openBadgeDB();
    const tx = db.transaction('badge', 'readwrite');
    const store = tx.objectStore('badge');
    const getReq = store.get('count');
    getReq.onsuccess = () => {
      const current = (getReq.result && getReq.result.value) || 0;
      const newCount = current + 1;
      store.put({ key: 'count', value: newCount });
      if (self.navigator && self.navigator.setAppBadge) {
        self.navigator.setAppBadge(newCount).catch(() => {});
      }
    };
  } catch (e) {
    console.error('Badge update failed:', e);
  }
}

// FCM auto-displays the notification. We only increment the badge here.
messaging.onBackgroundMessage((payload) => {
  console.log('[SENwear SW] Background push received:', payload);
  incrementBadge();
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes('senware_team-pilot') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('https://stevemcglinchey-creator.github.io/senware_team-pilot/');
      }
    })
  );
});
