const Router = require('express')
const router = new Router()
const controller = require('../Controllers/authController')
const { check } = require('express-validator')
const authMiddleware = require('../Middleware/authMiddleware')

router.post(
  '/signup',
  [
    check('name', 'Имя пользователя не может быть пустым').notEmpty(),
    check(
      'password',
      'Пароль должен быть больше 4 и меньше 10 символов'
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration
)
router.post('/login', controller.login)

module.exports = router
