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
    expenditureType: 'Buildings',
    summary: '1 pound per 10 pts. Inhabitants',
    savingLimit: '50% per craft',
  },
  {
    expenditureType: 'Consumables',
    summary: '2 pounds per 10 pts. Inhabitants',
    savingLimit: '20% per craft',
  },
  {
    expenditureType: 'Inflation',
    summary: 'increases yearly',
    savingLimit: '',
  },
  {
    expenditureType: 'Laboratories',
    summary: '1 pound per 10 pts. Laboratories',
    savingLimit: '20% per craft',
  },
  {
    expenditureType: 'Provisions',
    summary: '5 pounds per 10 pts. Inhabitants',
    savingLimit: '50% + 20% per craft',
  },
  {
    expenditureType: 'Titles',
    summary: 'debt and taxes',
    savingLimit: '',
  },
  {
    expenditureType: 'Wages',
    summary: '2 ppints per 10 pts. Inhabitants',
    savingLimit: '',
  },
  {
    expenditureType: 'Weapons and Armor',
    summary: '1 pound per 320 points Weapons and Armor',
    savingLimit: '50% per craft',
  },
  {
    expenditureType: 'Writing Materials',
    summary: '1 pound per Magus and book specialist',
    savingLimit: '50% per craft',
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

const arts = [
  'Creo',
  'Intellego',
  'Muto',
  'Perdo',
  'Rego',
  'Animal',
  'Aquam',
  'Auram',
  'Corpus',
  'Herbam',
  'Ignem',
  'Imaginem',
  'Mentem',
  'Terram',
  'Vim',
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
    covenant.yearlyExpenditure.push({
      expenditureType: expenditure.expenditureType,
      summary: expenditure.summary,
      savingLimit: expenditure.savingLimit,
      expenditure: Number,
      notes: String,
    })
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

  arts.forEach((art) =>
    covenant.visStores.push({
      art: art,
      pawns: Number,
      physicalForm: String,
      notes: String,
      totalPawns: Number,
    })
  )
  return covenant
}

module.exports = { initializeCovenantData }
