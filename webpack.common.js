const htmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const basePath = __dirname;

module.exports = {
    context: path.join(basePath, "src"),
    resolve: {
        extensions: [".js", ".jsx", ".tsx", "ts"]
    },
    optimization: {
        runtimeChunk: 'single'
    },
    // Cambiamos los puntos de entrada tratándolo en vez de como un array, como un objeto con su par: clave-valor
    // Defino un punto de entrada para la aplicación --> app
    // Defino un punto de entrada para el css --> appStyles
    entry: {
        app: "./index.tsx",
        appStyles: "./mystyles.scss"
    },
    // Definimos las Salidas que va a generar webpack.
    // Al hacer chunkhash genera un hash relacionado con el contenido del fichero, así tendremos un nombre único
    output: {
        filename: "[name].[chunkhash].js",
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.(tsx|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(png|jpg|gif)$/,
                type: "asset/resource",
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            }
        ],
    },
    plugins: [
        // Instanciamos el htmlWebPackPlugin
        new htmlWebPackPlugin({
            filename: 'index.html',
            template: './index.html',
            scriptLoading: 'blocking',
        })
    ],
};

