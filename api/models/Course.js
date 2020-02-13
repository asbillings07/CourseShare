'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logger = require('../logger')

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    materialsNeeded: { type: Array, required: true },
    estimatedTime: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const Course = mongoose.model('Course', courseSchema, 'course')

Course.on('index', err => {
  if (err) {
    logger.error('failed to create index')
    logger.error(err)
  }
})

module.exports = Course

// SQL CODE
// module.exports = (sequelize, DataTypes) => {
//   const Course = sequelize.define(
//     'Course',
//     {
//       userId: {
//         type: DataTypes.INTEGER,
//         validate: {
//           notEmpty: {
//             msg: 'User must be present'
//           }
//         }
//       },
//       title: {
//         type: DataTypes.STRING,
//         validate: {
//           notEmpty: {
//             msg: 'Course Title Required'
//           }
//         }
//       },
//       description: {
//         type: DataTypes.TEXT,
//         validate: {
//           notEmpty: {
//             msg: 'Course Description Required'
//           }
//         }
//       },
//       estimatedTime: DataTypes.STRING,
//       materialsNeeded: DataTypes.STRING
//     },
//     {}
//   )
//   Course.associate = models => {
//     Course.belongsTo(models.User, {
//       as: 'user',
//       foreignKey: {
//         fieldName: 'userId',
//         allowNull: false
//       }
//     })
//   }
//   return Course
// }
