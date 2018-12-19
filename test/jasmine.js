const config = require('../../../test/jasmine')

module.exports = {
    ...config,
    spec_files: [
        "test/src/**/*.ts",
        "test/src/**/*.js",
        "test/src/**/*.tsx",
        "test/src/**/*.jsx",
        'src/beaten-path/test/src/**/*.ts',
        'src/beaten-path/test/src/**/*.js',
        'src/beaten-path/test/src/**/*.tsx',
        'src/beaten-path/test/src/**/*.jsx',
    ],
}
