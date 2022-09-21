const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
  character: {
    type: String,
    minLength: 3,
  },
  player: {
    //Change to object id later (type: mongoose.Schema.Types.ObjectId, ref: 'Player')
    type: String,
  },
  saga: String,
  setting: String,
  currentYear: Number,
  house: String,
  size: Number,
  confidence: Number,
  decrepitude: {
    score: Number,
    effectsOfAging: [String],
  },
  descriptiveStats: [
    { stat: { type: String, default: 'Birth Name' }, description: String },
    { stat: { type: String, default: 'Year Born' }, description: String },
    { stat: { type: String, default: 'Gender' }, description: String },
    {
      stat: { type: String, default: 'Race/Nationality' },
      description: String,
    },
    { stat: { type: String, default: 'PlaceOfOrigin' }, description: String },
    { stat: { type: String, default: 'Religion' }, description: String },
    {
      stat: { type: String, default: 'Title/Profession' },
      description: String,
    },
    { stat: { type: String, default: 'Height' }, description: String },
    { stat: { type: String, default: 'Weight' }, description: String },
    { stat: { type: String, default: 'Hair' }, description: String },
    { stat: { type: String, default: 'Eyes' }, description: String },
    { stat: { type: String, default: 'Handedness' }, description: String },
  ],
  characteristics: [
    {
      stat: { type: String, default: 'Intelligence' },
      description: String,
      score: Number,
    },
    {
      stat: { type: String, default: 'Perception' },
      description: String,
      score: Number,
    },
    {
      stat: { type: String, default: 'Strength' },
      description: String,
      score: Number,
    },
    {
      stat: { type: String, default: 'Stamina' },
      description: String,
      score: Number,
    },
    {
      stat: { type: String, default: 'Presence' },
      description: String,
      score: Number,
    },
    {
      stat: { type: String, default: 'Communication' },
      description: String,
      score: Number,
    },
    {
      stat: { type: String, default: 'Dexterity' },
      description: String,
      score: Number,
    },
    {
      stat: { type: String, default: 'Quickness' },
      description: String,
      score: Number,
    },
  ],
})

module.exports = mongoose.model('Character', characterSchema)
