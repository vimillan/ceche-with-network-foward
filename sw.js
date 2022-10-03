const INIT_MSG = "SW:";
const INIT_URL = "/";

console.log("SW: Hola Mundo Violeta!");

self.addEventListener("install", (event) => {
  console.log(INIT_MSG, "install");
  const promiseCache = caches.open('cache-v1.1').then((cache) => {
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