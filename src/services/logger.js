const winston = require('winston')
const { combine, printf, timestamp, colorize } = winston.format

const customFormat = printf(msg => `${msg.timestamp} [${msg.label}] ${msg.level}: ${msg.message}`)

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      level: 'verbose',
      format: combine(colorize(), timestamp(), customFormat)
    }),
    new winston.transports.File({
      filename: './logs/warn.log',
      level: 'warn',
      format: combine(timestamp(), customFormat)
    }),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: combine(timestamp(), customFormat)
    })
  ]
})

module.exports = {
  log: (msg) => logger.info(msg),
  warn: (msg) => logger.warn(msg),
  error: (msg) => logger.error(msg),
  info: (msg) => logger.info(msg)
}