const htmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const basePath = __dirname;

module.exports = {
    // Se establece la opción 'modo' en 'desarrollo' para habilitar los valores predeterminados para cada entorno.
    mode: 'development',
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
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',
        })
    ],
    devServer: {
        compress: true,
        port: 9000,
        static:{
            directory: path.join(__dirname, 'src'),
        }
    },
};

