const models = require('../models/index.js')

class ModelFactory {
  static getModel(model) {
    switch (model) {
      case 'user':
        return models.User
      case 'message':
        return models.Message
      case 'product':
        return models.Product
      case 'cart':
        return models.Cart
    }
  }
}

module.exports = ModelFactory