const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        host: '0.0.0.0',
        port: '9099',
        hot: true,
        historyApiFallback: true,
        https: true,
        disableHostCheck: true,
    },
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin(),
    // ]
})
