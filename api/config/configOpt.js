require('dotenv').config()
module.exports = {
  port: process.env.PORT,
  db: process.env.MONGO_URL
}
