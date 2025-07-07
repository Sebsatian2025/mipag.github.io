const CACHE_NAME = 'mi-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/style.css', // Asegúrate de que esta ruta sea correcta para tu CSS principal
  '/assets/js/load-content.js', // Ruta del nuevo script
  // Añade aquí todas las rutas a tus archivos JS, CSS, imágenes principales, etc.
  // Asegúrate de que las rutas sean relativas a la raíz del proyecto
  '/assets/img/icons/icon-192x192.png',
  '/assets/img/icons/icon-512x512.png',
  // Puedes añadir más imágenes, fuentes, etc. que quieras cachear de tu carpeta assets
  // Por ejemplo, si tienes imágenes en assets/img/
  '/assets/img/bg-masthead.jpg',
  '/assets/img/bg-callout.jpg'
  // ... y cualquier otra imagen o recurso estático importante
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service Worker: Fallo al añadir URLs al caché:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Service Worker: Sirviendo desde caché:', event.request.url);
          return response;
        }
        console.log('Service Worker: Obteniendo de la red:', event.request.url);
        return fetch(event.request);
      })
      .catch(error => {
        console.error('Service Worker: Fallo en la solicitud fetch:', error);
        // Puedes devolver una página offline aquí si lo deseas
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Eliminando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
