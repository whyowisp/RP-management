const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { Schema } = mongoose

const playerSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 5 },
    alias: { type: String, unique: true, required: [true, 'Error: Alias must be provided'] },
    passwordHash: { type: String, required: true },
  },
)

playerSchema.plugin(uniqueValidator)

playerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    /* eslint-disable */
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
    /* eslint-enable */
  },
})

module.exports = mongoose.model('Player', playerSchema)
