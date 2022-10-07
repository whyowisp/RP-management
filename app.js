const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')

const { requestLogger, unknownEndpoint } = require('./utils/middleware')
const characterRouter = require('./controllers/characters')

// PORT in production (fly chooses) || PORT in local environment (falls to this unless defined in process.env)
const PORT = process.env.PORT || 4000

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

app.use('/api/characters', characterRouter)

app.use(unknownEndpoint)

module.exports = app
