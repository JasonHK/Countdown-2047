"use strict";

import { CACHE_NAME, PRECACHE_FILES } from "../constants";

export async function precache(): Promise<void>
{
    const cache: Cache = await caches.open(CACHE_NAME);
    cache.addAll(PRECACHE_FILES);
}
