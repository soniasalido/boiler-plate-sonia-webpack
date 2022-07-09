const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const basePath = __dirname;

module.exports = merge(common, {
    // Se establece la opción 'modo' en 'desarrollo' para habilitar los valores predeterminados para cada entorno.
    mode: "production",
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    stats: "verbose",
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                // Usamos el plugin: mini-css-extract-plugin para tener un ficher externo de css.
                // Previamente hay que instalarlo con npm install
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [
        new Dotenv({
            path: "./prod.env",
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',
        })
    ],
    devServer: {
        compress: true,
        port: 9000,
        static:{
            directory: path.join(basePath, 'src'),
        },
        devMiddleware: {
            stats: 'errors-only',
        }
    },
    devtool: "eval-source-map",
});

