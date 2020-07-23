const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const pathConfig = require('../config/paths')

const path = require('path')

// const processNodeEnv = process.env.NODE_ENV
// const processArgv = process.argv

// const startDev = processArgv.indexOf('--dev') > -1

// const buildProd = processArgv.toString().indexOf('prod') > -1
// const buildDev = processArgv.toString().indexOf('dev') > -1

// const isEnvDevelopment = processNodeEnv === 'development'
// const isEnvProduction = processNodeEnv === 'production'

module.exports = {
    entry: pathConfig.appIndex,
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'async'
        },
    },
    output: {
        path: pathConfig.appDist,
        filename: 'js/[name].js',
        chunkFilename: `js/[name]-[chunkhash:6].js`,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [pathConfig.appSrc],
                options: {
                    formatter: require('eslint-friendly-formatter'),
                },
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // sourceMap: !buildProd,
                            modules: false,
                            // localIdentName: buildProd ? '[hash:base64:5]' : '[local]',
                            localIdentName: '[hash:base64:5]',
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
                sideEffects: true
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'assets/[name].[hash:6].[ext]',
                        },
                    },
                ],
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
        modules: [pathConfig.appSrc, pathConfig.appNodeModules],
        alias: {
            '@src': pathConfig.appSrc,
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: pathConfig.appHtml,
            inject: true,
        }),
        new MiniCssExtractPlugin({
            filename: `css/[name].css`,
            chunkFilename: `css/[name]-[hash:6]`
        }),
        // new webpack.HotModuleReplacementPlugin(),

        new CleanWebpackPlugin(),

        new copyWebpackPlugin([
            {
                from: 'static/*',
                to: './',
            },
        ]),
    ].filter(Boolean),
}
