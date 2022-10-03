const INIT_MSG = "SW:";

console.log("SW: Hola Mundo Violeta!");

self.addEventListener("install", (event) => {
  console.log(INIT_MSG, "install");
  const promiseCache = caches.open('cache-v1.1').then((cache) => {
    return cache.addAll([
      '/pwa-3/',
      '/pwa-3/index.html',
      '/pwa-3/js/app.js',
      '/pwa-3/images/lapras.png',
      '/pwa-3/css/style.css',
      '/pwa-3/pages/Dividir.html',
      '/pwa-3/pages/Sumar.html',
      '/pwa-3/pages/Restar.html',
      '/pwa-3/pages/Multiplicar.html'
    ])
  })

  const promiseCacheInmutable = caches.open('cache-v1.1').then((cache) => {
    return cache.addAll([
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js'
    ])
  })

  event.waitUntil(Promise.all([promiseCache, promiseCacheInmutable]));
});


self.addEventListener("fetch", (event) => {
  
  const respCache = caches.match(event.request)
  event.respondWith(respCache)
});