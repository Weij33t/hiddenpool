const { Schema, model } = require('mongoose')

const Project = new Schema({
  companyId: String,
  name: String,
  desc: String,
  likes: Number,
})

module.exports = model('Project', Project)
