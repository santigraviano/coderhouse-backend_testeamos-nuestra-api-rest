const bcrypt = require('bcrypt')
// const { User, Cart } = require('../models')
const ModelFactory = require('../factories/model.factory')
const User = ModelFactory.getModel('user')
const mailer = require('../services/nodemailer')
const config = require('../config')

class AuthController {

  signupForm(req, res) {
    res.render('auth/signup')
  }

  async signup(req, email, password, done) {
    try {
      const { firstname, lastname, address, age, cellphone } = req.body

      password = await bcrypt.hash(password, 10)

      const avatar = req.file.filename

      const id = await User.save({
        firstname,
        lastname,
        address,
        age,
        cellphone,
        email,
        password,
        avatar
      })

      const Cart = ModelFactory.getModel('cart')

      await Cart.save({ userId: id, products: [] })

      let html = `
        <p><b>Nombre: </b><span>${firstname} ${lastname}</span></p>
        <p><b>Correo electrónico: </b><span>${email}</span></p>
        <p><b>Dirección: </b><span>${address}</span></p>
        <p><b>Edad: </b><span>${age}</span></p>
        <p><b>Teléfono: </b><span>${cellphone}</span></p>
      `

      await mailer.send(config.admin.email, `Nuevo registro`, html)

      done(null, {
        id
      })
    }
    catch (err) {
      done(err)
    }
  }

  loginForm(req, res) {
    res.render('auth/login')
  }

  async login(email, password, done) {
    try {
      const user = await User.getByEmail(email)

      if (!user) {
        return done(null, false, { message: 'El usuario no existe.' })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if(!passwordMatch) {
        return done(null, false, { message: 'Contraseña incorrecta.' })
      }

      done(null, user)
    }
    catch(err) {
      done(err)
    }
  }

  logout(req, res) {
    const { user } = req
    req.logout()
    res.json(user)
  }

  uploadAvatar(req, res) {
    res.send('filename')
  }
}

module.exports = new AuthController()