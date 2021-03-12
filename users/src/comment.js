const mongoose = require('mongoose')
const schema = mongoose.Schema

const commentSchema = new schema({
   content: String,
   user: { type: schema.Types.ObjectId, ref: 'User' },
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
