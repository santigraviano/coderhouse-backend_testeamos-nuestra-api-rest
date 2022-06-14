const { Router } = require("express")
const controller = require('../controllers/cart.controller.js')

const router = new Router()

router.post('/', controller.create)
router.delete('/:id', controller.delete)
router.get('/', controller.show)
router.post('/productos/:productId', controller.addProduct)
router.delete('/productos/:productId', controller.deleteProduct)

module.exports = router