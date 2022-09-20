const express = require('express')

const app = express()
const port = 4000

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('<div>Say Hello to my little friend</div>')
})

app.listen(port, () => {
  console.log(`Server running at ${port}/`)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
