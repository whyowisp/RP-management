const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const { initializeCharacterData } = require('./utils/dataInitializers')
const Character = require('./models/character')
const character = require('./models/character')

//PORT in production (fly/heroku chooses) || PORT in local environment (falls to this unless defined in process.env)
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Params: ', request.params)
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

//Initializes and prefills new Character document and returns it
app.post('/api/characters/new', async (req, res) => {
  const character = initializeCharacterData()
  console.log(character)
  const newCharacter = await character.save()
  res.status(201).json(newCharacter)
})

app.put('/api/characters/:id', async (req, res) => {
  const id = req.params.id
  const updatedCharacter = await Character.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(200).json(updatedCharacter)
})

app.delete('api/characters/:id', async (req, res) => {
  const id = request.params.id
  await Character.findByIdAndDelete(id)
  res.status(204).end()
})

// *** SERVER REQUESTS END ***

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

module.exports = app
