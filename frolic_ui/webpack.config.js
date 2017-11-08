'use strict';

const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
let config = {
    entry: {
        'vendor': [
            'angular',
            '@uirouter/angularjs',
            'jquery',
            'bootstrap',
            'angular-sanitize',
            'ng-file-upload',
            'ng-storage'
        ],
        // Auto-detect all pages in directory.
        'myPages': glob.sync('./src/**/*.js'),
    },
    module: {
        loaders: [
            // CSS: scss, css
            {
                test: /\.s?css$/,
                loaders: ['style', 'css', 'sass', 'postcss-loader']
            },
            // SVGs: svg, svg?something
            {
                test: /\.svg(\?.*$|$)/,
                loader: 'file-loader?name=/img/[name].[ext]'
            },
            // Images: png, gif, jpg, jpeg
            {
                test: /\.(png|gif|jpe?g)$/,
                loader: 'file?name=/img/[name].[ext]'
            },
            // HTML: htm, html
            {
                test: /\.html?$/,
                loader: "file?name=[name].[ext]"
            },
            // Font files: eot, ttf, woff, woff2
            {
                test: /\.(eot|ttf|woff2?)(\?.*$|$)/,
                loader: 'file?name=/fonts/[name].[ext]'
            }
        ]
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'

    },

    plugins: [
        // Pro-tip: Order matters here.
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),

        // Minify assets.
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false // https://github.com/webpack/webpack/issues/1496
            }
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};

module.exports = config;