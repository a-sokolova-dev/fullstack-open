require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const Blog = require('./models/blog')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

app.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
