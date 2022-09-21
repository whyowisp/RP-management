const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./utils/config')
const Character = require('./models/character')

const app = express()

//PORT in production (fly/heroku chooses) || PORT in local environment (falls to this unless defined in process.env)
const PORT = process.env.PORT || 4000

app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// *** SERVER REQUESTS START ***

app.get('/api/characters', async (req, res) => {
  const characters = await Character.find({})
  res.json(characters)
})

app.post('/api/characters/', async (req, res) => {
  console.log('requesti: ' + req.body)
  const body = req.body

  if (!body) {
    res.status(400).end()
    return
  }

  //Eikö? const character = new Character({...body})
  const character = new Character({
    character: body.character,
    player: body.player,
    saga: body.saga,
    setting: body.setting,
    currentYear: body.currentYear,
    house: body.house,
    size: body.size,
    confidence: body.confidence,
    decrepitude: body.decrepitude,
  })

  const savedCharacter = await character.save()
  res.status(201).json(savedCharacter)
})

// *** SERVER REQUESTS END ***

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

module.exports = app
