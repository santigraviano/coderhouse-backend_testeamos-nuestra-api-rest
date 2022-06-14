const http = require('http')
const createProduct = require('../util')

const data = JSON.stringify(createProduct())

const id = '624735f5bb7a1476af61868b'

const options = {
  hostname: 'localhost',
  port: 8080,
  path: `/api/productos/${id}`,
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
    'content-length': data.length,
  },
}

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`)

  res.on('data', (data) => {
    process.stdout.write(data)
  })
})

req.on('error', (e) => console.log(e))

req.write(data)
req.end()
