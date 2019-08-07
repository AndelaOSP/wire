const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'API_URL': JSON.stringify(process.env.API_URL),
                'ANDELA_API_BASE_URL': JSON.stringify(process.env.ANDELA_API_BASE_URL),
                'BASE_URL': JSON.stringify(process.env.BASE_URL)
            }
        }),
        new CopyWebpackPlugin([
            { from: 'assets/', to: 'assets/' }
        ])
    ]
});
