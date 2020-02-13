const { authenticateUser } = require('../helperFuncs/authenticateUser')
const express = require('express')
const router = express.Router()
const {
  createUser,
  updateUser,
  getUserById,
  getCourseByUser,
  getUsers,
  deleteUser
} = require('../controllers/userController')

// User Routes
// GET /api/users 200 - Returns the currently authenticated user

router.get('/users', authenticateUser, getUserById)
router.get('/userCourse', authenticateUser, getCourseByUser)

// POST /api/users 201 - Creates a user
router.post('/users', createUser)

module.exports = router
