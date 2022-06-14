const { Router } = require('express')
const controller = require('../controllers/main.controller.js')
const authMiddleware = require('../middlewares/auth.js')
const compression = require('compression')

const router = new Router()

router.get('/', authMiddleware, controller.index)
router.get('/carrito', authMiddleware, controller.cart)
router.get('/mi-cuenta', authMiddleware, controller.profile)
router.post('/send-order', authMiddleware, controller.order)
router.get('/success', authMiddleware, controller.success)
router.get('/info', controller.info)
router.get('/info-with-compression', compression(), controller.info)
router.get('/api/randoms', controller.randoms)

module.exports = router