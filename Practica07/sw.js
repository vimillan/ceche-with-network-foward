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
      `${INIT_URL}pages/offline.html`,
      `${INIT_URL}images/lapras-square.png`,
      `${INIT_URL}images/icons/android-launchericon-96-96.png`,
      `${INIT_URL}images/icons/android-launchericon-144-144.png`,
      `${INIT_URL}images/icons/android-launchericon-192-192.png`,
      `${INIT_URL}images/icons/android-launchericon-512-512.png`,
      `${INIT_URL}images/icons/android-launchericon-72-72.png`,
      `${INIT_URL}manifest.json`,
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

self.addEventListener("install", (event) => {
  console.log(INIT_MSG, "activated");
  const prom = caches.keys().then((cachesItems) => {
    cachesItems.forEach(element => {
      if (element !== STATI_CACHE_NAME && element.includes('static')) {
        return caches.delete(element)
      }
    })
  })

  event.waitUntil(prom);

});

self.addEventListener("fetch", (event) => {
  const resp = caches.match(event.request).then((respCache) => {
    if (respCache) {
      return respCache;
    }
    return fetch(event.request).then((respWeb) => {
      caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
        cache.put(event.request, respWeb);
        cleanCache(DYNAMIC_CACHE_NAME, 10);
      });
      return respWeb.clone();
    });
  }).catch((err) => {
    if (event.request.headers.get('accept').includes('text/html')) {
      return caches.match('pages/offline.html')
    }

    if (event.request.headers.get('accept').includes('image/')) {
      return caches.match('images/lapras-square.png')
    }
  })
  event.respondWith(resp);
});
