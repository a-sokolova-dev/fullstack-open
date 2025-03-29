const test = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

test.beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password123', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test('creating a user with valid data succeeds', async () => {
  const newUser = {
    username: 'annas',
    name: 'Anna Sokolova',
    password: 'secret'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.username, newUser.username)

  const usersInDb = await User.find({})
  const usernames = usersInDb.map(u => u.username)
  assert.ok(usernames.includes(newUser.username))
})

test('creating a user without password fails with 400', async () => {
  const newUser = {
    username: 'noPassword'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  assert.match(response.body.error, /password/)
})

test('creating a user with short username fails with 400', async () => {
  const newUser = {
    username: 'an',
    password: 'validpass'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  assert.match(response.body.error, /username/)
})

test('creating a user with duplicate username fails with 400', async () => {
  const newUser = {
    username: 'root',
    password: 'anotherpass'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  assert.match(response.body.error, /unique/)
})

test.after(async () => {
  await mongoose.connection.close()
})
