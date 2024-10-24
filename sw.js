const CACHE_NAME = 'collepedia-cache-v1';
const urlsToCache = [
  'https://colle-pedia.blogspot.com/',
  'https://colle-pedia.blogspot.com/index.html',
  'https://abdulrahman-muhammad.github.io/CPWA/manifest.json',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5oOML-pX3pyZ-eXNoFxyBVfTS-dwn2AJ3hP7-NPoeIN-FEwz-RwNNpfOsRoIEfV8t8Rc_oJPMum6oj2fBZpE7hdCwOyXzvmdim_-XX0fojpfiY3ZgPc8-Sp3eG2h4mYTmQHMm-2PDen___p_o34OHGRzcnboizxcZy91PwHRpNMgWYQ0/s220/1000011218.png'
];

// تثبيت الـ Service Worker وتخزين الملفات المحددة
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// جلب البيانات من الكاش أولاً ثم الشبكة إذا لم تكن مخزنة
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // استجابة من الكاش
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// تحديث الـ Cache عند وجود إصدار جديد من الملفات
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
