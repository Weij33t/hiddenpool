const { Schema, model } = require('mongoose')

const Offer = new Schema({
  phone: Number,
  name: String,
  email: String,
  offerType: String,
  companyId: String,
})

module.exports = model('Offer', Offer)
