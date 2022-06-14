//const { Product } = require('../models/index.js')
const ModelFactory = require('../factories/model.factory')
const Product = ModelFactory.getModel('product')

const { broadcast } = require('../services/io.js')
const logger = require('../services/logger')

class ProductController {

  async index(req, res) {
    try {
      const products = await Product.getAll()
      res.json(products)
    }
    catch (e) {
      logger.error({ label: 'product-controller', message: e.message })
      res.json({ error: e.message })
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params
      const product = await Product.getById(id)
      res.json(product)
    }
    catch (e) {
      logger.error({ label: 'product-controller', message: e.message })
      res.json({ error: e.message })
    }
  }

  async create(req, res) {
    try {
      const { body } = req
      const id = await Product.save(body)

      broadcast('product:create', body)

      res.json({ id })
    }
    catch (e) {
      logger.error({ label: 'product-controller', message: e.message })
      res.json({ error: e.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const { body } = req
      await Product.update(id, body)
      res.sendStatus(201)
    }
    catch (e) {
      logger.error({ label: 'product-controller', message: e.message })
      res.json({ error: e.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await Product.delete(id)
      res.sendStatus(200)
    }
    catch (e) {
      logger.error({ label: 'product-controller', message: e.message })
      res.json({ error: e.message })
    }
  }
}

module.exports = new ProductController()