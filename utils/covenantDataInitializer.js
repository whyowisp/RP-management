const Covenant = require('../models/covenant')

const resourceNames = [
  'Library',
  'Lab Texts',
  'Vis',
  'Enchanted Items',
  'Specialists',
  'Laboratories',
  'Money',
]

const featureNames = [
  'Major Boons',
  'Minor Boons',
  'Free Choices',
  'Minor Hooks',
  'Major Hooks',
]

const expenditures = [
  {
    type: 'Buildings',
    summary: '1 pound per 10 pts. Inhabitants',
    savingLimit: '50% per craft',
    expenditure: Number,
    notes: String,
  },
  {
    type: 'Consumables',
    summary: '2 pounds per 10 pts. Inhabitants',
    savingLimit: '20% per craft',
    expenditure: Number,
    notes: String,
  },
  {
    type: 'Inflation',
    summary: 'increases yearly',
    savingLimit: '',
    expenditure: Number,
    notes: String,
  },
  {
    type: 'Laboratories',
    summary: '1 pound per 10 pts. Laboratories',
    savingLimit: '20% per craft',
    expenditure: Number,
    notes: String,
  },
  {
    type: 'Provisions',
    summary: '5 pounds per 10 pts. Inhabitants',
    savingLimit: '50% + 20% per craft',
    expenditure: Number,
    notes: String,
  },
  {
    type: 'Titles',
    summary: 'debt and taxes',
    savingLimit: '',
    expenditure: Number,
    notes: String,
  },
  {
    type: 'Wages',
    summary: '2 ppints per 10 pts. Inhabitants',
    savingLimit: '',
    expenditure: Number,
    notes: String,
  },
  {
    type: 'Weapons and Armor',
    summary: '1 pound per 320 points Weapons and Armor',
    savingLimit: '50% per craft',
    expenditure: Number,
    notes: String,
  },
  {
    type: 'Writing Materials',
    summary: '1 pound per Magus and book specialist',
    savingLimit: '50% per craft',
    expenditure: Number,
    notes: String,
  },
]

const savings = [
  {
    target: 'Laborers',
    summary: '1 pound per person',
    nameQuantity: String,
    saving: Number,
    notes: String,
  },
  {
    target: 'Craftsmen (common)',
    summary: '1 + (Ability / 2) pounds per season',
    nameQuantity: String,
    saving: Number,
    notes: String,
  },
  {
    target: 'Craftsmen (rare)',
    summary: 'Ability pounds per season',
    nameQuantity: String,
    saving: Number,
    notes: String,
  },
  {
    target: 'Magic Items',
    summary: '1 pound per magnitude',
    nameQuantity: String,
    saving: Number,
    notes: String,
  },
]

const seasons = ['Winter', 'Spring', 'Summer', 'Autumn']

const initializeCovenantData = (campaignId) => {
  const covenant = new Covenant({})

  covenant.campaign = campaignId

  resourceNames.forEach((rName) =>
    covenant.buildPoints.resources.push({
      target: rName,
      startingPoints: Number,
      currentPoints: Number,
      notes: String,
    })
  )

  featureNames.forEach((fName) =>
    covenant.boonsAndHooks.features.push({
      feature: fName,
      name: String,
      notes: String,
    })
  )

  expenditures.forEach((expenditure) =>
    covenant.yearlyExpenditure.push(expenditure)
  )

  seasons.forEach((season) =>
    covenant.calendar.push({
      season: season,
      dateCM: String,
      councilMeeting: String,
      dateVC: String,
      visCollection: String,
      dateOYE: String,
      otherYearlyEvent: String,
    })
  )

  savings.forEach((saving) => covenant.costSavings.push(saving))

  return covenant
}

module.exports = { initializeCovenantData }
