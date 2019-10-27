"use strict";

import { fromCache } from "./core/from-cache";
import { fromNetwork } from "./core/from-network";
import { precache } from "./core/precache";
import { updateCache } from "./core/update-cache";

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
