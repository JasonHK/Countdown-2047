"use strict";

import { CACHE_NAME } from "../constants";

import { NoCacheError } from "../errors/no-cache-error";

export function fromCache(request: Request): Promise<Response>
{
    return caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.match(request)
                .then((response) => {
                    return response || Promise.reject(new NoCacheError());
                });
        });
}
