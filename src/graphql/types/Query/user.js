const User = require('../../../models/User')
const Post = require('../../../models/Post')
const { raw } = require('objection')

const userResolver = async (obj, args, context) => {
  // TODO: Write a resolver which returns a user given a user id.
  const returnedUser = await User.query().findById(args.id)
  return returnedUser
}

const usersResolver = async (obj, args, context) => {
  const { substr, hometown, house, concentration, hobbies } = args
  /* TODO: Write a resolver which returns a list of all users.
  
  Once you're done, implement the following pieces of functionality one by one:

  If any of the following arguments are provided, apply the corresponding filter:
    - substr: include only users whose name contains the substring
    - hometown: include only users from that hometown
    - house: include only users from that house
    - concentration: include only users who have that concentration
    - hobbies: include only users who have indicated one of the hobbies in that list
  */

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
  // if (hobbies) {
  //   query.where('hobbies', hobbies)
  // }

  const users = await query

  return users
}

const userPostsResolver = async (obj, args, context) => {
  const posts = await Post.query().where('userId', obj.id)
  return posts
}

const resolver = {
  Query: {
    user: userResolver,
    users: usersResolver,
  },
  User: {
    posts: userPostsResolver,
  },
}

module.exports = resolver
