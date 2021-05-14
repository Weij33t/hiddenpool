const Router = require('express')
const router = new Router()
const controller = require('../Controllers/likeController')

router.post('/like', controller.increase)

module.exports = router
