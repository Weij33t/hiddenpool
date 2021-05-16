const Router = require('express')
const router = new Router()
const controller = require('../Controllers/projectController')

router.post('/project', controller.make)

module.exports = router
