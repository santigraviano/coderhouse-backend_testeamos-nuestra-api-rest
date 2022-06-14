// const { Product } = require('../models')
// const { Cart } = require('../models')
const ModelFactory = require('../factories/model.factory')
const Cart = ModelFactory.getModel('cart')

class CartController {

  async create(req, res) {
    try {
      const id = await Cart.save({ products: [] })
      res.json({ id })
    }
    catch (e) {
      console.error(e.message, e.stack)
      res.json({ error: e.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await Cart.delete(id)
      res.sendStatus(200)
    }
    catch (e) {
      console.error(e.message, e.stack)
      res.json({ error: e.message })
    }
  }

  async show(req, res) {
    try {
      const cart = await Cart.getByUserId(req.user.id)
      res.json(cart)
    }
    catch (e) {
      console.error(e.message, e.stack)
      res.json({ error: e.message })
    }
  }

  async addProduct(req, res) {
    try {
      const { productId } = req.params
      const { _id, products } = await Cart.getByUserId(req.user.id)

      const Product = ModelFactory.getModel('product')

      const product = await Product.getById(productId)

      products.push(product)

      await Cart.update(_id, { products })
      res.sendStatus(201)
    }
    catch (e) {
      console.error(e.message, e.stack)
      res.json({ error: e.message })
    }
  }

  async deleteProduct(req, res) {
    try {
      const { productId } = req.params
      const { _id, products } = await Cart.getByUserId(req.user.id)
      const index = products.findIndex(i => i._id == productId)

      console.log(productId, index)
      
      if (index == -1) {
        res.json({ error: 'Product not found' })
      }

      products.splice(index, 1)

      await Cart.update(_id, { products })
      res.sendStatus(200)
    }
    catch (e) {
      console.error(e.message, e.stack)
      res.json({ error: e.message })
    }
  }
}

module.exports = new CartController()