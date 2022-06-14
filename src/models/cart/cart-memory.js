const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('memory') // require('../../containers/memory.js')

module.exports = class CartMemory extends DB {
  constructor() {
    super()
  }
}