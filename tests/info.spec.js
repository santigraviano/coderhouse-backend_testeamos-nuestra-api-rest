const autocannon = require('autocannon')
const { PassThrough } = require('stream')

const run = (url) => {
  const buffer = []
  const outputStream = new PassThrough()

  const instance = autocannon({
    url,
    connections: 100,
    duration: 20
  })

  autocannon.track(instance, { outputStream })

  outputStream.on('data', data => buffer.push(data))

  instance.on('done', () => {
    process.stdout.write(Buffer.concat(buffer))
  })
}

console.log('Running test...')

run('http://node:8080/info')
run('http://node:8080/info?console=1')