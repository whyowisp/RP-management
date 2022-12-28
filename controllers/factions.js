const factionRouter = require('express').Router()
const Faction = require('../models/faction')

factionRouter.get('/:id', async (req, res) => {
  const faction = await Faction.findById(req.body.id)
  console.log(faction)
  res.json(faction)
})

factionRouter.get('/', async (req, res) => {
  const campaigns = await Faction.find({}).populate('character')
  console.log(campaigns)
  res.json(campaigns)
})

factionRouter.post('/new', async (req, res) => {
  const { title, game, CampaignId } = req.body

  if (!title || !game || !CampaignId) {
    return res.status(401).json({
      error: `request missing data, request body: ${JSON.stringify(req.body)}`,
    })
  }

  const Campaign = await Campaign.findById(CampaignId)
  const newFaction = new Faction({
    campaign: Campaign.id,
    title: title,
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

/*
factionRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
  await Faction.findByIdAndDelete(id)
  res.status(204).end()
})
*/

// Caution! removes all data
factionRouter.delete('/', async (req, res) => {
  await Faction.deleteMany()
  res.status(204).end()
})

module.exports = factionRouter
