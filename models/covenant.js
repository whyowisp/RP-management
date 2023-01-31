/* Covenant -> Ars Magica specific model */
const mongoose = require('mongoose')

const { Schema } = mongoose

const covenantSchema = new Schema({
  //COVENANT RECORDS
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
      points: Number, //calculated
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
      incomeType: String,
      income: String,
      notes: String,
    },
  ],
  yearlyExpenditure: [], //init by covenantDataInitializer()
  costSavings: [], //init by -"-
  calendar: [], //init by -"-

  //LIBRARY RECORDS
  magicalBooks: [
    {
      book: String,
      author: String,
      year: String,
      bookType: String,
      artAbility: String,
      level: Number,
      quality: Number,
      notes: String,
    },
  ],
  laboratoryTexts: [
    {
      text: String,
      author: String,
      year: String,
      arts: String,
      level: Number,
      rdt: String,
      notes: String,
    },
  ],
  mundaneBooks: [
    {
      book: String,
      author: String,
      year: String,
      bookType: String,
      ability: String,
      level: Number,
      quality: Number,
      notes: String,
    },
  ],

  //LABORATORY RECORDS
  laboratories: [
    {
      owner: String,
      location: String,
      floor: String,
      points: Number,
      sanctumMarkerNames: String,
      size: String,
      quality: String,
      safety: String,
      health: String,
      refinement: String,
      upkeep: String,
      warping: String,
      aesthetics: String,
      virtuesFlaws: {
        majorVirtues: String,
        minorVirtues: String,
        freeVirtues: String,
        majorFlaws: String,
        minorFlaws: String,
        freeFlaws: String,
      },
      specializations: {
        activitySpecs: [
          {
            activity: String,
            specialization: String,
            score: Number,
          },
        ],
        techSpecs: [
          {
            technique: String,
            specialization: String,
            score: Number,
          },
        ],
        formSpecs: [
          {
            form: String,
            specialization: String,
            score: Number,
          },
        ],
      },
      personalityTraits: [
        {
          trait: String,
          score: Number,
          notes: String,
        },
      ],
      features: [
        {
          feature: String,
          focus: String,
          bonus: Number,
          location: String,
          description: String,
        },
      ],
      magicItems: [
        {
          item: String,
          effect: String,
          arts: String,
          level: Number,
          rdt: String,
          uses: String,
          description: String,
        },
      ],
      sanctumChambers: [
        {
          chamber: String,
          floor: String,
          area: String,
          description: String,
        },
      ],
    },
  ],

  //VIS RECORDS
  visSources: [
    {
      source: String,
      arts: String,
      pawns: String,
      harvestTime: String,
      description: String,
      notes: String,
    },
  ],
  visStores: [], //init by covenantDataInitializer()

  //YEARLY SUMMARY RECORDS
  yearlySummaries: [
    {
      covenant: String,
      year: Number,
      inhabitants: {
        startLoyaltyPoints: Number,
        endLoyaltyPoints: Number,
        prevailingLoyaltyScore: Number,
        loyaltyPointsGained: Number,
        loyaltyPointsLost: Number,
        familiarityGain: Number,
        arrivalsBirths: Number,
        departuresDeaths: Number,
      },
      wealth: {
        incomeModifiersApplied: String,
        totalIncome: Number,
        fixedExpenditure: Number,
        sundryExpensesTotal: Number,
        inflation: Number,
        //totalExpenditure: Number //calculated
        sundryExpenses: String,
        startingTreasury: Number,
        endingTreasury: Number,
        //surplusDeficit: Number //calculated
      },
      eventsAdventures: [
        {
          season: String,
          event: String,
          characters: String,
          notes: String,
        },
      ],
      seasonalActivities: [
        {
          character: String,
          winter: String,
          spring: String,
          summer: String,
          autumn: String,
        },
      ],
    },
  ],
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
