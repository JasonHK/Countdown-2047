"use strict";

import { CACHE_NAME } from "../constants";

import { LoggerBadge } from "../badges/logger-badge";

import { getErrorMessage } from "../utilities/get-error-message";
import { isSameScope } from "../utilities/is-same-scope";

export async function updateCache(request: Request, response?: Response): Promise<void>
{
    if (isSameScope(request.url))
    {
        response = response ? response : (await fetch(request));

        const cache: Cache = await caches.open(CACHE_NAME);
        return cache.put(request, response);
    }
}
