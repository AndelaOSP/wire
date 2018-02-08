const webpack = require('webpack');
const common = require('./webpack.common.js');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

common.devtool = 'inline-source-map';
common.module.rules = [
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
    ...common.module.rules,
];
common.devServer = {
    contentBase: './dist', // Tell server where to serve content (static files) from
    historyApiFallback: true,
    hot: true,
    inline: true,
};
common.plugins = [
    ...common.plugins,
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    }),
    new webpack.NamedModulesPlugin(), // displays the path of the module when HMR is enabled.
    new webpack.HotModuleReplacementPlugin(),
];

module.exports = common;
