const npcsRouter = require('express').Router()
const Campaign = require('../models/campaign')
const Npc = require('../models/npc')
const Player = require('../models/player')
const { initializeNPCData } = require('../utils/dataInitializers')

npcsRouter.get('/:id', async (req, res) => {
  const npc = await Npc.findById(req.body.id)
  console.log(npc)
  res.json(npc)
})

npcsRouter.get('/', async (req, res) => {
  const npcs = await Npc.find({})
  // console.log(npcs)
  res.json(npcs)
})

//Get all by campaignId
npcsRouter.get('/byCampaignId/:id', async (req, res) => {
  const npcs = await Npc.find({ campaign: req.params.id })
  res.json(npcs)
})

// Initializes and prefills new npc document and returns it
npcsRouter.post('/new', async (req, res) => {
  const player = await Player.findById(req.body.playerId)
  const campaign = await Campaign.findById(req.body.campaignId)
  const npc = await initializeNPCData(
    player.id,
    campaign.id,
    req.body.isCreature
  )

  // console.log(npc)
  const newNpc = await npc.save()
  res.status(201).json(newNpc)
})

npcsRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const updatedNpc = await Npc.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(200).json(updatedNpc)
})

npcsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  await Npc.findByIdAndDelete(id)
  res.status(204).end()
})

npcsRouter.delete('/', async (req, res) => {
  await Npc.deleteMany()
  res.status(204).end()
})

module.exports = npcsRouter
