const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const config = require('../config.js')
const logger = require('./logger')

const { protocol, user, pass, host, database, params } = config.mongo
const mongoUrl = `${protocol}://${user}:${pass}@${host}/${database}?${params}`

const initializeMongo = async () => {
  try {
    await mongoose.connect(mongoUrl)
    logger.log({ label: 'mongo-service', message: `Connected to ${mongoUrl}` })
  }
  catch(e) {
    logger.error({ label: 'mongo-service', message: e.message })
  }
}

const mongoStore = new MongoStore({
  mongoUrl
})

module.exports = {
  initializeMongo,
  mongoStore
}