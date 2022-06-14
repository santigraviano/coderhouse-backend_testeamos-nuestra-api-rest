const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('file') // require('../../containers/file.js')

module.exports = class MessageFile extends DB {
  constructor() {
    super('messages')
  }
}