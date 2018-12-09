var CACHE = "countdown-2047";

self.addEventListener("install", function(evt) {
    console.log("The service worker is being installed.");
    evt.waitUntil(precache());
});

self.addEventListener("fetch", function(evt) {
    console.log("The service worker is serving the asset.");
    evt.respondWith(fromCache(evt.request));
    evt.waitUntil(update(evt.request));
});

function precache() {
    return caches.open(CACHE).then(function(cache) {
        return cache.addAll([
            "./",
            "index.html",
            "favicon.ico",
            "manifest.json",
            "msie.xml",
            "worker.js",
            "css/2047.css",
            "css/tocas.css",
            "js/index.js",
            "icons/16.png",
            "icons/32.png",
            "icons/192.png",
            "icons/256.png",
            "icons/mstile-l.png",
            "icons/mstile-m.png",
            "icons/mstile-s.png",
            "icons/mstile-w.png",
            "icons/safari-precomposed.png",
            "icons/safari.png",
            "icons/safari.svg"
        ]);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function(cache) {
        return cache.match(request).then(function(matching) {
            return matching || Promise.reject("no-match");
        });
    });
}

function update(request) {
    return caches.open(CACHE).then(function(cache) {
        return fetch(request).then(function(response) {
            return cache.put(request, response);
        });
    });
}
