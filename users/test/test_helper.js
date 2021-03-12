const mongoose = require('mongoose')

before(done => {
   mongoose.connect('mongodb://localhost/users_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
   })

   mongoose.connection
      .once('open', () => {
         console.log('Good to go!')
         done()
      })
      .on('error', error => console.warn('Warning ', error))
})

beforeEach(async () => {
   const collections = await mongoose.connection.db.collections()
   for (let collection of collections) {
      await collection.drop()
   }
})
