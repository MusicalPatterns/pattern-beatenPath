const self = require('./webpack.self')
const common = require('./webpack.common')
const prod = require('./webpack.prod')
const library = require('./webpack.library')
const merge = require('webpack-merge')

module.exports = merge(self, common, prod, library)
