const campaignRouter = require('express').Router()
const Campaign = require('../models/campaign')
const Character = require('../models/character')
const Player = require('../models/player')

campaignRouter.get('/:id', async (req, res) => {
  const campaign = await Campaign.findById(req.body.id)
  console.log(campaign)
  res.json(campaign)
})

campaignRouter.get('/', async (req, res) => {
  const campaigns = await Campaign.find({})
  console.log(campaigns)
  res.json(campaigns)
})

campaignRouter.post('/new', async (req, res) => {
  //Make some checks
  const player = await Player.findById(req.body.userId)
  const newCampaign = new Campaign({
    owner: player.id,
  })

  const campaign = await newCampaign.save()
  res.status(201).json(campaign)
})

//Write next
campaignRouter.put('/:id', async (req, res) => {
  // requestHistory.push({ id: req.params.id, body: req.body })
  const { id } = req.params
  const updatedCharacter = await Character.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(200).json(updatedCharacter)
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
