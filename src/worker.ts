"use strict";

class NoCacheError extends Error {}

class TimeoutError extends Error {}

const CACHE = "countdown-2047";

self.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(precache());
});

self.addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(
        fromNetwork(event.request, 1000)
            .then((response) => {
                event.waitUntil(updateCache(event.request));
                return response;
            })
            .catch(() => {
                return fromCache(event.request);
            })
    );
});

function fromCache(request: Request): Promise<Response>
{
    return caches.open(CACHE)
        .then((cache) => {
            return cache.match(request)
                .then((response) => {
                    return response || Promise.reject(new NoCacheError());
                });
        });
}

function fromNetwork(request: Request, timeout: number): Promise<Response>
{
    return new Promise((resolve, reject) => {
        const fetchTimeout: number = self.setTimeout(() => { reject(new TimeoutError()) }, timeout);

        fetch(request)
            .then((response) => {
                clearTimeout(fetchTimeout);
                resolve(response);
            }, reject);
    });
}

function precache(): Promise<void>
{
    return caches.open(CACHE)
        .then((cache) => {
            return cache.addAll([
                "./",
                "./index.html",
                "./2047.css",
                "./2047.js",
                "./fonts/Anonymous-Pro.ttf",
                "./fonts/Anonymous-Pro.woff2",
                "./fonts/Montserrat-Regular.ttf",
                "./fonts/Montserrat-Regular.woff2",
            ]);
        });
}

function updateCache(request: Request)
{
    return caches.open(CACHE)
        .then((cache) => {
            return fetch(request)
                .then((response) => {
                    return cache.put(request, response);
                });
        });
}
