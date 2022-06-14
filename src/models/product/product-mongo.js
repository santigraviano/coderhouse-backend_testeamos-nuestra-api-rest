const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('mongodb') // require('../../containers/mongodb.js')

module.exports = class ProductMongo extends DB {
  constructor() {
    super('products', {
      name: String,
      description: String,
      code: String,
      image: String,
      price: Number,
      stock: { type: Number, default: 0 },
      timestamp: { type: Number, default: Date.now() }
    })
  }
}