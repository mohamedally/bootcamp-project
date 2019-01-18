const merge = require('lodash.merge')

const auth = require('./Auth')
const user = require('./User')
const post = require('./Post')
const friendship = require('./Friendship')
const friendRequests = require('./FriendRequest')

const resolvers = [auth, user, post, friendship, friendRequests]

module.exports = merge(...resolvers)
