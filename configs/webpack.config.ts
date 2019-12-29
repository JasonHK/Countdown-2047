"use strict";

import "webpack-dev-server";

import CopyWebpackPlugin from "copy-webpack-plugin";
import FileLoader from "file-loader";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import Path from "path";
import TSLoader from "ts-loader";
import Webpack from "webpack";
import WebpackBundleAnalyzer from "webpack-bundle-analyzer";

const DIRECTORY_ROOT: string = Path.resolve(__dirname, "../");

const DIRECTORY_DISTRIBUTION: string = Path.resolve(DIRECTORY_ROOT, "./dist");

const DIRECTORY_SOURCE: string = Path.resolve(DIRECTORY_ROOT, "./src");
const DIRECTORY_SOURCE_2047: string = Path.resolve(DIRECTORY_SOURCE, "./2047");
const DIRECTORY_SOURCE_SHARED: string = Path.resolve(DIRECTORY_SOURCE, "./shared");
const DIRECTORY_SOURCE_WORKER: string = Path.resolve(DIRECTORY_SOURCE, "./worker");

function ConfigurationFactory(env: string | Record<string, string | number | boolean>, argv: Webpack.CliConfigOptions): Webpack.Configuration
{
    const isProduction: boolean = (argv.mode === "production");

    const enableWatch: boolean = false;
    const enableSourceMap: boolean = true;

    const enableBundleAnalyzer: boolean = true;
    const openBundleAnalyzerReport: boolean = null;

    const configuration: Webpack.Configuration = {
        entry: {
            "2047": [
                Path.resolve(DIRECTORY_SOURCE_2047 ,"./index.ts"),
                Path.resolve(DIRECTORY_SOURCE_2047 ,"./theme/theme.ts"),
            ],
            "worker": Path.resolve(DIRECTORY_SOURCE_WORKER, "./index.ts"),
        },
        output: {
            path: DIRECTORY_DISTRIBUTION,
            filename: "[name].js",
        },
        resolve: {
            extensions: [".js", ".ts", ".tsx"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/i,
                    include: [
                        DIRECTORY_SOURCE_2047,
                        DIRECTORY_SOURCE_SHARED,
                    ],
                    exclude: /node_modules/,
                    loader: "ts-loader",
                    options: {
                        instance: "2047",
                        configFile: Path.resolve(DIRECTORY_SOURCE_2047, "tsconfig.json"),
                    } as TSLoader.Options,
                },
                {
                    test: /\.tsx?$/i,
                    include: [
                        DIRECTORY_SOURCE_WORKER,
                        DIRECTORY_SOURCE_SHARED,
                    ],
                    exclude: /node_modules/,
                    loader: "ts-loader",
                    options: {
                        instance: "worker",
                        configFile: Path.resolve(DIRECTORY_SOURCE_WORKER, "tsconfig.json"),
                    } as TSLoader.Options,
                },
                {
                    test: /\.(c|sa|sc)ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "resolve-url-loader",
                        "sass-loader",
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
        watch: enableWatch,
        devServer: {
            //host: "0.0.0.0",
            port: 2047,
            contentBase: DIRECTORY_DISTRIBUTION,
            inline: true,
        },
    };

    if (enableBundleAnalyzer)
    {
        configuration.plugins.push(
            new WebpackBundleAnalyzer.BundleAnalyzerPlugin(
                {
                    analyzerMode: "static",
                    openAnalyzer: (typeof openBundleAnalyzerReport === "boolean") ? openBundleAnalyzerReport : isProduction,
                }));
    }

    if (enableSourceMap)
    {
        configuration.module.rules.push(
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
