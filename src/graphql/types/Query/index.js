const merge = require('lodash.merge')

const user = require('./user')
const post = require('./post')

const resolvers = [user, post]

module.exports = merge(...resolvers)
