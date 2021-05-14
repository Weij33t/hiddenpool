const Router = require('express')
const router = new Router()
const controller = require('../Controllers/profileController')

router.post('/desc', controller.desc)

module.exports = router
