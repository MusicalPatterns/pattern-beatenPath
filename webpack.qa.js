const self = require('./webpack.self')
const common = require('./webpack.common')
const dev = require('./webpack.dev')
const browser = require('./webpack.browser')
const merge = require('webpack-merge')

module.exports = merge(self, common, dev, browser)
