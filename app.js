const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')

const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middleware')
const characterRouter = require('./controllers/characters')
const playerRouter = require('./controllers/players')
const loginRouter = require('./controllers/login')
const campaignRouter = require('./controllers/campaigns')
const factionRouter = require('./controllers/factions')
const covenantRouter = require('./controllers/covenants')

// PORT in production (fly chooses) || PORT in local environment
// (falls to this unless defined in process.env)
// const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(cors())

app.use(requestLogger)
app.use(express.static('build'))

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use('/api/players', playerRouter)
app.use('/api/characters', characterRouter)
app.use('/api/login', loginRouter)
app.use('/api/campaigns', campaignRouter)
app.use('/api/factions', factionRouter)
app.use('/api/covenants', covenantRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
