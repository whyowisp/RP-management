const covenantRouter = require('express').Router()
const Covenant = require('../models/covenant')
const Campaign = require('../models/campaign')

const { initializeCovenantData } = require('../utils/covenantDataInitializer')

covenantRouter.get('/:id', async (req, res) => {
  const covenant = await Covenant.findById(req.body.id)
  console.log(covenant)
  res.json(covenant)
})

//Get (all) by CampaignId
covenantRouter.get('/byCampaignId/:id', async (req, res) => {
  const covenants = await Covenant.find({ campaign: req.params.id })
  res.json(covenants)
})

// Initializes and prefills new covenant document and returns it
covenantRouter.post('/new', async (req, res) => {
  const { campaignId, title } = req.body

  if (!campaignId) {
    return res.status(401).json({
      error: `request missing data, request body: ${JSON.stringify(req.body)}`,
    })
  }

  const campaign = await Campaign.findById(campaignId)
  const covenant = await initializeCovenantData(campaign.id, title)

  // console.log(covenant)
  const newCovenant = await covenant.save()
  res.status(201).json(newCovenant)
})

covenantRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const updatedCovenant = await Covenant.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(200).json(updatedCovenant)
})

covenantRouter.post('/newLab/:covenantId', async (req, res) => {
  const covenant = await Covenant.findById(req.params.covenantId)

  const updatedLaboratories = covenant.laboratories.concat({})
  console.log(covenant.id)
  const updatedCovenant = await Covenant.findByIdAndUpdate(
    covenant.id,
    {
      $set: { laboratories: updatedLaboratories },
    },
    {
      new: true,
    }
  )
  res.status(200).end()
})

//Update single yearly summary
covenantRouter.put('/:covenantId/:summaryId', async (req, res) => {
  const { covenantId, summaryId } = req.params
  const editedSummary = req.body

  //Which covenant
  const covenant = await Covenant.findById(covenantId)

  const editedSummaries = covenant.yearlySummaries.map((summary) =>
    summary._id.toString() === summaryId ? editedSummary : summary
  )

  const updatedCovenant = await Covenant.findByIdAndUpdate(
    covenantId,
    { $set: { yearlySummaries: editedSummaries } },
    {
      new: true,
    }
  )
  res.status(200).end()
})

//Update single laboratory
covenantRouter.put('/:covenantId/:labId', async (req, res) => {
  const { covenantId, labId } = req.params
  const editedLaboratory = req.body

  //Which covenant
  const covenant = await Covenant.findById(covenantId)

  const editedLabs = covenant.laboratories.map((lab) =>
    lab._id.toString() === labId ? editedLaboratory : lab
  )

  const updatedCovenant = await Covenant.findByIdAndUpdate(
    covenantId,
    { $set: { laboratories: editedLabs } },
    {
      new: true,
    }
  )
  res.status(200).end()
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
