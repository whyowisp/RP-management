require('express-async-errors')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Params: ', request.params)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = ({error, req, res, next}) => {
    console.log(error.message)

  if (error.name === 'CastError') return res.status(400).send({error: 'malformatted id'})
  if (error.name === 'ValidationError') return res.status(400).json({error: error.message })
  //Possible token error handling here

  next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }
