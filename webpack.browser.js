const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { port } = require('./bin/port')

module.exports = {
    entry: './src/start.ts',
    devServer: {
        open: true,
        port,
        stats: {
            warningsFilter: /export .* was not found in/,
        },
    },
    output: {
        filename: 'index.[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /test\//,
                options: {
                    transpileOnly: true,
                },
            },
        ],
    },
    plugins: [
        new FaviconsWebpackPlugin('./node_modules/@musical-patterns/cli/assets/favicon.png'),
        new HtmlWebpackPlugin({
            title: 'Musical Patterns',
            meta: { viewport: 'width=device-width' },
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
}
