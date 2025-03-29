require('dotenv').config()
const mongoose = require('mongoose')
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')

const reset = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI)
    await Blog.deleteMany({})
    await User.deleteMany({})
    console.log('✅ All blogs and users deleted')
    await mongoose.connection.close()
  } catch (error) {
    console.error('Error resetting DB:', error)
  }
}

reset()
