const Artist = require('../models/artist')

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
   const p = Artist.aggregate([
      {
         $group: {
            _id: null,
            min: { $min: '$age' },
            max: { $max: '$age' },
         },
      },
   ]).then(result => result[0])

   return Promise.all([p]).then(result => ({
      min: result[0].min,
      max: result[0].max,
   }))

   /* const minQuery = Artist.find({})
      .sort({ age: 1 })
      .limit(1)
      .then(artists => artists[0].age)

   const maxQuery = Artist.find({})
      .sort({ age: -1 })
      .limit(1)
      .then(artists => artists[0].age)

   return Promise.all([minQuery, maxQuery]).then(result => ({
      min: result[0],
      max: result[1],
   })) */
}
