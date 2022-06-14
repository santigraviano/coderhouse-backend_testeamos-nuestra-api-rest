const supertest = require('supertest')
const expect = require('chai').expect
const createProduct = require('../util')

const URL = 'http://localhost:8080'

describe('Products', () => {
  const agent = supertest(URL)

  it('should retrieve all products', async () => {
    const response = await agent.get('/api/productos')

    expect(response.status).to.equal(200)
  })

  it('should create a new product', async () => {
    const product = createProduct()
    const response = await agent.post('/api/productos').send(product)
    const products = await agent.get('/api/productos')

    expect(response.status).to.equal(200)
    expect(products.body[products.body.length - 1].name).to.equal(product.name)
  })

  it('should edit a product', async () => {
    const newData = createProduct()
    const beforeProducts = await agent.get('/api/productos')

    const id = beforeProducts.body[0]._id
    
    const response = await agent.put(`/api/productos/${id}`).send(newData)
    
    const afterProducts = await agent.get('/api/productos')

    expect(response.status).to.equal(201)
    expect(afterProducts.body[0].name).to.equal(newData.name)
  })

  it('should delete a product', async () => {
    const beforeProducts = await agent.get('/api/productos')

    const id = beforeProducts.body[beforeProducts.body.length - 1]._id
    
    const response = await agent.delete(`/api/productos/${id}`)
    
    const afterProducts = await agent.get('/api/productos')

    expect(response.status).to.equal(200)
    expect(afterProducts.body.length + 1).to.equal(beforeProducts.body.length)
  })
})