const assert = require('assert')
const User = require('../src/user')

describe('Deleting records', () => {
   let newUser

   beforeEach(done => {
      newUser = new User({ name: 'Joe' })
      newUser.save().then(() => done())
   })

   it('model instance remove', done => {
      newUser
         .remove()
         .then(() => User.findOne({ name: 'Joe' }))
         .then(user => {
            assert.strictEqual(user, null)
            done()
         })
   })

   it('class method remove', done => {
      User.deleteMany({ name: 'Joe' })
         .then(() => User.findOne({ name: 'Joe' }))
         .then(user => {
            assert.strictEqual(user, null)
            done()
         })
   })

   it('class method findAndRemove', done => {
      User.findOneAndRemove({ name: 'Joe' })
         .then(() => User.findOne({ name: 'Joe' }))
         .then(user => {
            assert.strictEqual(user, null)
            done()
         })
   })

   it('class method findByIdAndRemove', done => {
      User.findByIdAndRemove(newUser._id)
         .then(() => User.findOne({ name: 'Joe' }))
         .then(user => {
            assert.strictEqual(user, null)
            done()
         })
   })
})
