const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('memory')//require('../../containers/memory.js')

module.exports = class UserMemory extends DB {
  constructor() {
    super()
  }
}