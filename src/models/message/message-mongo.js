const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('mongodb') // require('../../containers/mongodb.js')

module.exports = class MessageMongo extends DB {
  constructor() {
    super('messages', {
      author: String,
      text: String,
      timestamp: { type: Number, default: Date.now() }
    })
  }
}