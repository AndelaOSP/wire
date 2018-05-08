const webpack = require('webpack');
const common = require('./webpack.common.js');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

common.entry.push('webpack-hot-middleware/client?reload=true');
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
    historyApiFallback: true,
    hot: true,
    inline: true
};
common.plugins = [
    ...common.plugins,
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'API_URL': JSON.stringify(process.env.API_URL),
            'ANDELA_API_BASE_URL': JSON.stringify(process.env.ANDELA_API_BASE_URL),
            'BASE_URL': JSON.stringify(process.env.BASE_URL)
        }
    }),
    new webpack.NamedModulesPlugin(), // displays the path of the module when HMR is enabled.
    new webpack.HotModuleReplacementPlugin(),
];

module.exports = common;
