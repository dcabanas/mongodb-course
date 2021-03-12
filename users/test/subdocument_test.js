const assert = require('assert')
const User = require('../src/user')

describe('Subdocuments testing', () => {
   it('can create a subdocument', done => {
      const newUser = new User({ name: 'Joe', posts: [{ title: 'PostTitle' }] })
      newUser
         .save()
         .then(() => User.findOne({ name: 'Joe' }))
         .then(user => {
            assert(user.posts)
            done()
         })
   })

   it('can add subdocuments to an existing record', done => {
      const newUser = new User({ name: 'Joe', posts: [] })

      newUser
         .save()
         .then(() => User.findOne({ name: 'Joe' }))
         .then(user => {
            user.posts.push({ title: 'New Post' })
            return user.save()
         })
         .then(() => User.findOne({ name: 'Joe' }))
         .then(user => {
            assert.strictEqual(user.posts.length, 1)
            assert.strictEqual(user.posts[0].title, 'New Post')
            done()
         })
   })

   it('can remove an existing subdocument', done => {
      const newUser = new User({ name: 'Joe', posts: [{ title: 'New Title' }] })

      newUser
         .save()
         .then(() => User.findOne({ name: 'Joe' }))
         .then(user => {
            user.posts[0].remove()
            return user.save()
         })
         .then(() => User.findOne({ name: 'Joe' }))
         .then(user => {
            assert.strictEqual(user.posts.length, 0)
            done()
         })
   })
})
