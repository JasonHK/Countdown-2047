"use strict";

const Path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
//const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
//const WebpackPWAManifest = require("webpack-pwa-manifest");

module.exports = (env, argv) => {
    const isProduction = (argv.mode === "production");

    const config = {
        entry: {
            "2047": [
                Path.resolve(__dirname, "src/2047/index.ts"),
                Path.resolve(__dirname, "src/2047/theme/theme.ts"),
            ],
            "worker": Path.resolve(__dirname, "src/worker/index.ts"),
        },
        output: {
            path: Path.resolve(__dirname, "dist"),
            filename: "[name].js",
        },
        module: {
            rules: [{
                test:    /.tsx?$/,
                exclude: /node_modules/,
                loader:  "ts-loader"
            }, {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "resolve-url-loader",
                    "sass-loader",
                ]
            }, {
                test: /\.(eot|svg|ttf|woff2?)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/"
                    }
                }]
            }]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: "src/index.html", to: "index.html" },
                { from: "assets/manifest.json", to: "." },
                { from: "assets/icons/favicon.ico", to: "." },
                { from: "assets/icons/", to: "icons", ignore: ["*.svg", "favicon.ico"] },
                //{ from: "res/social", to: "social" },
            ]),
            //new HTMLWebpackPlugin({
            //    template:      "!!handlebars-loader!src/index.hbs",
            //    excludeChunks: ["theme"],
            //    inject:        false,
            //    title:         "What's my Minecraft UUID?"
            //}),
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
            //new WebpackPWAManifest({
            //    filename:         "manifest.json",
            //    fingerprints:     false,
            //    inject:           false,
            //    name:             "What's my Minecraft UUID?",
            //    short_name:       "Minecraft UUID",
            //    description:      "Check the UUID of your Minecraft username with a click of a button!",
            //    display:          "standalone",
            //    theme_color:      "#16222A",
            //    background_color: "#16222A",
            //    orientation:      "any",
            //    icons: [{
            //        src:         Path.resolve("res/logo/favicon-16.png"),
            //        size:        16,
            //        destination: Path.join("icon"),
            //    }, {
            //        src:         Path.resolve("res/logo/favicon-32.png"),
            //        size:        32,
            //        destination: Path.join("icon"),
            //    }, {
            //        src:         Path.resolve("res/logo/logo-192.png"),
            //        size:        192,
            //        destination: Path.join("icon"),
            //    }, {
            //        src:         Path.resolve("res/logo/logo-512.png"),
            //        size:        512,
            //        destination: Path.join("icon"),
            //    }],
            //})
        ],
        watch: false,
        devtool: "",
        devServer: {
            contentBase: Path.resolve(__dirname, "dist"),
            //host: "0.0.0.0",
            inline: true,
            port: 2047,
        },
    };

    if (isProduction) {
        config.module.rules.push({ 
            enforce: "pre", 
            test:    /\.js$/, 
            loader:  "source-map-loader" 
        });

        config.plugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        }));

        config.devtool = "source-map";
    } else {
        config.module.rules.push({ 
            enforce: "pre", 
            test:    /\.js$/, 
            loader:  "source-map-loader" 
        });

        config.plugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        }));

        config.devtool = "source-map";
    }

    return config;
};
