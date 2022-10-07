const Character = require('../models/character')

characteristicTitles = [
  'Intelligence',
  'Perception',
  'Strength',
  'Stamina',
  'Presence',
  'Communication',
  'Dexterity',
  'Quickness',
]

const descriptiveAttributesTitles = [
  'Birth Name',
  'Year Born',
  'Gender',
  'Race/Nationality',
  'Place Of Origin',
  'Religion',
  'Title/Profession',
  'Height',
  'Weight',
  'Hair',
  'Eyes',
  'Handedness',
]

const fatigueDataRow = [
  { title: 'Fresh' },
  { penalty: 0, recovery: '2 min', title: 'Winded' },
  { penalty: -1, recovery: '10 min', title: 'Weary' },
  { penalty: -3, recovery: '30 min', title: 'Tired' },
  { penalty: -5, recovery: '1 hr.', title: 'Dazed' },
  { recovery: '2 hr.', title: 'Unconscious' },
]

const woundDataRow = [
  { title: 'Light Wounds', penalty: -1 },
  { title: 'Medium Wounds', penalty: -3 },
  { title: 'Heavy Wounds', penalty: -5 },
  { title: 'Incapacitated' },
  { title: 'Dead' },
]

const initializeCharacterData = () => {
  const character = new Character({})

  characteristicTitles.map((cTitle) =>
    character.characteristics.push({
      characteristic: cTitle,
      description: String,
      score: Number,
    })
  )
  descriptiveAttributesTitles.map((dAttributeTitle) =>
    character.descriptiveAttributes.push({
      attribute: dAttributeTitle,
      description: String,
    })
  )
  fatigueDataRow.map((fData) => {
    character.fatigue.content.push({
      penalty: fData.penalty,
      recovery: fData.recovery,
      level: fData.title,
    })
  })
  woundDataRow.map((wData) => {
    character.wounds.content.push({
      level: wData.title,
      range: String,
      penalty: wData.penalty,
      notes: String,
    })
  })
  return character
}

module.exports = {
  initializeCharacterData,
}
