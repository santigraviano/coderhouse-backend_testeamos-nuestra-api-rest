const http = require('http')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const flash = require('express-flash')
const config = require('./config.js')
const { mongoStore } = require('./services/mongo')
const { redisStore } = require('./services/redis')
const { initializePassportLocal } = require('./services/passport.js')
const routesLogger = require('./middlewares/routesLogger')
const methodNotImplemented = require('./middlewares/methodNotImplemented.js')
const messageRoutes = require('./routes/message.routes.js')
const productRoutes = require('./routes/product.routes.js')
const cartRoutes = require('./routes/cart.routes.js')
const authRoutes = require('./routes/auth.routes.js')
const mainRoutes = require('./routes/main.routes.js')

const app = express()
const server = http.createServer(app)

// View engine
app.set('views', './src/views')
app.set('view engine', 'pug')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('src/public'))
app.use('/storage', express.static('src/storage/public'))
app.use(routesLogger)

// Session
const sessionParams = {
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: config.session.maxAge,
  }
}

if (process.env.SESSION_DRIVER === 'mongo') {
  sessionParams.store = mongoStore
}

if (process.env.SESSION_DRIVER === 'redis') {
  sessionParams.store = redisStore
}

app.use(cookieParser('secret shh'))
app.use(session(sessionParams))

// Passport
initializePassportLocal(passport)
app.use(flash((passport)))
app.use(passport.initialize())
app.use(passport.session())

// Kill a process
app.get('/kill', (req, res) => {
  res.send(`Process #${process.pid} killed`)
  return process.exit()
})

// Routes
app.use('/api/mensajes', messageRoutes)
app.use('/api/productos', productRoutes)
app.use('/api/carrito', cartRoutes)

app.use('/', authRoutes)
app.use('/', mainRoutes)

app.use(methodNotImplemented)

module.exports = {
  app,
  server
}