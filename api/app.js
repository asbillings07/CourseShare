// load modules
const express = require('express')
const cors = require('cors')
const logger = require('./logger')
const config = require('./config/configOpt')

require('./mongoose')(config)
// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true'

// create the Express app
const app = express()

// setup morgan which gives us http request logging
logger.debug("Overriding 'Express' logger")
app.use(require('morgan')('combined', { stream: logger.stream }))
// parse incoming JSON from req
app.use(express.json())
app.use(cors())
// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!'
  })
})
// routes
const userRoute = require('./routes/user')
const courseRoute = require('./routes/course')

// api routes
app.use('/api', userRoute)
app.use('/api', courseRoute)

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found'
  })
})

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`)
  }

  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  })
})

// set our port
const port = config.port
// start listening on our port
app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`)
})
