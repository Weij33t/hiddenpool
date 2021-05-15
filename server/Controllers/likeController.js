const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config')

class likeController {
  async increase(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при лайке', errors })
      }
      const { likes, companyId, userId, likedCompanies } = req.body
      await User.findOne({ _id: userId }).exec(async (err, res) => {
        if (err) {
          throw new Error(err)
        }
        if (res) {
          res.likedCompanies = likedCompanies
          await res.save()
        }
      })
      await User.findOne({ _id: companyId }).exec(async (err, res) => {
        if (err) {
          throw new Error(err)
        }
        if (res) {
          res.likes = likes
          await res.save()
        }
      })
      return res.json({
        userId,
        companyId,
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'error' })
    }
  }
}

module.exports = new likeController()
