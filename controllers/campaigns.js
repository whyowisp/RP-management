const campaignRouter = require('express').Router()
const Campaign = require('../models/campaign')
//const Faction = require('../models/faction')
const Character = require('../models/character')
const Player = require('../models/player')

campaignRouter.get('/:id', async (req, res) => {
  const campaign = await Campaign.findById(req.body.id)
  console.log(campaign)
  res.json(campaign)
})

campaignRouter.get('/', async (req, res) => {
  const campaigns = await Campaign.find({}).populate('owner')
  console.log(campaigns)
  res.json(campaigns)
})

campaignRouter.post('/new', async (req, res) => {
  const { title, game, playerId } = req.body

  if (!title || !game || !playerId) {
    return res.status(401).json({
      error: `request missing data, request body: ${JSON.stringify(req.body)}`,
    })
  }

  const player = await Player.findById(playerId)
  const newCampaign = new Campaign({
    owner: player.id,
    game: game,
    title: title,
  })

  const campaign = await newCampaign.save()
  res.status(201).json(campaign)
})

//Write next
campaignRouter.put('/:id', async (req, res) => {
  // requestHistory.push({ id: req.params.id, body: req.body })
  const { id } = req.params
  const updatedCampaign = await Campaign.findByIdAndUpdate(id, req.body)
  res.status(200).json(updatedCampaign)
  // console.log('requestHistory: ' + JSON.stringify(requestHistory))
})

/*
campaignRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
  await Character.findByIdAndDelete(id)
  res.status(204).end()
})
*/

// Caution! removes all data
campaignRouter.delete('/', async (req, res) => {
  await Character.deleteMany()
  res.status(204).end()
})

module.exports = campaignRouter
