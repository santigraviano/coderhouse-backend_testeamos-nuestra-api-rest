const memoryContainer = require('../containers/memory')
const fileContainer = require('../containers/file')
const sqlContainer = require('../containers/sql')
const mongodbContainer = require('../containers/mongodb')
const firebaseContainer = require('../containers/firebase')

class ContainerFactory {
  static getContainer(container) {
    switch (container) {
      case 'memory':
        return memoryContainer
      case 'file':
        return fileContainer
      case 'sql':
        return sqlContainer
      case 'mongodb':
        return mongodbContainer
      case 'firebase':
        return firebaseContainer
    }
  }
}

module.exports = ContainerFactory