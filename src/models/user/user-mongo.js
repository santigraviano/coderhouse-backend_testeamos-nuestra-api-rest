const ContainerFactory = require('../../factories/container.factory')
const DB = ContainerFactory.getContainer('mongodb') //require('../../containers/mongodb.js')

module.exports = class UserMongo extends DB {
  constructor() {
    super('users', {
      email: String,
      password: String,
      firstname: String,
      lastname: String,
      address: String,
      age: Number,
      cellphone: String,
      avatar: String,
      timestamp: { type: Number, default: Date.now() }
    })
  }

  async getByEmail(email) {
    const user = await this.model.findOne({ email })
    return user
  }
}