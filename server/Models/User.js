const { Schema, model } = require('mongoose')

const User = new Schema({
  password: String,
  name: { type: String, unique: true },
  desc: String,
  email: String,
  INN: Number,
  likes: Number,
})

module.exports = model('User', User)
