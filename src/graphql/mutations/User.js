const User = require('../../models/User')
const Post = require('../../models/Post')
const bcrypt = require('bcrypt')
const config = require('../../../config')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const createUser = async (obj, { input }) => {
  const registerInput = _.pick(input, [
    'name',
    'email',
    'birthday',
    'concentration',
    'hometown',
    'house',
    'gender',
    'bio',
    'picture',
  ])

  const result = await User.query().findOne('email', input.email)

  if (result) {
    return {
      error: { message: 'Email already exists!' },
    }
  }

  const hash = bcrypt.hashSync(input.password, config.saltRounds)

  registerInput.password = hash

  // if (input.hobbies) {
  //   registerInput.hobbies = input.hobbies.map(hobby => ({
  //     hobby,
  //   }))
  // }

  const user = await User.query().insertWithRelatedAndFetch(registerInput)

  if (!user) {
    return {
      error: { message: 'There was an error registering your information.' },
    }
  }

  const payload = { id: user.id }
  const token = jwt.sign(payload, config.tokenSecret)

  return {
    user,
    token,
  }
}

const deleteUser = async (obj, { input }) => {
  const result = await User.query()
    .delete()
    .where('id', input)

  if (result) {
    return {
      message: 'Success deleting user',
    }
  }
}
const resolver = { Mutation: { createUser, deleteUser } }

module.exports = resolver
