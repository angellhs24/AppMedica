const CACHE_NAME = 'appmedica-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  // Agrega aquí otras rutas a tus assets, como CSS, JS o imágenes
  'https://cdn.tailwindcss.com', // Importante para que el estilo funcione offline
  'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
];

// Evento de instalación: se dispara cuando el SW se registra
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

// Evento de activación: se dispara después de la instalación
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

// Evento fetch: intercepta todas las peticiones de red
self.addEventListener('fetch', event => {
  console.log('Service Worker: Petición fetch interceptada para:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si encontramos una respuesta en el cache, la devolvemos
        if (response) {
          return response;
        }
        // Si no, hacemos la petición a la red
        return fetch(event.request);
      })
  );
});
