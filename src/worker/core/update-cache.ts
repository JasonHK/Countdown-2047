"use strict";

import { CACHE_NAME } from "../constants";

import { LoggerBadge } from "../badges/logger-badge";

import { getErrorMessage } from "../utilities/get-error-message";

export function updateCache(request: Request)
{
    return caches.open(CACHE_NAME)
        .then((cache) => {
            return fetch(request)
                .then((response) => {
                    return cache.put(request, response)
                        .catch((error) => {
                            console.error(...LoggerBadge, getErrorMessage(error, "Failed to store the response."));
                        });
                })
        });
}
