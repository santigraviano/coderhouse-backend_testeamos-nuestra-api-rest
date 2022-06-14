const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('memory') // require('../../containers/memory.js')

module.exports = class MessageMemory extends DB {
  constructor() {
    super()
  }
}