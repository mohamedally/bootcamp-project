const BaseModel = require('./BaseModel')
const { HasManyRelation, ManyToManyRelation } = require('objection')

class User extends BaseModel {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    const Post = require('./Post')

    return {
      posts: {
        relation: HasManyRelation,
        modelClass: Post,
        join: {
          from: 'users.id',
          to: 'posts.userId',
        },
      },
      friends: {
        relation: ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          through: {
            from: 'friends.userOne',
            to: 'friends.userTwo',
          },
          to: 'users.id',
        },
      },
      friend_requests: {
        relation: ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          through: {
            from: 'friend_requests.sender',
            to: 'friend_requests.receiver',
          },
          to: 'users.id',
        },
      },
    }
  }
}

module.exports = User
