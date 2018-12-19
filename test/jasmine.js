const config = require('../../../test/jasmine')

module.exports = {
    ...config,
    spec_files: [
        "test/src/**/*.ts",
        "test/src/**/*.js",
        "test/src/**/*.tsx",
        "test/src/**/*.jsx",
        'src/beatenPath/test/src/**/*.ts',
        'src/beatenPath/test/src/**/*.js',
        'src/beatenPath/test/src/**/*.tsx',
        'src/beatenPath/test/src/**/*.jsx',
    ],
}
