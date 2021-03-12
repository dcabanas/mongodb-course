const mongoose = require('mongoose')
const schema = mongoose.Schema

const blogPostSchema = new schema({
   title: String,
   content: String,
   comments: [{ type: schema.Types.ObjectId, ref: 'Comment' }],
})

const BlogPost = mongoose.model('BlogPost', blogPostSchema)
module.exports = BlogPost
