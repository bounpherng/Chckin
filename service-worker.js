// Service Worker ສຳລັບ PWA ລະບົບເຊັກອິນ
const CACHE_NAME = 'checkin-pwa-v1';

// ຕິດຕັ້ງ Service Worker
self.addEventListener('install', (event) => {
  console.log('✅ Service Worker: ຕິດຕັ້ງສຳເລັດ');
  self.skipWaiting();
});

// ເປີດໃຊ້ງານ Service Worker
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker: ເປີດໃຊ້ງານແລ້ວ');
  event.waitUntil(self.clients.claim());
});

// ຈັດການຄຳຮ້ອງຂໍ (Fetch)
self.addEventListener('fetch', (event) => {
  // ປ່ອຍໃຫ້ທຸກຄຳຮ້ອງຂໍຜ່ານໄປເວບຈິງ
  event.respondWith(fetch(event.request));
});