
// This is a basic service worker file.

self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  // You can pre-cache app assets here
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
});

self.addEventListener('fetch', event => {
  // This is a simple pass-through fetch listener.
  // More complex logic can be added for caching strategies.
  event.respondWith(fetch(event.request));
});
