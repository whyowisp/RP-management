const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Character = require('./models/character')

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

app.post('/api/characters', async (req, res) => {
  const body = req.body

  if (Object.entries(req.body).length === 0) {
    res.status(400).end()
    return
  }

  const character = new Character({ ...body })

  const savedCharacter = await character.save()
  res.status(201).json(savedCharacter)
})

app.put('/api/characters/:id', async (req, res) => {
  const id = req.params.id
  const propertyEdit = req.body
  console.log(req.body)
  const updatedCharacter = await Character.findByIdAndUpdate(id, propertyEdit, {
    new: true,
  })
  res.status(200).json(updatedCharacter)
})

// *** SERVER REQUESTS END ***

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

module.exports = app
