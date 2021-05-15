const { Schema, model } = require('mongoose')

const User = new Schema({
  password: String,
  phone: { type: Number, unique: true, require: true },
  name: { type: String, require: true },
  role: { type: String, require: true }, // Компания / Человек
  desc: String,
  INN: Number,
  likes: Number,
  likedCompanies: [],
})

module.exports = model('User', User)
