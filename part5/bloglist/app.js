const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./mongo')

const middleware = require('./utils/middleware')
const app = express()

const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
const testingRouter = require('./controllers/testing')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

if (process.env.NODE_ENV === 'test') {
    app.use('/api/testing', testingRouter)
}
  
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
