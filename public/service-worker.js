var cacheName = 'university-coupon-matching-v2';
var filesToCache = [
    "./index.html",
    "./fonts/roboto/Roboto-Bold.woff",
    "./fonts/roboto/Roboto-Bold.woff2",
    "./fonts/roboto/Roboto-Light.woff",
    "./fonts/roboto/Roboto-Light.woff2",
    "./fonts/roboto/Roboto-Medium.woff",
    "./fonts/roboto/Roboto-Medium.woff2",
    "./fonts/roboto/Roboto-Regular.woff",
    "./fonts/roboto/Roboto-Regular.woff2",
    "./fonts/roboto/Roboto-Thin.woff",
    "./fonts/roboto/Roboto-Thin.woff2",
    "./images/icons/Icon-36.png",
    "./images/icons/Icon-48.png",
    "./images/icons/Icon-72.png",
    "./images/icons/Icon-96.png",
    "./images/icons/Icon-144.png",
    "./images/icons/Icon-192.png",
    "./images/icons/Icon-512.png",
    "./images/ic_refresh_white_24px.svg",
    "./scripts/firebase-app.js",
    "./scripts/firebase-firestore.js",
    "./scripts/vue-firestore.js",
    "./scripts/app.js",
   /* "./scripts/vue.js",
    "./scripts/jquery-3.3.1.js",
    "./scripts/materialize.js",
    "./styles/materialize.css",
    "./styles/style.css",*/
    "./scripts/vue.min.js",
    "./scripts/jquery-3.3.1.min.js",
    "./scripts/materialize.min.js",
    "./styles/materialize.min.css",
    "./styles/style.css",
    "./styles/manifest.json",
];

self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request)
                    .then(response => {
                        // TODO - Respond with custom 404 page
                        return caches.open(cacheName).then(cache => {
                            cache.put(event.request.url, response.clone());
                            console.log("Network request error");
                            return response;
                        });
                    });
            }).catch(error => {
            // TODO - Respond with custom offline page
            console.log("offline error", error);
        })
    );
});


self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    // Return true if you want to remove this cache,
                    // but remember that caches are shared across
                    // the whole origin
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});