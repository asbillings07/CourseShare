const mongoose = require('mongoose')
const logger = require('./logger')

// Models

const User = require('./models/User')
const Course = require('./models/Course')

module.exports = config => {
  const options = {
    server: {
      reconnectTries: Number.MAX_VALUE
    },
    useNewUrlParser: true,
    useCreateIndex: true
  }
  options.server.socketOptions = {
    keepAlive: 15000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000
  }

  const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URL, options)
  }

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', () => {
    logger.debug('Mongoose default connection open')
  })

  // If the connection throws an error
  mongoose.connection.on('error', err => {
    logger.debug('Mongoose default connection error: ' + err)
  })

  // When the connection is disconnected
  mongoose.connection.on('disconnected', event => {
    logger.debug('Mongoose default connection disconnected' + event)
    logger.debug('Reconnecting...')
    connectToDB()
  })

  connectToDB()
}
