const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')

describe('Middleware', () => {
   let newUser, newBlogPost

   beforeEach(done => {
      newUser = new User({ name: 'Joe' })
      newBlogPost = new BlogPost({
         title: 'JS is Great',
         content: 'Yep it really is',
      })

      newUser.blogPosts.push(newBlogPost)

      Promise.all([newUser.save(), newBlogPost.save()]).then(() => {
         done()
      })
   })

   it('users clean up dangling blogposts on remove', done => {
      newUser
         .remove()
         .then(() => BlogPost.countDocuments())
         .then(count => {
            assert.strictEqual(count, 0)
            done()
         })
   })
})
