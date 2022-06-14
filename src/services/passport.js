const LocalStrategy = require('passport-local')
const { login, signup } = require('../controllers/auth.controller')
const { User } = require('../models')

const initializePassportLocal = (passport) => {

  passport.use('login', new LocalStrategy({ usernameField: 'email' }, login))
  passport.use('signup', new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, signup))

  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    const { email, firstname, lastname, age, avatar, address, cellphone } = await User.getById(id)
    done(null, {
      id,
      email,
      name: `${firstname} ${lastname}`,
      firstname,
      lastname,
      age,
      avatar,
      address,
      cellphone
    })
  })
}

module.exports = {
  initializePassportLocal
}