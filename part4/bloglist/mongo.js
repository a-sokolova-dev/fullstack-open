const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose.set('strictQuery', false)
console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
})
