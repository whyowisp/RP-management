const characterRouter = require('express').Router()
const Character = require('../models/character')
const { initializeCharacterData } = require('../utils/dataInitializers')

// const requestHistory = []

characterRouter.get('/:id', async (req, res) => {
  const character = await Character.findById(id)
  console.log(character)
  res.json(character)
})

characterRouter.get('/', async (req, res) => {
  const characters = await Character.find({})
  // console.log(characters)
  res.json(characters)
})

// Initializes and prefills new Character document and returns it
characterRouter.post('/new', async (req, res) => {
  const character = initializeCharacterData()
  // console.log(character)
  const newCharacter = await character.save()
  res.status(201).json(newCharacter)
})

characterRouter.put('/:id', async (req, res) => {
  // requestHistory.push({ id: req.params.id, body: req.body })
  const { id } = req.params
  const updatedCharacter = await Character.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(200).json(updatedCharacter) // probably client does´nt need to know
  // console.log('requestHistory: ' + JSON.stringify(requestHistory))
})

characterRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  await Character.findByIdAndDelete(id)
  res.status(204).end()
})

// Caution! removes all data
characterRouter.delete('/', async (req, res) => {
  await Character.deleteMany()
  res.status(204).end()
})

module.exports = characterRouter
