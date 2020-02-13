const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('../helperFuncs/asyncHandler')

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).exec()
  res.status(200).send({ users })
})

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.currentUser
  const user = await User.findOne({ _id: id }).exec()
  res.status(200).send({ user })
})

const getCourseByUser = asyncHandler(async (req, res) => {
  const { id } = req.currentUser
  const user = await User.findById(id).populate('courses')
  res.send(user)
})

const createUser = asyncHandler(async (req, res) => {
  const newUser = req.body
  newUser.password = bcryptjs.hashSync(newUser.password)
  const user = await User.create(newUser)
  res.status(200).json({ user })
})

const updateUser = asyncHandler(async (req, res) => {
  const userUpdates = res.body

  const user = new User(userUpdates)
  const savedUser = await user.save()
  res.status(200).send({ savedUser })
})

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body
  await User.remove({ _id: id })
  res.status(204).send({ message: 'user has been deleted' })
})

module.exports = {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getCourseByUser
}
