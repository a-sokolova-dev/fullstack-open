const { test, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

let authToken = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'annas', passwordHash })
  await user.save()

  const loginRes = await api
    .post('/api/login')
    .send({ username: 'annas', password: 'sekret' })

  authToken = loginRes.body.token

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${authToken}`)
    .send({
      title: 'Initial Blog',
      author: 'Author',
      url: 'http://example.com',
      likes: 5,
    })
})

test('blogs are returned as json and correct number', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.statusCode, 200)
  assert.strictEqual(response.headers['content-type'].includes('application/json'), true)
  assert.strictEqual(response.body.length, 1)
})

test('blog objects use "id", not "_id"', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  assert.ok(blog.id)
  assert.strictEqual(blog._id, undefined)
})

test('a valid blog can be added with token', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'Tester',
    url: 'http://test.com',
    likes: 10,
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newBlog)

  assert.strictEqual(response.statusCode, 201)
  const blogsAtEnd = await api.get('/api/blogs')
  assert.strictEqual(blogsAtEnd.body.length, 2)
})

test('adding a blog without token returns 401', async () => {
  const newBlog = {
    title: 'Unauthorized Blog',
    author: 'No Auth',
    url: 'http://unauth.com',
    likes: 0,
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)

  assert.strictEqual(response.statusCode, 401)
})
