//const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('GET tests', () => {
  test('GET request to root will return certain text', async () => {
    const res = await api.get('/api/noops')
    expect(res.text).toBe('<div>Say Hello to my little friend</div>')
  }, 5000)
})
/*
afterAll(() => {
  mongoose.connection.close()
})*/
