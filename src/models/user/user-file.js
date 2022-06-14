const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('file') //require('../../containers/file.js')

module.exports = class UserFile extends DB {
  constructor() {
    super('users')
  }
}