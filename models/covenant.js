/* Covenant -> Ars Magica specific model */
const mongoose = require('mongoose')

const { Schema } = mongoose

const covenantSchema = new Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  covenantName: String,
  storyGuide: String,
  saga: String,
  auraType: String,
  auraLevel: Number,
  livingConditionsModifierMagi: Number,
  season: String,
  tribunal: String,
  setting: String,
  founded: Number,
  currentYear: Number,
  regioLevels: String,
  livingConditionsModifierMundanes: Number,
  aegisOfTheHearth: String,
  reputations: [
    {
      reputation: String,
      repType: String,
      score: Number,
    },
  ],
  buildPoints: {
    total: Number,
    resources: [], //init via -> covenantDataInitializer()
  },
  boonsAndHooks: {
    features: [], //init via -> covenantDataInitializer()
  },
  inhabitants: {
    governanceType: String,
    baseLoyaltyPoints: Number,
    currentLoyaltyPoints: Number,
    prevailingLoyaltyScore: Number,
    sitModLivingConditions: String,
    sitModEquipment: String,
    sitModMoney: String,
    sitModSpecialists: String,
  },
  magi: [
    {
      name: String,
      born: Number,
      titlesOrResponsibilities: String,
      giftType: String, //Is what???
      notes: String,
      loyalty: Number,
      points: Number,
    },
  ],
  companions: [
    {
      name: String,
      born: Number,
      jobOrAbilities: String,
      notes: String,
      loyalty: Number,
      points: Number,
    },
  ],
  specialists: [
    {
      name: String,
      born: Number,
      jobOrAbilities: String,
      notes: String,
      loyalty: Number,
      points: Number,
    },
  ],
  covenfolk: [
    {
      name: String,
      born: Number,
      jobOrAbilities: String,
      notes: String,
      loyalty: Number,
      points: Number,
    },
  ],
  horsesLivestock: [
    {
      name: String,
      born: Number,
      quantity: String,
      notes: String,
      points: Number,
    },
  ],
  landsPossessions: [
    {
      name: String,
      location: String,
      areaDimensionsFloors: String,
      inhabitants: String,
      notes: String,
    },
  ],
  magicItems: [
    {
      name: String,
      creator: String,
      year: Number,
      effect: String,
      arts: String,
      lvl: Number,
      rdt: String,
      uses: String,
      description: String,
    },
  ],
  mundaneItems: [
    {
      name: String,
      quantity: Number,
      description: String,
    },
  ],
  weaponsArmor: [
    {
      name: String,
      cost: String,
      pointsPerItem: Number,
      quantity: String,
      notes: String,
      points: Number,
    },
  ],
  wealth: {
    income: Number,
    expenditure: Number,
    savings: Number,
    pointsInhabitants: Number,
    pointsLaboratories: Number,
    pointsWeaponArmor: Number,
  },
  incomeSources: [
    {
      source: String,
      description: String,
      type: String,
      income: String,
      notes: String,
    },
  ],
  yearlyExpenditure: [], //init by covenantDataInitializer()
  costSavings: [], //init by -"-
  calendar: [], //init by -"-
})

covenantSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    /* eslint-disable */
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    /* eslint-enable */
  },
})

module.exports = mongoose.model('Covenant', covenantSchema)
