const axios = require('axios')
const createProduct = require('../../util')

const PRODUCTS_URL = 'http://localhost:8080/api/productos'

async function main() {
  
  // GET ALL
  try {
    const response = await axios.get(PRODUCTS_URL)
    console.log(response.status)
    console.log(response.data[0])
  }
  catch (e) {
    console.log(e)
  }

  // CREATE
  try {
    const product = createProduct()
    const response = await axios.post(PRODUCTS_URL, product)
    console.log(response.status)

    const { data } = await axios.get(PRODUCTS_URL)
    console.log(data[data.length - 1].name, product.name)
  }
  catch (e) {
    console.log(e)
  }

  // UPDATE
  try {
    const product = createProduct()
    const beforeProducts = await axios.get(PRODUCTS_URL)
    const id = beforeProducts.data[beforeProducts.data.length - 1]._id
    
    const response = await axios.put(`${PRODUCTS_URL}/${id}`, product)
    console.log(response.status)

    const afterProducts = await axios.get(PRODUCTS_URL)
    console.log(afterProducts.data[afterProducts.data.length - 1].name, product.name)
  }
  catch (e) {
    console.log(e)
  }

  // DELETE
  try {
    const beforeProducts = await axios.get(PRODUCTS_URL)
    const id = beforeProducts.data[beforeProducts.data.length - 1]._id
    
    const response = await axios.delete(`${PRODUCTS_URL}/${id}`)
    console.log(response.status)

    const afterProducts = await axios.get(PRODUCTS_URL)
    console.log(afterProducts.data.length, beforeProducts.data.length)
  }
  catch (e) {
    console.log(e)
  }
}

main()