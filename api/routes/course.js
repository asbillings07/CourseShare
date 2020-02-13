const express = require('express')
const router = express.Router()
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse
} = require('../controllers/courseController')
const { authenticateUser } = require('../helperFuncs/authenticateUser')
// Course Routes

// GET /courses 200 - Returns a list of courses (including the user that owns each course)
router.get('/courses', getAllCourses)

// GET /courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID
router.get('/courses/:id', getCourseById)

// POST /courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/courses', authenticateUser, createCourse)
// PUT /courses/:id 204 - Updates a course and returns no content
router.put('/courses/:id', authenticateUser, updateCourse)
// DELETE - courses/:id 204 - deletes a course. Careful, this can not be undone. Deletes a course and returns no content
// router.delete('/courses/:id', authenticateUser)
module.exports = router

/**
 * The PUT /api/courses/:id and DELETE /api/courses/:id routes return a 403 status code if the current user doesn't own the requested course
 */
