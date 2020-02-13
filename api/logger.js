const { createLogger, format, transports } = require('winston')
const { combine, prettyPrint, json } = format

const logger = createLogger({
  format: combine(json(), prettyPrint()),
  transports: [
    new transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    }),
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      colorize: true
    })
  ],
  exitOnError: false
})

/* override console.log with winston logger: */
const log = console.log
console.log = function hijackedLog (level = 'debug') {
  if (arguments.length > 1 && level in this) {
    log.apply(this, arguments)
  } else {
    const args = Array.prototype.slice.call(arguments)
    args.unshift('debug')
    log.apply(this, args)
  }
}

module.exports = logger
module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message)
  }
}
