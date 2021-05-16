const User = require('../Models/User')
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
      const { phone, password, INN, role, name } = req.body
      const candidate = await User.findOne({ phone })
      if (candidate) {
        return res
          .status(400)
          .json({
            message: 'Компания с таким номером телефона уже зарегистрирована',
          })
      }

      if (!INN && role === 'Компания') {
        return res.status(400).json({ message: 'Укажите INN' })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = new User({
        phone,
        name,
        password: hashPassword,
        desc: '',
        INN,
        likes: 0,
        role,
      })
      await user.save()
      return res.json({ message: 'Пользователь успешно зарегистрирован' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Registration error' })
    }
  }

  async login(req, res) {
    try {
      const { name, password, INN, role, phone } = req.body
      const user = await User.findOne({ phone, name })
      if (!user) {
        return res.status(400).json({
          message: `${
            role === 'Компания' ? 'Компания' : 'Пользователь'
          } ${name} не найден${role === 'Компания' ? 'а' : ''}`,
        })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` })
      }
      if (INN !== user.INN && user.role === 'Компания') {
        return res.status(400).json({ message: `Введен неверный INN` })
      }
      const token = generateAccessToken(user._id)
      return res.json({
        token,
        name: user.name,
        desc: user.desc,
        role: user.role,
        likes: user.likes,
        likedCompanies: user.likedCompanies,
        _id: user._id,
      })
    } catch (e) {
      res.status(400).json({ message: 'Login error' })
    }
  }
}

module.exports = new authController()
