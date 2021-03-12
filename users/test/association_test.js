const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/user')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('Associations', () => {
   let newUser, newBlogPost, newComment

   beforeEach(done => {
      newUser = new User({ name: 'Joe' })
      newBlogPost = new BlogPost({
         title: 'JS is Great',
         content: 'Yep it really is',
      })
      newComment = new Comment({ content: 'Congrats on great post' })

      newUser.blogPosts.push(newBlogPost)
      newBlogPost.comments.push(newComment)
      newComment.user = newUser

      Promise.all([newUser.save(), newBlogPost.save(), newComment.save()]).then(
         () => {
            done()
         }
      )
   })

   it('saves a relation between a user and a blogPost', done => {
      User.findOne({ name: 'Joe' })
         .populate('blogPosts')
         .then(user => {
            assert.strictEqual(user.blogPosts[0].title, 'JS is Great')
            done()
         })
   })

   it('saves a full relation graph', done => {
      User.findOne({ name: 'Joe' })
         .populate({
            path: 'blogPosts',
            model: 'BlogPost',
            populate: {
               path: 'comments',
               model: 'Comment',
               populate: {
                  path: 'user',
                  model: 'User',
               },
            },
         })
         .then(user => {
            assert.strictEqual(user.name, 'Joe')
            assert.strictEqual(user.blogPosts[0].title, 'JS is Great')
            assert.strictEqual(
               user.blogPosts[0].comments[0].content,
               'Congrats on great post'
            )
            assert.strictEqual(user.blogPosts[0].comments[0].user.name, 'Joe')
            done()
         })
   })
})
