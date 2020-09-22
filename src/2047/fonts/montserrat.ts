"use strict";

import { FontFace } from "csstype";

import MontserratRegularTTF from "../theme/fonts/Montserrat-Regular.ttf";
import MontserratRegularWOFF2 from "../theme/fonts/Montserrat-Regular.woff2";

export const MontserratRegular: FontFace = {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    src: `
        local("Montserrat Regular"),
        local("Montserrat-Regular"),
        url(${ JSON.stringify(MontserratRegularWOFF2) }) format("woff2"),
        url(${ JSON.stringify(MontserratRegularTTF) }) format("truetype")
    `,
    fontDisplay: "swap",
};
