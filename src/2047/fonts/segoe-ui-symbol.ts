"use strict";

import { FontFace } from "csstype";

import SegoeUISymbolTTF from "../theme/fonts/SegoeUISymbol.ttf";
import SegoeUISymbolWOFF2 from "../theme/fonts/SegoeUISymbol.woff2";

export const SegoeUISymbol: FontFace = {
    fontFamily: "Segoe UI Symbol",
    fontStyle: "normal",
    fontWeight: "normal",
    src: `
        local("Segoe UI Symbol"),
        local("SegoeUISymbol"),
        url(${ JSON.stringify(SegoeUISymbolWOFF2) }) format("woff2"),
        url(${ JSON.stringify(SegoeUISymbolTTF) }) format("truetype")
    `,
    fontDisplay: "swap",
};
