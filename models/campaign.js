const mongoose = require('mongoose')
// const Covenant = require('./covenant')

const { Schema } = mongoose

const campaignSchema = new Schema({
  title: String,
  game: String,
  started: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      permissions: {
        type: String,
        enum: ['all', 'limited', 'none'], // Check
        default: 'none',
      },
    },
  ],
  characters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character',
    },
  ],
  /* factions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Faction,
      },
    ], */
  /* covenants: [
        {
            type: mongoose.Schema.Types.ObjectId,
          ref: Covenant,
        }
    ], */
})

campaignSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    /* eslint-disable */
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
    /* eslint-enable */
  },
})

module.exports = mongoose.model('Campaign', campaignSchema)