const Offer = require('../models/Offer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

class likeController {
  async send(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при заказе', errors })
      }
      const { name, phone, offerType, companyId } = req.body
      const offer = new Offer({
        name,
        phone,
        offerType,
        companyId,
      })
      await offer.save()
      return res.json({
        name,
        phone,
        offerType,
        companyId,
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'error' })
    }
  }
}

module.exports = new likeController()
