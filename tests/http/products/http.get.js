const http = require('http')

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/productos',
  method: 'get'
}

const req = http.request(options, (res) => {
  console.log(res)

  res.on('data', (data) => {
    process.stdout.write(data)
  })
})

req.on('error', e => console.log(e))

req.end()