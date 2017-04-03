var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        main: "./src/app-loader.jsx",
        vendor: ["react", "react-dom", "lodash"]
    },
    output: {
        path: path.join( __dirname, "dist/js" ),
        filename: "[name].js",
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [path.resolve('./node_modules')],
                noParse: ["./node_modules/react/dist/react.min.js"],
                query: {
                    presets: ["latest", "stage-0", "react"]
                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    resolve: {
        root: __dirname + "/src",
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.js")
    ]
};