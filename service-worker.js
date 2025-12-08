// ປ່ຽນຊື່ Cache ເປັນ v4 ເພື່ອບັງຄັບໃຫ້ Browser ອັບເດດໄຟລ໌ໃໝ່ແນ່ນອນ
const CACHE_NAME = 'checkin-pwa-v4-fix-icons';

// ລະບຸຊື່ໄຟລ໌ໃຫ້ຖືກຕ້ອງ (ເອົາ ./ ອອກຈາກຊື່ໄຟລ໌ບາງອັນເພື່ອຄວາມຊົວຣ໌)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.Png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // ບັງຄັບໃຫ້ SW ໃໝ່ທຳງານທັນທີ
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('✅ Caching assets...');
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
      return response || fetch(event.request);
    })
  );
});