module.exports = {
    spec_files: [
        'test/src/**/*.ts',
        'test/src/**/*.js',
        'test/src/**/*.tsx',
        'test/src/**/*.jsx',
    ],
    helpers: [
        'test/setup.js',
        'test/setup.ts',
        'test/reporter.ts',
        'test/mockDom.ts',
    ],
    oneFailurePerSpec: false,
    random: false,
}
