const args = require('../services/args')
const os = require('os')
const logger = require('../services/logger')
const mailer = require('../services/nodemailer')
const twilio = require('../services/twilio')
const config = require('../config')
// const { Cart } = require('../models')
const ModelFactory = require('../factories/model.factory')

class MainController {
  index(req, res) {
    const { user } = req
    res.render('index', { user })
  }

  async cart(req, res) {
    const { user } = req
    const Cart = ModelFactory.getModel('cart')
    const cart = await Cart.getByUserId(req.user.id)
    res.render('cart', { user, cart })
  }

  profile(req, res) {
    const { user } = req
    res.render('profile', { user })
  }

  async order(req, res) {
    const Cart = ModelFactory.getModel('cart')
    const cart = await Cart.getByUserId(req.user.id)

    let html = `
      <p><b>Nombre: </b><span>${req.user.name}</span></p>
      <p><b>Correo electrónico: </b><span>${req.user.email}</span></p>
      <p><b>Dirección: </b><span>${req.user.address}</span></p>
      <h3>Productos</h3>
      <ul>
    `

    cart.products.forEach(product => {
      html += `<li>${product.name}</li>`
    })

    html += '</ul>'

    await mailer.send(config.admin.email, `Nuevo pedido de ${req.user.name} - ${req.user.email}`, html)
    await twilio.sendWhatsapp(config.admin.phone, `Nuevo pedido de ${req.user.name} - ${req.user.email}`)

    await twilio.sendSMS(req.user.cellphone, 'Su pedido esta siendo procesado')

    await Cart.empty(cart._id)

    res.status(200)
  }

  success(req, res) {
    const { user } = req
    res.render('order', { user })
  }

  info(req, res) {
    const info = {
      args: JSON.stringify(args, null, 2),
      execPath: process.execPath,
      platform: process.platform,
      pid: process.pid,
      version: process.version,
      projectPath: process.cwd(),
      rss: JSON.stringify(process.memoryUsage(), null, 2),
      cpus: os.cpus().length
    }
    
    if (req.query.console) {
      logger.log({ label: 'main-controller', message: JSON.stringify(info, null, 2) })
    }

    res.render('info', { info })
  }

  randoms(req, res) {
    const quantity = req.query.cant || 100000000
    const min = 1
    const max = 1000

    let randoms = {}

    for (let i = 0; i < quantity; i++) {
      const number = Math.floor(Math.random() * (max - min) + min)

      if (number in randoms) {
        randoms[number] += 1
      }
      else {
        randoms[number] = 1
      }
    }

    res.send(randoms)
  }
}

module.exports = new MainController()