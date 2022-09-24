const characterRouter = require('express').Router()
const Character = require('../models/character')
const { initializeCharacterData } = require('../utils/dataInitializers')

characterRouter.get('/', async (req, res) => {
  const characters = await Character.find({})
  res.json(characters)
})

//Initializes and prefills new Character document and returns it
characterRouter.post('/new', async (req, res) => {
  const character = initializeCharacterData()
  //console.log(character)
  const newCharacter = await character.save()
  res.status(201).json(newCharacter)
})

characterRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const updatedCharacter = await Character.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(200).json(updatedCharacter)
})

characterRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Character.findByIdAndDelete(id)
  res.status(204).end()
})

module.exports = characterRouter
