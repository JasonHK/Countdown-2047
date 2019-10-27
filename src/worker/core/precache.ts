"use strict";

import { CACHE_NAME, PRECACHE_FILES } from "../constants";

export function precache(): Promise<void>
{
    return caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(PRECACHE_FILES);
        });
}
