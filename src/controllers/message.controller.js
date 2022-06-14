// const { Message } = require('../models/index.js')
const ModelFactory = require('../factories/model.factory')
const Message = ModelFactory.getModel('message')
const { broadcast } = require('../services/io.js')
const logger = require('../services/logger')

class MessageController {

  async index(req, res) {
    try {
      const messages = await Message.getAll()
      res.json(messages)
    }
    catch (e) {
      logger.error({ label: 'message.controller', message: e.message })
      res.json({ error: e.message })
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params
      const message = await Message.getById(id)
      res.json(message)
    }
    catch (e) {
      logger.error({ label: 'message.controller', message: e.message })
      res.json({ error: e.message })
    }
  }

  async create(req, res) {
    try {
      const id = await Message.save({
        author: req.user.name,
        text: req.body.text
      })

      const message = await Message.getById(id)

      broadcast('message:create', message)

      res.json({ id })
    }
    catch (e) {
      logger.error({ label: 'message.controller', message: e.message })
      res.json({ error: e.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const { body } = req
      await Message.update(id, body)
      res.sendStatus(201)
    }
    catch (e) {
      logger.error({ label: 'message.controller', message: e.message })
      res.json({ error: e.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await Message.delete(id)
      res.sendStatus(200)
    }
    catch (e) {
      logger.error({ label: 'message.controller', message: e.message })
      res.json({ error: e.message })
    }
  }
}

module.exports = new MessageController()