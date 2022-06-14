const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('sql') // require('../../containers/sql.js')

module.exports = class UserSQL extends DB {
  constructor() {
    super('users')
  }
}