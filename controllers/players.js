const bcrypt = require('bcrypt')
const playerRouter = require('express').Router()
const Player = require('../models/player')

playerRouter.get('/', async (req, res) => {
  const players = await Player.find({})
  res.json(players)
})

playerRouter.post('/new', async (req, res) => {
    const { name, alias, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const player = new Player({
    name,
    alias,
    passwordHash,
  })

  const savedPlayer = await player.save()
  res.status(201).json(savedPlayer)
})

module.exports = playerRouter
