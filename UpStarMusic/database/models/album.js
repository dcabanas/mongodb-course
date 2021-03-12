const mongoose = require('mongoose')
const schema = mongoose.Schema

const albumSchema = schema({
   title: String,
   date: Date,
   copiesSold: Number,
   numberTracks: Number,
   image: String,
   revenue: Number,
})

module.exports = albumSchema
