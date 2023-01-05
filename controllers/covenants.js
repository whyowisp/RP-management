const covenantRouter = require('express').Router()
const Campaign = require('../models/campaign')

const { initializeCovenantData } = require('../utils/covenantDataInitializer')

covenantRouter.get('/:id', async (req, res) => {
  const covenant = await Covenant.findById(req.body.id)
  console.log(covenant)
  res.json(covenant)
})

covenantRouter.get('/', async (req, res) => {
  const covenants = await Covenant.find({})
  // console.log(Covenants)
  res.json(covenants)
})

//Get all by campaignId
covenantRouter.get('/byCampaignId/:id', async (req, res) => {
  const covenants = await Covenant.find({ campaign: req.params.id })
  res.json(covenants)
})

// Initializes and prefills new covenant document and returns it
covenantRouter.post('/new', async (req, res) => {
  const campaign = await Campaign.findById(req.body.campaignId)
  const covenant = await initializeCovenantData(campaign.id)

  // console.log(covenant)
  const newCovenant = await covenant.save()
  res.status(201).json(newCovenant)
})

covenantRouter.put('/:id', async (req, res) => {
  // requestHistory.push({ id: req.params.id, body: req.body })
  const { id } = req.params
  const updatedCovenant = await Covenant.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(200).json(updatedCovenant)
  // console.log('requestHistory: ' + JSON.stringify(requestHistory))
})

covenantRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  await Covenant.findByIdAndDelete(id)
  res.status(204).end()
})

// Caution! removes all data
covenantRouter.delete('/', async (req, res) => {
  await Covenant.deleteMany()
  res.status(204).end()
})

module.exports = covenantRouter
