const bcrypt = require('bcrypt')
const playerRouter = require('express').Router()
const Player = require('../models/player')

playerRouter.get('/', async (req, res) => {
  const players = await Player.find({})
  res.json(players)
})

playerRouter.post('/new', async (req, res) => {
  const { username, alias, password } = req.body.credentials



  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const player = new Player({
    username,
    alias,
    passwordHash,
  })
/*
  const existingAlias = await Player.findOne({ alias })
  if (existingAlias) {
    res.status(400).send({ error: 'player alias is already taken' })
  }*/

  try {
      const savedPlayer = await player.save()
    res.status(201).json(savedPlayer)
  } catch (err) {
      res.status(400).json(err.errors)
  }
})

module.exports = playerRouter
