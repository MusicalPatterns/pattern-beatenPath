const self = require('./webpack.self')
const common = require('./webpack.common')
const prod = require('./webpack.prod')
const browser = require('./webpack.browser')
const merge = require('webpack-merge')

module.exports = merge(self, common, prod, browser)
