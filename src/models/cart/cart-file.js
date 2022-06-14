const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('file') // require('../../containers/file.js')

module.exports = class CartFile extends DB {
  constructor() {
    super('carts')
  }
}