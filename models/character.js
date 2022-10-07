const mongoose = require('mongoose')
const { Schema } = mongoose

const characterSchema = new Schema(
  {
    character: String,
    player: {
      type: String,
      //type: mongoose.Schema.Types.ObjectId,
      //ref: 'Player',
    },
    saga: String,
    setting: String,
    currentYear: Number,
    house: String,
    age: String,
    size: Number,
    confidence: Number,
    decrepitude: {
      effectsOfAging: [String],
    },
    warping: {
      effectsOfWarping: [String],
    },
    descriptiveAttributes: [], //*
    characteristics: [], //*
    virtues: [String],
    flaws: [String],
    abilities: [
      { experience: Number, ability: String, specialty: String, score: Number },
    ],
    personalityTraits: [{ description: String, score: Number }],
    //type is reserved word but here's workaround
    reputation: [
      { description: String, type: { type: String }, score: Number },
    ],
    combat: {
      armor: String,
      modifiers: [{}], //OBS OBS OBS!!!
      soak: Number,
      load: Number,
    },
    fatigue: { value: Number, content: [] }, //*
    wounds: { value: Number, content: [] }, //*
    //Change weapon property later as { type: mongoose.Schema.Types.ObjectId, ref: 'Weapon'},
    weapons: [
      {
        weapon: String,
        initModifier: Number,
        attackModifier: Number,
        defenseModifier: Number,
        damageModifier: Number,
        load: Number,
        Range: Number,
      },
    ],
    equipment: [{ item: String, load: Number }],
  },
  { strict: 'throw' }
)

// *)To be initialized with utils/dataInitializers in document creation

module.exports = mongoose.model('Character', characterSchema)
