/**
 *  @fileOverview configuration and initialisation of the service worker (sw). Register of the sw is done by app.js.
 *  A service worker is a type of web worker.
 *  It's essentially a JavaScript file that runs separately from the main browser thread, intercepting network requests, caching or retrieving resources from the cache, and delivering push messages.
 *
 *  @author       Benjamin Pohl
 */

/**
 * onfiguration and initialisation of the service worker (sw)
 * @namespace serviceWorker
 */
/**
 * Providing a cache name allows to version files, or separate data from the app shell.
 * @memberOf serviceWorker
 * @type {string}
 */
var cacheName = 'university-coupon-matching-v3';
/**
 * Array of all files that will be cached
 * @memberOf serviceWorker
 * @type {array}
 */
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
    "./scripts/vue.min.js",
    "./scripts/jquery-3.3.1.min.js",
    "./scripts/materialize.min.js",
    "./styles/materialize.min.css",
    "./styles/style.css",
    "./manifest.json"
];

/**
 * open the cache with caches.open() and provide a cache name.
 * call cache.addAll(), which takes an array and adds every item to the cache.
 * caution: cache.addAll() is atomic!
 * @memberOf serviceWorker
 * @method install
 */
self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
});

/**
 * caches.match() evaluates the web request that triggered the fetch event, and checks to see if it's available in the cache.
 * It then either responds with the cached version, or uses fetch to get a copy from the network.
 * Here it checks if network can be reached and if not, serves either a custom offline page, or the last cache available.
 * The response is passed back to the web page with event.respondWith().
 * @memberOf serviceWorker
 * @method fetch
 */
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

/**
 * To ensures that service worker updates its cache whenever any of the app shell files change.
 * In order for this to work, you'd need to increment the cacheName variable at the top of your service worker file.
 * @memberOf serviceWorker
 * @method activate
 */
self.addEventListener('activate', function(event) {
    console.log('Active...');
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});