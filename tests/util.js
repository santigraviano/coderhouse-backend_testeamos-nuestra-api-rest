const faker = require('faker')

const createProduct = () => ({
  name: faker.commerce.productName(),
  code: 'SDJ898',
  description: faker.commerce.productDescription(),
  image: 'https://como-funciona.co/wp-content/uploads/2018/10/como-funciona-una-guitarra-electrica.jpg',
  price: faker.commerce.price(),
})

module.exports = createProduct