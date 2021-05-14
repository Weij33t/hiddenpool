const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config')

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
  }
  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class likeController {
  async increase(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Ошибка при регистрации', errors })
      }
      const { likes, companyId, userId, isAdded } = req.body
      await User.findOne({ _id: userId }).exec(async (err, res) => {
        if (err) {
          throw new Error(err)
        }
        if (res) {
          const index = res.likedCompanies.indexOf(companyId)
          if (index === -1) {
            res.likedCompanies.push(companyId)
          } else {
            res.likedCompanies.splice(index, 1)
          }
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
      return res
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'error' })
    }
  }
}

module.exports = new likeController()
