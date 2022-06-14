const nodemailer = require('nodemailer')
const config = require('../config')

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
        //host: 'smtp.ethereal.email',
        service: 'gmail',
        port: 587,
        auth: {
            user: config.mail.gmail.account,
            pass: config.mail.gmail.password//'dyrrpzfuvjFnbDUvQ7'
        }
    })
  }

  async send(to, subject, html, from="Notifications <no-reply@testing.com") {
    const response = await this.transporter.sendMail({ from, to, subject, html })
  }
}

module.exports = new MailSender()