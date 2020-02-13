const mongoose = require('mongoose')
const logger = require('../logger')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: [
        5,
        'The value of path `{PATH}` is shorter than the minimum allowed length ({MINLENGTH}).'
      ]
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      }
    ]
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema, 'user')

User.on('index', err => {
  if (err) {
    logger.error('failed to create index')
    logger.error(err)
  }
})
module.exports = User

// SQL Code
// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     'User',
//     {
//       firstName: DataTypes.STRING,
//       lastName: DataTypes.STRING,
//       emailAddress: DataTypes.STRING,
//       password: DataTypes.STRING
//     },
//     {}
//   )
//   User.associate = models => {
//     User.hasMany(models.Course, {
//       as: 'user',
//       foreignKey: {
//         fieldName: 'userId',
//         allowNull: false
//       }
//     })
//   }
//   return User
// }
