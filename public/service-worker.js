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
    "./images/icons/icon-128x128.png",
    "./images/icons/icon-144x144.png",
    "./images/icons/icon-152x152.png",
    "./images/icons/icon-192x192.png",
    "./images/icons/icon-256x256.png",
    "./images/ic_refresh_white_24px.svg",
    "./scripts/app.js",
    "./scripts/vue.js",
    "./scripts/jquery-3.3.1.js",
    "./scripts/materialize.js",
    "./styles/materialize.css",
    "./styles/style.css",
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

self.addEventListener('activate', event => {
    console.log('Activating new service worker...');

    const cacheWhitelist = [cacheName];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});