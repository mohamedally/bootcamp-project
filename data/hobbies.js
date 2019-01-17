const casual = require('casual')

casual.define('hobby', () => ({
  id: casual.uuid,
  hobby: casual.random_element([
    'SPORTS',
    'ARTS',
    'MUSIC',
    'READING',
    'TRAVEL',
    'DINING',
    'CODING',
  ]),
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

const hobbies = []

for (let i = 0; i < 15; i++) {
  hobbies.push(casual.hobby)
}

module.exports = hobbies
