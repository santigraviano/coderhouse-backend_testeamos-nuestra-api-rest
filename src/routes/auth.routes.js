const router = require('express').Router()

const passport = require('passport')
const controller = require('../controllers/auth.controller.js')
const guestMiddleware = require('../middlewares/guest.js')
const authMiddleware = require('../middlewares/auth.js')
const multer = require('../services/multer')

router.get('/signup', guestMiddleware, controller.signupForm)
router.post('/signup', multer.upload.single('avatar'), passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/login', guestMiddleware, controller.loginForm)
router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

router.post('/logout', authMiddleware, controller.logout)

module.exports = router