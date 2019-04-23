module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        globalObject: 'this',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /test\//,
                options: {
                    configFile: 'tsconfig.build.json',
                },
            },
        ],
    },
    externals: [
        '@musical-patterns/cli',
        '@musical-patterns/id',
        '@musical-patterns/material',
        '@musical-patterns/metadata',
        '@musical-patterns/pattern',
        '@musical-patterns/playroom',
        '@musical-patterns/spec',
        '@musical-patterns/utilities',
    ],
}
