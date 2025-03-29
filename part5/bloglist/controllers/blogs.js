const express = require('express')

const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

const blogRouter = express.Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user

    const blog = new Blog({ ...request.body, user: user._id })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'unauthorized: only creator can delete' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes, user } = request.body

  const updatedBlog = {
    title,
    author,
    url,
    likes,
    user
  }

  try {
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlog,
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    ).populate('user', { username: 1, name: 1 })

    response.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
