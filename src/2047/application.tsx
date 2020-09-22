"use strict";

import {
    TypographyStyle,
    createMuiTheme,
} from "@material-ui/core";
import {
    StylesProvider,
    ThemeProvider,
    createGenerateClassName,
} from "@material-ui/styles";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { merge } from "lodash";
import React from "react";

import { EXPIRY_TIME } from "./constants";
import { Countdown } from "./countdown";

import { AnonymousPro } from "./fonts/anonymous-pro";
import { MontserratRegular } from "./fonts/montserrat";
import { SegoeUISymbol } from "./fonts/segoe-ui-symbol";

const theme = createMuiTheme(
    {
        palette: {
            type: "dark",
            primary: {
                main: "#63B3ED",
            },
            text: {
                primary: "#F7FAFC",
                secondary: "#E2E8F0",
            },
            background: {
                default: "#1A202C",
            },
        },
        typography: {
            fontFamily: `"Montserrat", sans-serif`,
            fontSize: 16,
            htmlFontSize: 10,
            h1: {
                fontSize: 35,
            },
            h2: {
                fontSize: 20,
            },
            body1: {
                fontSize: 16,
            },
        },
        breakpoints: {
            keys: [
                "xs",
                "sm",
                "md",
                "lg",
            ],
            values: {
                xs: 0,
                sm: 640,
                md: 768,
                lg: 1024,
                xl: 1920,
            },
        },
        overrides: {
            MuiCssBaseline: {
                "@global": {
                    "@font-face": [
                        AnonymousPro,
                        MontserratRegular,
                        SegoeUISymbol,
                    ],
                    "html": {
                        fontSize: 10,
                    },
                    "html, body": {
                        height: "100%",
                    },
                },
            },
        },
    });

merge<TypographyStyle, TypographyStyle>(
    theme.typography.h1,
    {
        [theme.breakpoints.up("sm")]: {
            fontSize: 40,
        },
        [theme.breakpoints.up("md")]: {
            fontSize: 50,
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: 60,
        },
    });

merge<TypographyStyle, TypographyStyle>(
    theme.typography.h2,
    {
        [theme.breakpoints.up("sm")]: {
            fontSize: 25,
        },
        [theme.breakpoints.up("md")]: {
            fontSize: 30,
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: 35,
        },
    });

const generateClassName = createGenerateClassName(
    {
        productionPrefix: "Countdown2047-",
        disableGlobal: false,
    });

export function Application(props: IApplicationProps): JSX.Element
{
    return (
        <ThemeProvider theme={ theme }>
            <StylesProvider generateClassName={ generateClassName }>
                <Countdown expiry={ EXPIRY_TIME } />
            </StylesProvider>
        </ThemeProvider>
    );
}

export interface IApplicationProps {}
