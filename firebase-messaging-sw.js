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

// ============ IndexedDB badge counter ============
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

// ============ Background push handler ============
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Background push received', payload);

  const title = payload.notification?.title || 'SENwear';
  const body = payload.notification?.body || 'New alert';

  self.registration.showNotification(title, {
    body: body,
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: 'senwear-' + Date.now()
  });

  // Increment the badge because the app is not active
  incrementBadge();
});
