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
                use: [
                    { loader: 'css-loader', options: { importLoaders: 1 } },
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
                    { loader: 'sass-loader' }
                ]
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
