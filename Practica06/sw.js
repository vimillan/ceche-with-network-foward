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
      `${INIT_URL}css/style.css`
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
  const resp = fetch(event.request).then((respWeb) => {
    if (!respWeb) {
      return caches.match(event.request);
    }

    caches.open(DYNAMIC_CACHE_NAME).then((chacheDynamic) => {
      chacheDynamic.put(event.request, respWeb)
      cleanCache(DYNAMIC_CACHE_NAME, 4);
    });

    return respWeb.clone()
  }).catch(() => {
    return caches.match(event.request);
  });
  event.respondWith(resp)
});