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

test('blog objects use "id", not "_id"', async () => {
    const response = await api.get('/api/blogs')
  
    for (const blog of response.body) {
      assert.ok(blog.id, 'blog is missing "id"')
      assert.strictEqual(typeof blog.id, 'string')
      assert.strictEqual(blog._id, undefined, 'blog should not have "_id"')
    }
})  

test('a valid blog can be added', async () => {
    const newBlog = {
      title: "Test Blog",
      author: "Anna Sokolova",
      url: "http://example.com/test",
      likes: 9
    }
  
    const blogsAtStart = await Blog.find({})
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await Blog.find({})
    const titles = blogsAtEnd.map(b => b.title)
  
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
    assert.ok(titles.includes(newBlog.title))
})

test('blog without "likes" defaults to 0', async () => {
    const newBlog = {
      title: "No Likes Blog",
      author: "Anna Sokolova",
      url: "http://example.com/nolikes"
      // no "likes" field
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const savedBlog = response.body
    assert.strictEqual(savedBlog.likes, 0)
})

test('blog without title is rejected with 400', async () => {
    const newBlog = {
      author: "Anna Sokolova",
      url: "http://example.com/missingtitle",
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
  
  test('blog without url is rejected with 400', async () => {
    const newBlog = {
      title: "Missing URL Blog",
      author: "Anna Sokolova",
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await Blog.find({})
    const titles = blogsAtEnd.map(b => b.title)
  
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    assert.ok(!titles.includes(blogToDelete.title))
})  

test('a blog\'s likes can be updated', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]
  
    const updatedLikes = blogToUpdate.likes + 10
  
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ ...blogToUpdate.toJSON(), likes: updatedLikes })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(response.body.likes, updatedLikes)
  
    const updatedBlogInDb = await Blog.findById(blogToUpdate.id)
    assert.strictEqual(updatedBlogInDb.likes, updatedLikes)
})  
  
test.after(async () => {
  await mongoose.connection.close()
})
