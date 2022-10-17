if (navigator.serviceWorker) {
    console.log("El navegador soporta el Service Worker");
    navigator.serviceWorker.register("/sw.js");
}

if (window.caches) {
    console.log("El navegador soporta cachés");
    caches.open('cache-v1')
    caches.open('cache-v2')
    caches.open('cache-v3')

    caches.keys().then((keys) => {
        console.log(keys)
    })

    caches.match('cache-v4').then((resp) => {
        console.log(resp)
    })

    caches.open('cache-v1').then((cache) => {
        /*
        cache.add('/index.html')
        cache.add('/images/lapras.png')
        cache.add('/css/style.css')
        */

        cache.addAll([
            '/index.html',
            '/images/lapras.png',
            '/css/style.css',
            '/'
        ]).then((e) =>{
            cache.delete('/css/style.css')
        })

        cache.match('/index.html').then((resp) => {
            resp.text().then((text) =>{
                console.log('match', text)
            })
        })
        
    })


    caches.delete('cache-v3')
}