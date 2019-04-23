const { DefinePlugin } = require('webpack')

module.exports = {
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.json' ],
    },
    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
}
