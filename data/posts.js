const casual = require('casual')

casual.define('post', () => ({
  id: casual.uuid,
  content: casual.sentences(2),
  name: casual.random_element([
    'Bliss',
    'Jada',
    'Diego',
    'Dalton',
    'Elizabeth',
    'Kofi',
    'Spencer',
  ]),
}))

const posts = []

for (let i = 0; i < 15; i++) {
  posts.push(casual.post)
}

module.exports = posts
