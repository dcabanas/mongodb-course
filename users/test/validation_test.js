const assert = require('assert')
const User = require('../src/user')

describe('Validating records', () => {
   it('requires a user name', () => {
      const newUser = new User({ name: undefined })
      const validationResult = newUser.validateSync()
      const { message } = validationResult.errors.name
      assert.strictEqual(message, 'Name is required')
   })

   it('requires a user name longer than 2 characters', () => {
      const newUser = new User({ name: 'Al' })
      const validationResult = newUser.validateSync()
      const { message } = validationResult.errors.name
      assert.strictEqual(message, 'Name must be longer than 2 characters')
   })

   it('disallows invalid records from being saved', done => {
      const newUser = new User({ name: 'Al' })
      newUser.save().catch(validationResult => {
         const { message } = validationResult.errors.name
         assert.strictEqual(message, 'Name must be longer than 2 characters')
         done()
      })
   })
})
