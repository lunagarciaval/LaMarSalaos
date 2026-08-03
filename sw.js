/* ═══════════════════════════════════════════════════════════════
   Service Worker — La Mar de Salaos (V10, Fase 1)
   Objetivo de esta fase: que la app cargue al instante y sea
   instalable. La sincronización de datos offline llega en Fase 3;
   esto SOLO cachea el "cascarón" de la app (HTML/CSS/JS/iconos).
   Los datos siguen viviendo en localStorage, como en la V9.
   ═══════════════════════════════════════════════════════════════ */
const CACHE_NAME = 'lamardesalaos-shell-v10.1';
const APP_SHELL = [
  './LaMarDeSalaos_v10.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Estrategia: "network-first, cache-fallback" para el HTML principal
// (así, si tocamos código y publicamos, la próxima vez que haya
// conexión se coge la versión nueva; si no hay conexión, sirve la
// última que se guardó). Para el resto (iconos, manifest, fuentes,
// Chart.js), "cache-first" porque casi nunca cambian.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // CRÍTICO: nunca interceptar peticiones a otros dominios (Microsoft
  // Graph/OneDrive, login de Microsoft, Chart.js, fuentes...). Si no,
  // el Service Worker cachea para siempre la respuesta de OneDrive y
  // el dispositivo deja de ver datos nuevos aunque haya conexión.
  // Solo cacheamos el "cascarón" de nuestra propia app (mismo origen).
  if (new URL(req.url).origin !== self.location.origin) return;

  const isAppShellDoc = req.mode === 'navigate' || req.url.includes('LaMarDeSalaos_v10.html');

  if (isAppShellDoc) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./LaMarDeSalaos_v10.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          // Solo cacheamos respuestas válidas (evita guardar errores)
          if (res && (res.ok || res.type === 'opaque')) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
