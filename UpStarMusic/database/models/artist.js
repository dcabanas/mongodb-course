const mongoose = require('mongoose')
const schema = mongoose.Schema
const albumSchema = require('./album')

const artistSchema = schema({
   name: String,
   age: Number,
   yearsActive: Number,
   image: String,
   genre: String,
   website: String,
   netWorth: Number,
   labelName: String,
   retired: Boolean,
   albums: [albumSchema],
})

const Artist = mongoose.model('artist', artistSchema)
module.exports = Artist
