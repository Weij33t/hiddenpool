const Router = require('express')
const router = new Router()
const controller = require('../Controllers/offerController')

router.post('/offer', controller.send)

module.exports = router
