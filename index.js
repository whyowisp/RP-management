const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('<div>Say Hello to my little friend</div>')
})

app.listen(port, () => {
  console.log(`Server running at ${port}/`)
})
