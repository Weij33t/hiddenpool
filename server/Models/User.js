const { Schema, model } = require('mongoose')

const User = new Schema({
  password: String,
  name: { type: String, unique: true, require: true },
  role: { type: String, require: true }, // Компания / Человек
  desc: String,
  INN: Number,
  likes: Number,
  likedCompanies: [],
})

module.exports = model('User', User)
