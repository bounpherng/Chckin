// ອັບເດດ version ເປັນ v5 ເພື່ອໃຫ້ເຄື່ອງລູກຂ່າຍໂຫລດໄອຄອນໃໝ່
const CACHE_NAME = 'checkin-pwa-v5-fixed';

// ແກ້ໄຂຊື່ໄຟລ໌ໃຫ້ຖືກຕ້ອງ (ຕົວພິມນ້ອຍທັງໝົດ)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // ບັງຄັບໃຫ້ SW ໃໝ່ທຳງານທັນທີ
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('✅ Caching assets v5...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('🧹 Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // ຖ້າມີໃນ Cache ໃຫ້ໃຊ້ Cache, ຖ້າບໍ່ມີໃຫ້ໂຫລດຈາກ Network
      return response || fetch(event.request);
    })
  );
});