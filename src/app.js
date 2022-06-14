require('dotenv/config')
const cluster = require('cluster')
const args = require('./services/args')
const { server } = require('./server.js')
const logger = require('./services/logger')
const { connectIO } = require('./services/io.js')
const { initializeMongo } = require('./services/mongo.js')
const { initializeRedis } = require('./services/redis')

const start = async () => {
  if (process.env.DB === 'mongo' || process.env.SESSION_DRIVER === 'mongo') {
    await initializeMongo()
  }

  if (process.env.SESSION_DRIVER === 'redis') {
    await initializeRedis()
  }

  connectIO(server)

  const PORT = process.env.PORT || args.port || 8080

  server.listen(PORT, () => {
    logger.log({ label: 'app', message: `Worker with pid ${process.pid} listening to port ${ PORT }` })
  })
}

if (args.mode == 'cluster' && cluster.isPrimary) {
  logger.log({ label: 'app', message: `Master #${process.pid} is running` })

  const cpus = require('os').cpus().length

  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }

  let killedProcesses = 0
  cluster.on('exit', (worker, code, signal) => {
    logger.log({ label: 'app', message: `Worker ${worker.process.pid} died with code ${code}` })
    killedProcesses += 1

    if (killedProcesses == cpus) {
      process.exit()
    }
  })
}
else {
  start()
}