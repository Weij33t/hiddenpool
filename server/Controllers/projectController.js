const Project = require('../Models/Project')
const { validationResult } = require('express-validator')

class likeController {
  async make(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при лайке', errors })
      }
      const { likes, companyId, name, desc } = req.body
      console.log(likes, companyId, name, desc)
      const candidate = await Project.findOne({ name })
      if (candidate) {
        console.log(1)
        return res.status(400).json({ message: 'Такой проект уже создан' })
      }
      const project = new Project({
        companyId,
        name,
        desc,
        likes,
      })
      await project.save()
      return res.json({ companyId, message: 'Проект успешно создан' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'error' })
    }
  }
}

module.exports = new likeController()
