const Character = require('../models/character')

const characters = [
  {
    character: 'Jaume Callahan',
    player: 'Mikkis',
    saga: 'Levantin seikkailut',
    setting: 'enpätuotatiiä',
    currentYear: 1197,
    house: 'Bonisagus',
    size: -1,
    confidence: 2,
    decrepitude: 1,
  },
  {
    character: 'Deharme',
    player: 'Jokkis',
    saga: 'Levantin seikkailut',
    setting: 'enpätuotatiiä',
    currentYear: 1197,
    house: 'Jerbiton',
    size: 0,
    confidence: 1,
    decrepitude: 0,
  },
]

const getId = async () => {
  const character = await Character.findOne({})
  return character._id.toString()
}

module.exports = {
  characters,
  getId,
}
