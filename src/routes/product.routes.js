const { Router } = require("express")
const controller = require('../controllers/product.controller.js')
// const onlyAdmin = require("../middlewares/onlyAdmin.js")

const router = new Router()

router.get('/', controller.index)
router.get('/:id', controller.show)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router