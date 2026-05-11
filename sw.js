const CACHE_NAME = 'appmedica-cache-v2'; // Incrementamos la versión del caché
const urlsToCache = [
  './',
  './index.html',
  './icon.svg', // <-- Añadimos nuestro nuevo ícono local
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
];

// Evento de instalación
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Abriendo cache y guardando archivos');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de activación: Limpia cachés antiguos
self.addEventListener('activate', event => {
  console.log('Service Worker: Activado');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Limpiando cache antiguo', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Evento fetch: Sirve desde el caché o la red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
