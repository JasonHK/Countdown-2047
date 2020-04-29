"use strict";

import "webpack-dev-server";

// import BabelLoader from "babel-loader";
import CopyWebpackPlugin from "copy-webpack-plugin";
import FileLoader from "file-loader";
import TSCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import {
    isBoolean,
    isObject,
} from "lodash";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import NodeSass from "node-sass";
import Path from "path";
import Sass from "sass";
import SassLoader from "sass-loader";
import TerserWebpackPlugin from "terser-webpack-plugin";
import TSLoader from "ts-loader";
import Webpack, { DefinePlugin } from "webpack";
import WebpackBundleAnalyzer from "webpack-bundle-analyzer";

import BabelConfig from "./babel.config.json";

const DIRECTORY_ROOT: string = Path.resolve(__dirname, "../");

const DIRECTORY_CONFIGS: string = Path.resolve(DIRECTORY_ROOT, "./configs");
const DIRECTORY_DIST: string = Path.resolve(DIRECTORY_ROOT, "./dist");

const DIRECTORY_SRC: string = Path.resolve(DIRECTORY_ROOT, "./src");
const DIRECTORY_SRC_2047: string = Path.resolve(DIRECTORY_SRC, "./2047");
const DIRECTORY_SRC_WORKER: string = Path.resolve(DIRECTORY_SRC, "./worker");

function ConfigurationFactory(env: string | Record<string, string | number | boolean>): Webpack.Configuration
{
    if (!isObject(env)) { env = {}; }

    const isProduction: boolean = isBoolean(env.production) ? env.production : false;

    const enableWatch: boolean = isBoolean(env.watch) ? env.watch : false;
    const enableSourceMap: boolean = isBoolean(env.sourceMap) ? env.sourceMap : !isProduction;

    const enableBundleAnalyzer: boolean = isBoolean(env.analyze) ? env.analyze : !isProduction;
    const openBundleAnalyzerReport: boolean = isBoolean(env.openReport) ? env.openReport : false;

    const configuration: Webpack.Configuration = {
        mode: isProduction ? "production" : "development",
        entry: {
            "2047": [
                Path.resolve(DIRECTORY_SRC_2047 ,"./index.ts"),
                Path.resolve(DIRECTORY_SRC_2047 ,"./theme/theme.ts"),
            ],
            "worker": Path.resolve(DIRECTORY_SRC_WORKER, "./index.ts"),
        },
        output: {
            path: DIRECTORY_DIST,
            filename: "[name].js",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".ejs", ".mjs", ".js"],
        },
        module: {
            rules: [
                // {
                //     test: /\.tsx?$/i,
                //     include: [
                //         DIRECTORY_SRC_2047,
                //     ],
                //     exclude: /node_modules/,
                //     loader: "ts-loader",
                //     options: {
                //         instance: "2047",
                //         configFile: Path.resolve(DIRECTORY_SRC_2047, "./tsconfig.json"),
                //     } as TSLoader.Options,
                // },
                {
                    test: /\.tsx?$/i,
                    include: [
                        DIRECTORY_SRC_2047,
                    ],
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: {
                        extends: Path.resolve(DIRECTORY_CONFIGS, "./babel.config.json"),
                    },
                },
                {
                    test: /\.tsx?$/i,
                    include: [
                        DIRECTORY_SRC_WORKER,
                    ],
                    exclude: /node_modules/,
                    loader: "ts-loader",
                    options: {
                        instance: "worker",
                        configFile: Path.resolve(DIRECTORY_SRC_WORKER, "./tsconfig.json"),
                    } as TSLoader.Options,
                },
                {
                    test: /\.(c|sa|sc)ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "resolve-url-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: NodeSass,
                            } as SassLoader.Options,
                        },
                    ],
                },
                {
                    test: /\.(eot|svg|ttf|woff2?)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "fonts/"
                            } as FileLoader.Options,
                        },
                    ],
                }
            ],
        },
        plugins: [
            new TSCheckerWebpackPlugin(
                {
                    tsconfig: Path.resolve(DIRECTORY_SRC_2047, "./tsconfig.json"),
                    reportFiles: [
                        `${ DIRECTORY_SRC_2047 }/**/*.{ts,tsx}`,
                    ],
                }),
            new DefinePlugin(
                {
                    "process.env.NODE_ENV": JSON.stringify("production"),
                }),
            new CopyWebpackPlugin(
                [
                    { from: "src/index.html", to: "index.html" },
                    { from: "assets/manifest.json", to: "." },
                    { from: "assets/icons/favicon.ico", to: "." },
                    {
                        from: "assets/icons/",
                        to: "icons",
                        ignore: ["*.svg", "favicon.ico"],
                    },
                    { from: "assets/masks/safari.svg", to: "icons" },
                ]),
            new MiniCssExtractPlugin(
                {
                    filename: "[name].css",
                }),
        ],
        optimization: {
            minimizer: [
                new TerserWebpackPlugin(
                    {
                        test: /\.m?js$/i,
                    }),
            ],
        },
        watch: enableWatch,
        devServer: {
            //host: "0.0.0.0",
            port: 2047,
            contentBase: DIRECTORY_DIST,
            inline: true,
        },
    };

    if (enableBundleAnalyzer)
    {
        configuration.plugins!.push(
            new WebpackBundleAnalyzer.BundleAnalyzerPlugin(
                {
                    analyzerMode: "static",
                    openAnalyzer: openBundleAnalyzerReport,
                }));
    }

    if (enableSourceMap)
    {
        configuration.module!.rules.push(
            {
                enforce: "pre",
                test: /\.js$/i,
                loader: "source-map-loader",
            });

        configuration.devtool = "source-map";
    }

    return configuration;
}

export = ConfigurationFactory;
