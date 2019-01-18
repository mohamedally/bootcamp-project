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

const editUser = async (obj, args, context) => {
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

  const {
    name,
    email,
    birthday,
    concentration,
    hometown,
    house,
    gender,
    bio,
    picture,
    hobbies,
  } = args.input

  const payload = {}
  if (name) payload.name = name
  if (email) payload.email = email
  if (birthday) payload.birthday = birthday
  if (concentration) payload.concentration = concentration
  if (hometown) payload.hometown = hometown
  if (house) payload.house = house
  if (gender) payload.gender = gender
  if (bio) payload.bio = bio
  if (picture) payload.picture = picture
  if (hobbies) payload.hobbies = hobbies

  const result = await User.query()
    .patch(payload)
    .where('id', user.id)

  if (!result) {
    return {
      error: {
        message: 'Failed to edit user',
      },
    }
  }

  const newUser = await User.query().findById(user.id)
  return newUser
}

const resolver = {
  Mutation: { createUser, deleteUser, editUser },
}

module.exports = resolver
