const User = require('../../../models/User')
const Post = require('../../../models/Post')
const Friendship = require('../../../models/Friend')
const FriendRequest = require('../../../models/FriendRequests')
const { raw } = require('objection')

const userResolver = async (obj, args, context) => {
  const returnedUser = await User.query().findById(args.id)
  return returnedUser
}

const usersResolver = async (obj, args, context) => {
  const { substr, hometown, house, concentration, hobbies } = args

  const query = User.query()

  if (substr) {
    query.where(raw('lower("name")'), 'like', `%${substr.toLowerCase()}%`)
  }

  if (hometown) {
    query.where(raw('lower("hometown")'), hometown.toLowerCase())
  }

  if (house) {
    query.where(raw('lower("house")'), house.toLowerCase())
  }
  if (concentration) {
    query.where(raw('lower("concentration")'), concentration.toLowerCase())
  }

  const users = await query

  return users
}

const userPostsResolver = async (obj, args, context) => {
  const posts = await Post.query().where('userId', obj.id)
  return posts
}

const userFriendsResolver = async (obj, args, context) => {
  const friendIds = []
  const resultOne = await Friendship.query()
    .select('userTwo')
    .where('userOne', obj.id)

  if (resultOne.length) {
    resultOne.map(result => friendIds.push(result.userTwo))
  }

  const resultTwo = await Friendship.query()
    .select('userOne')
    .where('userTwo', obj.id)

  if (resultTwo.length) {
    resultTwo.map(result => friendIds.push(result.userOne))
  }

  const friends = await User.query().whereIn('id', friendIds)
  return friends
}

const sentRequestsResolver = async (obj, args, context) => {
  if (!context.user) {
    return {
      error: {
        message: 'User not logged in',
      },
    }
  }

  const user = await User.query()
    .where('id', context.user.id)
    .then(res => res[0])

  if (!user) {
    return {
      error: {
        message: 'Logged in user does not exist',
      },
    }
  }

  const requests = await FriendRequest.query().where('sender', obj.id)
  const requestIds = []

  requests.map(request => requestIds.push(request.receiver))

  const requestsSent = await User.query().whereIn('id', requestIds)

  return requestsSent
}

const receivedRequestsResolver = async (obj, args, context) => {
  if (!context.user) {
    return {
      error: {
        message: 'User not logged in',
      },
    }
  }

  const user = await User.query()
    .where('id', context.user.id)
    .then(res => res[0])

  if (!user) {
    return {
      error: {
        message: 'Logged in user does not exist',
      },
    }
  }

  const requests = await FriendRequest.query().where('receiver', obj.id)
  const requestIds = []

  requests.map(request => requestIds.push(request.sender))

  const requestsReceived = await User.query().whereIn('id', requestIds)

  return requestsReceived
}

const resolver = {
  Query: {
    user: userResolver,
    users: usersResolver,
  },
  User: {
    posts: userPostsResolver,
    friends: userFriendsResolver,
    sent: sentRequestsResolver,
    received: receivedRequestsResolver,
  },
}

module.exports = resolver
