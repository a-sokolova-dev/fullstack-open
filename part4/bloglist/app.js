const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./mongo')

const middleware = require('./utils/middleware')
const app = express()

const blogRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)


app.use(middleware.unknownEndpoint) 
app.use(middleware.errorHandler) 

module.exports = app
