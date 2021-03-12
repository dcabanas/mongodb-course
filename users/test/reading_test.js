const assert = require('assert')
const User = require('../src/user')

describe('Finding records', () => {
   let newUser, newUser2, newUser3, newUser4

   beforeEach(done => {
      newUser = new User({ name: 'Joe' })
      newUser2 = new User({ name: 'Alex' })
      newUser3 = new User({ name: 'Maria' })
      newUser4 = new User({ name: 'Zach' })

      Promise.all([
         newUser.save(),
         newUser2.save(),
         newUser3.save(),
         newUser4.save(),
      ]).then(() => done())
   })

   it('finds all users with a certain name', done => {
      User.find({ name: 'Joe' }).then(users => {
         assert.strictEqual(users[0]._id.toString(), newUser._id.toString())
         done()
      })
   })

   it('Find a user with a certain id', done => {
      User.findOne({ _id: newUser._id }).then(user => {
         assert.strictEqual(user.name, newUser.name)
         done()
      })
   })

   it.only('can skip and limit the result set', done => {
      User.find({})
         .sort({ name: 1 })
         .skip(1)
         .limit(2)
         .then(users => {
            assert.strictEqual(users.length, 2)
            assert.strictEqual(users[0].name, 'Joe')
            assert.strictEqual(users[1].name, 'Maria')
            done()
         })
   })
})
