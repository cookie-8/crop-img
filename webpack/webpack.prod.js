const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge')
const base = require('./webpack.base')
const pathConfig = require('../config/paths')
const fs = require('fs')

const file = fs.readFileSync(pathConfig.appPackageJson).toString(),
    projectName = JSON.parse(file).name

module.exports = merge(base, {
    mode: 'production',
    devtool: false,
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                parallel: true,
                cache: true,
                terserOptions: {
                    safari10: true,
                },
            }),
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.SourceMapDevToolPlugin({
            publicPath: '',
            filename: '[file].map',
        }),
    ],
})
