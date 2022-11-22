const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Player = require('../models/player')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const player = await Player.findOne({ username })

  const passwordCorrect = player === null
    ? false
    : await bcrypt.compare(password, player.passwordHash)

  if (!(player && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  //Authentication implementation here

  res.status(200).send({ username: player.username, alias: player.alias})
})

module.exports = loginRouter
