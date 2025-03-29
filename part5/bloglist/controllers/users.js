const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/user')

const userRouter = express.Router()

userRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    if (!username || username.length < 3) {
      return response.status(400).json({
        error: 'username is required and must be at least 3 characters long'
      })
    }

    if (!password || password.length < 3) {
      return response.status(400).json({
        error: 'password is required and must be at least 3 characters long'
      })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return response.status(400).json({
        error: 'username must be unique'
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)

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
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
  response.json(users)
})

module.exports = userRouter
