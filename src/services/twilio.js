const twilio = require('twilio')
const config = require('../config')

class MessageSender {
  constructor() {
    this.client = twilio(config.twilio.sid, config.twilio.authToken)
  }

  async sendSMS(to, body, from=config.twilio.phoneNumber) {
    const response = await this.client.messages.create({ body, from, to })
  }

  async sendWhatsapp(to, body, from=`whatsapp:${config.twilio.whatsappNumber}`) {
    const response = await this.client.messages.create({ body, from, to: `whatsapp:${to}` })
  }
}

module.exports = new MessageSender()