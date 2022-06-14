const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('firebase') // require('../../containers/firebase.js')

module.exports = class CartFirebase extends DB {
  constructor() {
    super('carts')
  }
}