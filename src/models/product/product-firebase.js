const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('firebase') // require('../../containers/firebase.js')

module.exports = class ProductFirebase extends DB {
  constructor() {
    super('products')
  }
}