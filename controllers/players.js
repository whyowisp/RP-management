const bcrypt = require('bcrypt')
const playerRouter = require('express').Router()
const Player = require('../models/player')

playerRouter.get('/', async (req, res) => {
  const players = await Player.find({})
  res.json(players)
})

playerRouter.post('/new', async (req, res) => {
  const { username, alias, password } = req.body.credentials

  if (password.length < 8) res.status(400).send('Error: Password either too short or non-existing')

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const player = new Player({
    username,
    alias,
    passwordHash,
  })

  try {
    const savedPlayer = await player.save()
    res.status(201).json(savedPlayer)
  } catch (err) {
    res.status(400).json(err.errors)
  }
})

module.exports = playerRouter
