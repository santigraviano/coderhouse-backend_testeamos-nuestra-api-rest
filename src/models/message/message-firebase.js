const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('firebase') // require('../../containers/firebase.js')

module.exports = class MessageFirebase extends DB {
  constructor() {
    super('messages')
  }
}