const mongoose = require('mongoose')
const schema = mongoose.Schema

const postSchema = new schema({
   title: String,
})

const userSchema = new schema({
   name: {
      type: String,
      validate: {
         validator: name => name.length > 2,
         message: 'Name must be longer than 2 characters',
      },
      required: [true, 'Name is required'],
   },
   //nested subdocuments approach
   posts: [postSchema],
   likes: Number,
   //separate collection approach
   blogPosts: [{ type: schema.Types.ObjectId, ref: 'BlogPost' }],
})

userSchema.virtual('postCount').get(function () {
   return this.posts.length
})

userSchema.pre('remove', function (next) {
   //to avoid cyclic requires at the top
   const BlogPost = mongoose.model('BlogPost')
   BlogPost.deleteMany({ _id: { $in: this.blogPosts } }).then(() => next())
})

const User = mongoose.model('User', userSchema)
module.exports = User
