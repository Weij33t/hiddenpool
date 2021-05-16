const User = require('../Models/User')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

class profileController {
  async desc(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Ошибка при сохранении описания', errors })
      }
      const { id, desc } = req.body
      await User.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        { $set: { desc } }
      )

      return res.json({
        desc,
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'error' })
    }
  }
}

module.exports = new profileController()
