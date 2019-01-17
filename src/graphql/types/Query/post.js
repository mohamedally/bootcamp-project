const Post = require('../../../models/Post')

const postResolver = async (obj, args, context) => {
  // TODO: Write a resolver which returns a post given its id.
  const returnedPost = await Post.query().where('id', args.id)
  return returnedPost
}

const postsResolver = async (obj, args, context) => {
  /* TODO: Write a resolver which returns a list of all posts.
    - this list should be ordered with the most recent posts first 
  */
  const returnedPosts = await Post.query().orderBy('createdAt', 'desc')
  return returnedPosts
}

const resolver = {
  Query: {
    post: postResolver,
    posts: postsResolver,
  },
}

module.exports = resolver
