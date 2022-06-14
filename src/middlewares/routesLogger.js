const logger = require('../services/logger')

module.exports = (req, res, next) => {
  logger.log({ label: 'route', message: `${req.method} ${req.path}` })
  next()
}