"use strict";

/// <reference lib="WebWorker" />

import { fetchResponse } from "./fetch-response";

import { LoggerBadge } from "./badges/logger-badge";

import { fromCache } from "./core/from-cache";
import { fromNetwork } from "./core/from-network";
import { precache } from "./core/precache";
import { updateCache } from "./core/update-cache";

import { getErrorMessage } from "./utilities/get-error-message";
import { isSameScope } from "./utilities/is-same-scope";

self.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(precache());
});

self.addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(fetchResponse(event.request));
});
