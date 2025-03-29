const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/user')

const userRouter = express.Router()

userRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    if (!password || password.length < 3) {
      return response.status(400).json({
        error: 'password is required and must be at least 3 characters long'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = userRouter
