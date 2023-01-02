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
  factionType: {
    type: String,
    enum: ['regular', 'covenant'],
    default: 'regular',
  },
  /*covenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Covenant',
  },*/
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
