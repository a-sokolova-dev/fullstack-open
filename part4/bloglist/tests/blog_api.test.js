const test = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "Blog A",
    author: "Author A",
    url: "http://example.com/a",
    likes: 3
  },
  {
    title: "Blog B",
    author: "Author B",
    url: "http://example.com/b",
    likes: 7
  }
]

test.beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json and correct number', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test.after(async () => {
  await mongoose.connection.close()
})
