"use strict";

import * as WorkboxCore from "workbox-core";
import * as WorkboxPrecaching from "workbox-precaching";
import * as WorkboxRouting from "workbox-routing";
import * as WorkboxStrategies from "workbox-strategies";

WorkboxCore.setCacheNameDetails(
    {
        prefix: "Countdown2047",
        suffix: "2019.12.30",
        precache: "Precache",
        runtime: "Runtime",
    });

WorkboxPrecaching.precache(
    [
        "./",
        "./index.html",
        "./favicon.ico",
        "./manifest.json",
        "./2047.js",
        "./2047.css",
        "./icons/favicon-32.png",
        "./icons/icon-192.png",
        "./icons/icon-512.png",
    ]);

const strategy = new WorkboxStrategies.StaleWhileRevalidate();

WorkboxRouting.registerRoute("./", strategy);
WorkboxRouting.registerRoute("./index.html", strategy);
WorkboxRouting.registerRoute("./favicon.ico", strategy);
WorkboxRouting.registerRoute("./manifest.json", strategy);
WorkboxRouting.registerRoute(new RegExp("/[^/]*\\.js", "i"), strategy);
WorkboxRouting.registerRoute(new RegExp("/[^/]*\\.css", "i"), strategy);
WorkboxRouting.registerRoute(new RegExp("/icons/[^/]*\\.(png|svg)", "i"), strategy);
WorkboxRouting.registerRoute(new RegExp("/fonts/[^/]*\\.(ttf|woff2)", "i"), strategy);
