const assert = require('assert')
const User = require('../src/user')

describe('Virtual Types', () => {
   it('postCounter returns number of posts', done => {
      const newUser = new User({ name: 'Joe', posts: [{ title: 'PostTitle' }] })
      newUser
         .save()
         .then(() => User.findOne({ name: 'Joe' }))
         .then(user => {
            assert.strictEqual(user.postCount, 1)
            done()
         })
   })
})
