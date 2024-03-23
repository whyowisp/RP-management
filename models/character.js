const mongoose = require('mongoose')

const { Schema } = mongoose

const characterSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
    },
    faction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Faction',
    },
    visibility: { type: String, default: 'visible' },
    isMagus: { type: Boolean, default: false },
    name: String,
    player: String,
    saga: String, //This could be changed to campaign
    setting: String,
    currentYear: Number,
    house: String,
    age: String,
    size: Number,
    confidence: String,
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
      {
        experience: Number,
        ability: String,
        specialty: String,
        score: Number,
      },
    ],
    personalityTraits: [{ description: String, score: Number }],
    // type is reserved word but here's workaround
    reputations: [
      { description: String, type: { type: String }, score: Number },
    ],
    combat: {
      armor: { type: String, default: '' },
      modifiers: { type: String, default: '' },
      soak: { type: String, default: '0' },
      load: { type: String, default: '0' },
    },
    fatigue: [],
    wounds: [],
    // Change weapon property later as { type: mongoose.Schema.Types.ObjectId, ref: 'Weapon'},
    weapons: [
      {
        weapon: String,
        initModifier: Number,
        attackModifier: Number,
        defenseModifier: Number,
        damageModifier: Number,
        load: Number,
        range: Number,
      },
    ],
    equipment: [{ item: String, load: Number }],
    depiction: { depiction: String, notes: String },
    magicalArts: [],
    castingTotals: [Number],
    lab: Number,
    longevity: {
      labTotal: Number,
      ageRollModifier: Number,
      twilightScars: String,
    },
    vis: [{ art: String, pawns: Number, physicalForm: String }],
    familiar: {
      characteristics: [],
      stats: [],
      cords: { bronze: Number, silver: Number, gold: Number },
      bondQAndA: [String],
    },
    spells: [
      {
        spell: String,
        form: String,
        technique: String,
        level: Number,
        bonus: String, // Note! String or Number???
        range: String,
        duration: String,
        target: String,
        exp: Number,
        mastery: Number,
        notes: String,
      },
    ],
  },

  { strict: 'throw' }
)

module.exports = mongoose.model('Character', characterSchema)
