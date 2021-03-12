const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () => {
   let newUser

   beforeEach(done => {
      newUser = new User({ name: 'Joe', likes: 0 })
      newUser.save().then(() => done())
   })

   const assertName = (operation, done) => {
      operation
         .then(() => User.find({}))
         .then(users => {
            assert.strictEqual(users.length, 1)
            assert.strictEqual(users[0].name, 'Alex')
            done()
         })
   }

   it('model instance set&save', done => {
      // Not persisted in the DB yet, only in memory
      newUser.set('name', 'Alex')
      assertName(newUser.save(), done)
   })

   it('model instance update', done => {
      assertName(newUser.updateOne({ name: 'Alex' }), done)
   })

   it('model class update', done => {
      assertName(User.updateMany({ name: 'Joe' }, { name: 'Alex' }), done)
   })

   it('model class findOneAndUpdate', done => {
      assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done)
   })

   it('model class findByIdAndUpdate', done => {
      assertName(User.findByIdAndUpdate(newUser._id, { name: 'Alex' }), done)
   })

   it('Increment user likes', done => {
      User.updateMany({ name: 'Joe' }, { $inc: { likes: 10 } })
         .then(() => User.findOne({ name: 'Joe' }))
         .then(user => {
            assert.strictEqual(user.likes, 10)
            done()
         })
   })
})
