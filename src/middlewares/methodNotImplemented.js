const logger = require('../services/logger')

const methodNotImplemented = (req, res, next) => {
  logger.warn({ label: 'route', message: `${req.method} ${req.path}` })
  res.json({ error: -2, description: `Ruta ${ req.originalUrl } metodo ${ req.method } no implementada.` })
}

module.exports = methodNotImplemented