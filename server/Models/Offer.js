const { Schema, model } = require('mongoose')
const User = require('./User')

const Offer = new Schema({
  phone: Number,
  email: String,
  offerType: String,
  companyId: String,
})

module.exports = model('Offer', Offer)
