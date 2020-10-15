import App from "next/app";
import Head from "next/head";
import React, { Fragment } from "react";

import { appWithTranslation } from "@/locales/I18Next";

import "suitcss-base/index.css";
import "@/theme/theme.scss";

class _App extends App
{
    public render(): JSX.Element
    {
        const { Component, pageProps } = this.props;

        return (
            <Fragment>
                <Head>
                    <title>Countdown 2047</title>
                    <meta name="description" content="Countdown from now to July 1st 2047, the day when hong kong totally vanished." />
                    <meta name="keywords" content="Countdown,2047,Hong Kong,China,50 Years" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="application-name" content="Countdown 2047" />
                    <meta name="apple-mobile-web-app-title" content="Countdown 2047" />
                    <meta name="theme-color" content="#1A202C" />
                    <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico" />
                    <link rel="icon" sizes="16x16" type="image/x-icon" href="./favicon.ico" />
                    <link rel="icon" sizes="16x16" type="image/png" href="./static/icons/favicon-16.png" />
                    <link rel="icon" sizes="32x32" type="image/png" href="./static/icons/favicon-32.png" />
                    <link rel="apple-touch-icon" sizes="192x192" type="image/png" href="./static/icons/icon-192.png" />
                    <link rel="mask-icon" type="image/svg" href="./static/icons/safari.svg" color="#1A202C" />
                </Head>
                <Component { ...pageProps } />
            </Fragment>
        );
    }
}

export default appWithTranslation(_App);
