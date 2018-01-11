const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: eslintFormatter,
                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ]
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ]
});
