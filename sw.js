importScripts("./News/node_modules/workbox-sw/build/importScripts/workbox-sw.dev.v2.1.2.js");
const staticAccess = [
    './',
    './css/style.css',
    './js/app.js',
    './images/error-icon.png',
    './js/fallback.json'
];

const wb = new WorkboxSW();
wb.precache(staticAccess);
wb.router.registerRoute('https://newsapi.org/(.*)', wb.strategies.networkFirst());
wb.router.registerRoute(/.*\.(png|jpg|jpeg|gif)/, wb.strategies.cacheFirst({
    cacheName: 'news-images',
    cacheExpiration: { maxEntries: 20, maxAgeSeconds: 12 * 60 * 60 },
    cacheableResponse: { statuses: [0, 200] }
}));
