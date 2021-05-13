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

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Ошибка при регистрации', errors })
      }
      const { name, password, INN } = req.body
      const candidate = await User.findOne({ name })
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Компания с таким названием уже зарегистрировать' })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = new User({
        name,
        password: hashPassword,
        desc: '',
        INN,
      })
      await user.save()
      return res.json({ message: 'Пользователь успешно зарегистрирован' })
    } catch (e) {
      res.status(400).json({ message: 'Registration error' })
    }
  }

  async login(req, res) {
    try {
      const { name, password, INN } = req.body
      const user = await User.findOne({ name })
      if (!user) {
        return res.status(400).json({ message: `Компания ${name} не найдена` })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` })
      }
      if (INN !== user.INN) {
        return res.status(400).json({ message: `Введен неверный INN` })
      }
      const token = generateAccessToken(user._id)
      return res.json({
        token,
        name: user.name,
        desc: user.desc,
        _id: user._id,
      })
    } catch (e) {
      res.status(400).json({ message: 'Login error' })
    }
  }
}

module.exports = new authController()
