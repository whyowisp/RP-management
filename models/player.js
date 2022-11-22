const mongoose = require('mongoose')

const { Schema } = mongoose

const playerSchema = new Schema(
  {
    name: String,
    alias: { type: String, unique: true },
    passwordHash: String,
  },
)

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
