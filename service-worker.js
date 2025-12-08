const CACHE_NAME = 'checkin-pwa-v2';
// ໄຟລ໌ທີ່ຈຳເປັນຕ້ອງ Cache ເພື່ອໃຫ້ PWA ເຮັດວຽກໄດ້ ແລະ ຕິດຕັ້ງໄດ້
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.jpg'
];

// 1. ຕິດຕັ້ງ ແລະ Cache ໄຟລ໌
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('✅ Caching assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. ເປີດໃຊ້ງານ ແລະ ລຶບ Cache ເກົ່າ
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. ໃຫ້ບໍລິການໄຟລ໌ຈາກ Cache ຖ້າມີ, ຖ້າບໍ່ມີໃຫ້ດຶງຈາກເນັດ
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
