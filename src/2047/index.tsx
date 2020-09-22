"use strict";

import SnackBar from "node-snackbar";
import React from "react";
import ReactDOM from "react-dom";
import * as WorkboxWindow from "workbox-window";

import { Application } from "./application";

const container = document.body;
ReactDOM.render(<Application />, container);

if (false/* Reflect.has(navigator, "serviceWorker") */)
{
    const workbox = new WorkboxWindow.Workbox(
        "./worker.js",
        {
            scope: "./",
        });

    workbox.addEventListener(
        "installed",
        (event) =>
        {
            if (event.isUpdate !== true)
            {
                SnackBar.show(
                    {
                        duration: 10000,
                        pos: "bottom-right",
                        text: "The application is ready for use offline.",
                        showAction: false,
                        actionTextColor: "#FC9402",
                    });
            }
        });

    workbox.register();
}
