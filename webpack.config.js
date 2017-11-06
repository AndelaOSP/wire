/**
 * ./webpack.config.js
 */
const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});

const DIST_PATH = path.resolve( __dirname, 'dist' );
const SOURCE_PATH = path.resolve( __dirname, 'src' );

module.exports = {
    devtool: 'inline-source-map',
    // context: path.resolve(__dirname, '.'),
    entry: [
        SOURCE_PATH + '/index.js'
    ],
    output: {
        path: DIST_PATH,
        filename: 'bundle.js',
        publicPath: "/"
    },
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
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /(\.scss)$/, loaders: ['style-loader', 'css-loader','sass-loader'] },
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                require('postcss-inline-rtl'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ],
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({ use: 'css-loader',}),},
            //Add only image extensions, but can things like svgs, fonts and videos
            { test: /\.(png|jpg|gif)$/, use: [ 'file-loader',],},
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '*'],
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(SOURCE_PATH, 'index.html'),
        }),
        new ExtractTextPlugin('style.bundle.css'),
    ]
};
