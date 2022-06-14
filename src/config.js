module.exports = {
  file: {
    path: './_db/file'
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },
  sqlite: {
    filename: './_db/sqlite/ecommerce.sqlite',
  },
  mongo: {
    protocol: process.env.MONGO_PROTOCOL,
    host: process.env.MONGO_HOST,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DATABASE,
    params: process.env.MONGO_PARAMS
  },
  firebase: {
    credential: process.env.FIREBASE_CREDENTIAL_FILE,
    databaseURL: process.env.FIREBASE_DATABASE_URL
  },
  session: {
    maxAge: 600000
  },
  mail: {
    gmail: {
      account: process.env.GMAIL_APP_ACCOUNT,
      password: process.env.GMAIL_APP_PASSWORD
    }
  },
  twilio: {
    sid: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
    whatsappNumber: process.env.TWILIO_WP_NUMBER
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    phone: process.env.ADMIN_PHONE
  }
}