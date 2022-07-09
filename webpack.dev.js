const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const basePath = __dirname;
const Dotenv = require("dotenv-webpack");


module.exports = merge(common, {
    // Se establece la opción 'modo' en 'desarrollo' para habilitar los valores predeterminados para cada entorno.
    mode: 'development',
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
            {
                test: /\.(png|jpg|gif)$/,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new Dotenv({
            path: "./dev.env",
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

