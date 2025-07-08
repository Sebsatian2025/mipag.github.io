const CACHE_NAME = 'mi-pwa-cache-v2'; // Incrementamos la versión del caché para asegurar la actualización
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/bootstrap/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css',
  '/assets/css/styles.min.css',
  '/assets/js/script.min.js',
  '/assets/js/load-content.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://identity.netlify.com/v1/netlify-identity-widget.js',
  '/assets/img/icons/icon-192x192.png',
  '/assets/img/icons/icon-512x512.png',
  '/assets/img/bg-masthead.jpg',
  '/assets/img/bg-callout.jpg',
  '/assets/img/portfolio-1.jpg',
  '/assets/img/portfolio-2.jpg',
  '/assets/img/portfolio-3.jpg',
  '/assets/img/portfolio-4.jpg',
  '/content/home.json', // El archivo de contenido del CMS

  // --- Archivos específicos del panel de administración de Netlify CMS ---
  '/admin/', // La URL base del panel de administración
  '/admin/index.html', // El archivo HTML del panel de administración
  '/admin/config.yml', // El archivo de configuración del CMS
  'https://unpkg.com/netlify-cms@2.10.19/dist/netlify-cms.js', // La versión específica del script del CMS
  // Puedes añadir más recursos que el CMS cargue, si identificas que son necesarios para el offline.
  // Por ejemplo, si el CMS carga archivos CSS o JS adicionales desde su propio dominio o CDN.
  // Sin embargo, cachear solo el HTML, config y el script principal ya ayuda mucho.
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
        // return caches.match('/offline.html'); // Ejemplo: si tuvieras una página offline
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
