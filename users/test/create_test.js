const assert = require('assert')
const User = require('../src/user')

describe('Creating records', () => {
   it('saves a User', done => {
      const newUser = new User({ name: 'Joe' })
      newUser.save().then(() => {
         // User saved successfully?
         assert(!newUser.isNew)
         done()
      })
   })
})
