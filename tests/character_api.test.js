const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('../utils/test_helper')
const Character = require('../models/character')

const api = supertest(app)

describe('standard GET tests', () => {
  beforeEach(async () => {
    await Character.deleteMany({})
    const characterObjects = helper.characters.map(
      (character) => new Character(character),
    )
    await Character.bulkSave(characterObjects)
  })
  test('All characters are returned', async () => {
    const response = await api.get('/api/characters')
    expect(response.body).toHaveLength(2)
  })
})

describe('POST tests', () => {
  test('Character can be saved', async () => {
    const character = helper.characters[0]
    await api
      .post('/api/characters')
      .set('Content-type', 'application/json')
      .send(character)
      .expect(201)
  })
  test('New character is created and returned', async () => {
    const res = await api
      .post('/api/characters/new')
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const characteristic = res.body.characteristics.find(
      (c) => c === 'Intelligence',
    )
    expect(characteristic).toContain('Intelligence')
  })
})

describe('PUT tests', () => {
  beforeEach(async () => {
    await Character.deleteMany({})
    const characterObjects = helper.characters.map(
      (character) => new Character(character),
    )
    await Character.bulkSave(characterObjects)
  })
  test('editing property succeeds with code 200', async () => {
    const id = await helper.getId()
    const editedProperty = { setting: 'edited setting value' }
    api
      .put(`/api/characters/:${id}`)
      .set('Content-type', 'application/json')
      .send(editedProperty)
      .expect(200)
  })
  test('editing nested property succeeds', async () => {
    const id = await helper.getId()
    const data = {
      decrepitude: {
        score: 2,
        effectsOfAging: ['his back has began hunching'],
      },
    }
    api
      .put(`/api/characters/:${id}`)
      .set('Content-type', 'application/json')
      .send(data)
      .expect(201)
  })
  // This test doesn't work yet. It passes but i know it´s shouldn't
  test('editing non-existing property returns 405', async () => {
    const id = await helper.getId()
    api
      .put(`/api/characters/:${id}`)
      .set('Content-type', 'application/json')
      .send({
        foo: 'bar',
      })
      .expect(405)
  })
})

describe('DELETE tests', () => {
  test('deleting resource returns 204', async () => {
    const id = helper.getId()
    api.delete(`/api/characters/:${id}`).expect(204)
  })
})
afterAll(() => {
  mongoose.connection.close()
})
