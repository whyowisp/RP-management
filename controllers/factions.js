const factionRouter = require('express').Router()
const Faction = require('../models/faction')
const Campaign = require('../models/campaign')

//Get one
factionRouter.get('/:id', async (req, res) => {
  const faction = await Faction.findById(req.body.id)
  res.json(faction)
})

//Get all by campaignId
factionRouter.get('/byCampaignId/:id', async (req, res) => {
  const factions = await Faction.find({ campaign: req.params.id })
  res.json(factions)
})

//Get all
factionRouter.get('/all', async (req, res) => {
  const factions = await Faction.find({})
  res.json(factions)
})

factionRouter.post('/new', async (req, res) => {
  const { campaignId, title, factionType } = req.body

  if (!campaignId) {
    return res.status(401).json({
      error: `request missing data, request body: ${JSON.stringify(req.body)}`,
    })
  }

  const campaign = await Campaign.findById(campaignId)
  const newFaction = new Faction({
    campaign: campaign.id,
    title: title,
    factionType: factionType,
  })

  const faction = await newFaction.save()
  res.status(201).json(faction)
})

//Write next
factionRouter.put('/:id', async (req, res) => {
  // requestHistory.push({ id: req.params.id, body: req.body })
  const { id } = req.params
  const updatedFaction = await Faction.findByIdAndUpdate(id, req.body)
  res.status(200).json(updatedFaction)
  // console.log('requestHistory: ' + JSON.stringify(requestHistory))
})

factionRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  await Faction.findByIdAndDelete(id)
  res.status(204).end()
})

// Caution! removes all data
factionRouter.delete('/', async (req, res) => {
  await Faction.deleteMany()
  res.status(204).end()
})

module.exports = factionRouter
