"use strict";

import { FontFace } from "csstype";

import AnonymousProTTF from "../theme/fonts/AnonymousPro.ttf";
import AnonymousProWOFF2 from "../theme/fonts/AnonymousPro.woff2";

export const AnonymousPro: FontFace = {
    fontFamily: "Anonymous Pro",
    fontStyle: "normal",
    fontWeight: "normal",
    src: `
        local("Anonymous Pro"),
        local("AnonymousPro"),
        url(${ JSON.stringify(AnonymousProWOFF2) }) format("woff2"),
        url(${ JSON.stringify(AnonymousProTTF) }) format("truetype")
    `,
    fontDisplay: "swap",
};
