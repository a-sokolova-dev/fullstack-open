const express = require('express')
const cors = require('cors')
const Blog = require('./models/blog')
require('dotenv').config()
require('./mongo')

const middleware = require('./utils/middleware')
const app = express()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

app.post('/api/blogs', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/blogs/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.use(middleware.unknownEndpoint) 
app.use(middleware.errorHandler) 

module.exports = app
