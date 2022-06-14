const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('sql') // require('../../containers/sql.js')

module.exports = class ProductSQL extends DB {
  constructor() {
    super('products')
  }
}