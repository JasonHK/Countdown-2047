"use strict";

import { CACHE_NAME } from "../constants";

import { NoCacheError } from "../errors/no-cache-error";

export async function fromCache(request: Request): Promise<Response>
{
    const response = await (await caches.open(CACHE_NAME)).match(request);
    if (response) { return response; } else { throw new NoCacheError(); }
}
