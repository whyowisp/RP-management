const express = require('express')
const cors = require('cors')

const config = require('./utils/config')

const app = express()

//PORT in production (fly/heroku chooses) || PORT in local environment (falls to this unless defined in process.env)
const PORT = process.env.PORT || 4000

app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

// *** SERVER REQUESTS START ***

app.get('/api/noops', (req, res) => {
  res.send('<div>Say Hello to my little friend</div>')
})

// *** SERVER REQUESTS END ***

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

module.exports = app
