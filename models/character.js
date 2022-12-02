const mongoose = require('mongoose')
const Player = require('./player')

const { Schema } = mongoose

const characterSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Player,
    },
    visibility: {type:String, default: 'visible'},
    character: String,
    player: String,
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
      soak: { type: Number, default: 0 },
      load: { type: Number, default: 0 },
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
    // magi data start
    house: String,
    covenant: String,
    sigil: String,
    domus: String,
    primus: String,
    parens: String,
    covenOfApprenticeship: String,
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

  { strict: 'throw' },
)

module.exports = mongoose.model('Character', characterSchema)
