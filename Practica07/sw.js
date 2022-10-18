const INIT_MSG = "SW:";
const INIT_URL = "/";

const STATI_CACHE_NAME = "static-cache-v1.1";
const INMUTABLE_CACHE_NAME = "inmutable-cache-v1.1";
const DYNAMIC_CACHE_NAME = "dynamic-cache-v1.1";

const REQUEST_DATA = [""];

function cleanCache(cacheName, numberItems) {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > numberItems) {
        cache.delete(keys[0]).then(() => {
          cleanCache(cacheName, numberItems);
        });
      }
    });
  });
}

self.addEventListener("install", (event) => {
  console.log(INIT_MSG, "install");
  const promiseCache = caches.open(STATI_CACHE_NAME).then((cache) => {
    return cache.addAll([
      `${INIT_URL}`,
      `${INIT_URL}index.html`,
      `${INIT_URL}css/style.css`,
    ]);
  });

  const promiseCacheInmutable = caches
    .open(INMUTABLE_CACHE_NAME)
    .then((cache) => {
      return cache.addAll([
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js",
        "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css",
        "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/fonts/bootstrap-icons.woff2?8d200481aa7f02a2d63a331fc782cfaf",
        "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/fonts/bootstrap-icons.woff?8d200481aa7f02a2d63a331fc782cfaf",
      ]);
    });

  event.waitUntil(Promise.all([promiseCache, promiseCacheInmutable]));
});

self.addEventListener("fetch", (event) => {
  for (const data of REQUEST_DATA) {
    let resp;
    if (event.request.url.includes(data)) {
      resp = fetch(event.request)
        .then((respWeb) => {
          if (!respWeb) {
            return caches.match(event.request);
          }
          caches.open(DYNAMIC_CACHE_NAME).then((chacheDynamic) => {
            chacheDynamic.put(event.request, respWeb);
            cleanCache(DYNAMIC_CACHE_NAME, 20);
          });
          return respWeb.clone();
        })
        .catch(() => {
          return caches.match(event.request);
        });
    } else {
      resp = caches.match(event.request);
    }

    event.respondWith(resp);
  }
});
