const staticAccess = [
    './',
    './css/style.css',
    './js/app.js',
    './images/error-icon.png',
    './js/fallback.json'
];
self.addEventListener('install', async event => {
    const cache = await caches.open('news-static');
    cache.addAll(staticAccess);
});

self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }

});

async function cacheFirst(req) {
    const cachedReponse = await caches.match(req);
    return cachedReponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open('news-dynamic');
    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedReponse = await cache.match(req);
        return cachedReponse || await caches.match('./../js/fallback.json');
    }
}
