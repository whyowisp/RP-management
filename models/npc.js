const mongoose = require('mongoose')

const { Schema } = mongoose

const npcSchema = new Schema(
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
    visibility: {
      type: String,
      default: 'visible',
      enum: ['visible', 'hidden', 'disabled'],
    },
    isCreature: false, // npc/creature boolean
    group: String, //which group npc belongs to
    copy: { type: Boolean, default: false }, //if npc is a copy of another npc
    showCombatStats: { type: Boolean, default: false },
    name: String,
    might: String,
    age: String,
    born: String,
    size: Number,
    confidence: String,
    characteristics: [], //initialized by npcDataInitializer
    virtuesAndFlaws: [String],
    abilities: [
      {
        ability: String,
        score: Number,
      },
    ],
    personalityTraits: [{ description: String, score: Number }],
    reputations: [
      { description: String, type: { type: String }, score: Number },
    ],
    combat: {
      armor: { type: String, default: '' },
      soak: { type: Number, default: 0 },
    },
    fatigue: [], //*)
    wounds: [], //*)
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
    //depiction sub property would be 'appearance'
    depiction: { depiction: String, notes: String },
    vis: [{ art: String, pawns: Number, physicalForm: String }],
    powers: [
      {
        title: String,
        cost: String,
        iniative: Number,
        art: String,
        description: String,
      },
    ],
  },

  { strict: 'throw' }
)

module.exports = mongoose.model('Npc', npcSchema)
