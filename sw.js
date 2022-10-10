const INIT_MSG = "SW:";
const INIT_URL = "/";

const STATI_CACHE_NAME = "static-cache-v1.1";
const INMUTABLE_CACHE_NAME = "inmutable-cache-v1.1";
const DYNAMIC_CACHE_NAME = "dynamic-cache-v1.1";


function cleanCache(cacheName, numberItems) {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > numberItems) {
        cache.delete(keys[0]).then(() => {
          cleanCache(cacheName, numberItems)
        })
      }
    })
  })
}

self.addEventListener("install", (event) => {
  console.log(INIT_MSG, "install");
  const promiseCache = caches.open(STATI_CACHE_NAME).then((cache) => {
    return cache.addAll([
      `${INIT_URL}`,
      `${INIT_URL}index.html`,
      `${INIT_URL}js/app.js`,
      `${INIT_URL}images/lapras.png`,
      `${INIT_URL}css/style.css`,
      `${INIT_URL}pages/Dividir.html`,
      `${INIT_URL}pages/Sumar.html`,
      `${INIT_URL}pages/Restar.html`,
      `${INIT_URL}pages/Multiplicar.html`
    ])
  })

  const promiseCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
    return cache.addAll([
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
    ])
  })

  event.waitUntil(Promise.all([promiseCache, promiseCacheInmutable]));
});


self.addEventListener("fetch", (event) => {
  const resp = caches.match(event.request)
    .then((respCache) => {
      // verificar si está 0 no en cache
      if (respCache) {
        return respCache
      }
      return fetch(event.request).then((respWeb) => {
        caches.open(DYNAMIC_CACHE_NAME).then((chacheDynamic) => {
          chacheDynamic.put(event.request, respWeb)
          cleanCache(DYNAMIC_CACHE_NAME, 4);
        });
        return respWeb.clone();
      });
    });
  event.respondWith(resp)
});