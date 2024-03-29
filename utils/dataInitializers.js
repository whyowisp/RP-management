const Character = require('../models/character')
const Npc = require('../models/npc')

const characteristicTitles = [
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

const magicArtsRow = [
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

const shortenedCharacteristicsRow = [
  'Int/Cun',
  'Per',
  'Str',
  'Sta',
  'Pre',
  'Com',
  'Dex',
  'Qik',
]

const familiarStatsRow = [
  'Size',
  'Might',
  'Soak',
  'Fat',
  'Init',
  'Atk',
  'Dfn',
  'Dam',
]

const initializeCharacterData = (playerId, campaignId) => {
  const character = new Character({})
  character.owner = playerId
  character.campaign = campaignId
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
  fatigueDataRow.forEach((fData) => {
    character.fatigue.push({
      checked: false,
      penalty: fData.penalty,
      recovery: fData.recovery,
      level: fData.title,
    })
  })
  woundDataRow.forEach((wData) => {
    character.wounds.push({
      level: wData.title,
      range: String,
      checked: [false, false, false, false, false],
      penalty: wData.penalty,
      notes: String,
    })
  })
  magicArtsRow.map((mArt) =>
    character.magicalArts.push({
      exp: Number,
      art: mArt,
      score: Number,
    })
  )
  shortenedCharacteristicsRow.map((fChr) =>
    character.familiar.characteristics.push({
      characteristic: fChr,
      score: Number,
    })
  )
  familiarStatsRow.map((fStat) =>
    character.familiar.stats.push({
      stat: fStat,
      score: Number,
    })
  )
  return character
}

const initializeNPCData = (playerId, campaignId, isCreature) => {
  console.log('IsCreature?: ' + isCreature)
  const npc = new Npc({})
  npc.owner = playerId
  npc.campaign = campaignId
  npc.isCreature = isCreature
  shortenedCharacteristicsRow.map((cTitle) =>
    npc.characteristics.push({
      characteristic: cTitle,
      score: Number,
    })
  )
  const npcFatigueDataRow = fatigueDataRow.slice(1)
  npcFatigueDataRow.forEach((fData) => {
    npc.fatigue.push({
      range: String,
      checked: [false],
      penalty: fData.penalty,
      level: fData.title,
      notes: String,
    })
  })
  woundDataRow.forEach((wData) => {
    npc.wounds.push({
      title: wData.title,
      range: String,
      checked: [false, false, false, false, false],
      notes: String,
      penalty: wData.penalty,
    })
  })
  return npc
}

module.exports = {
  initializeCharacterData,
  initializeNPCData,
}
