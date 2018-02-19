const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('postcss-cssnext');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'dist');
const SOURCE_PATH = path.resolve(__dirname, 'src');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${SOURCE_PATH}/index.html`,
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: [
        SOURCE_PATH + '/index.js'
    ],
    output: {
        path: DIST_PATH,
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })},
            //Add only image extensions
            { test: /\.(png|jpeg|jpg|gif|svg)$/, use: ['file-loader',], },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        HtmlWebpackPluginConfig,
        new ExtractTextPlugin('style.bundle.css'),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json', '*'],
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
    },
};
