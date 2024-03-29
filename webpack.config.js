var path = require("path"),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    Uglify = require("webpack/lib/optimize/UglifyJsPlugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/components/CheckoutApp.jsx"
    },
    resolve: {
        root: path.resolve(__dirname + "/src"),
        extensions: ["", ".js", ".jsx", ".json", ".scss"]
    },
    output: {
        path: __dirname + "/build",
        filename: "js/[name].js",
        hash: true
    },
    module: {
        loaders: [{
            test: /\.jsx$|\.js$/,
            exclude: /node_modules|server.js$/,
            loader: "babel-loader"
        }, {
            test: /\.scss$|\.css$/,
            exclude : /global\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules!sass")
        }, {
            test: /global\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader?sass")
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg|json)$/,
            loader: "url-loader?limit=100000"
        }]
    },
    watch : true,
    plugins:[
        new HtmlWebpackPlugin({ template: "./src/index.html"}),
        new ExtractTextPlugin("./styles/[name].css", { allChunks : true })
    ]
};
