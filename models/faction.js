const mongoose = require('mongoose')
const { Schema } = mongoose

const factionSchema = new Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  title: String,
  description: String,
  currentLeader: String,
})

factionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    /* eslint-disable */
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    /* eslint-enable */
  },
})

module.exports = mongoose.model('Faction', factionSchema)
