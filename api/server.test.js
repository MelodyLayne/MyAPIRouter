const server = require('./server')
const request = require('supertest')
const bcrypt = require('bcryptjs')
const db = require('../data/dbConfig')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../api/secrets')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
  await db('users')
    .insert([
      {
        "username": "steve",
        "password": "$2a$08$agGThXzsmeCp0M9kGGLGvOJ6TqbO.1V0oDq/hZR4P4kggin6O9ptq",
      },
      {
        "username": "steven",
        "password": "$2a$08$Yp5KV..j1jgbaDUuLjt0COmV7/YyRHc/w1kDKykikSig2FQh3OMOO",
      },
      {
        "username": "stevie",
        "password": "$2a$08$r0qBJDxYUDvElFf2r42Ymul8BRGCIbvRc9l.RFqBlaGoOi1Ytc.CO",
      }
    ])
})

afterAll(async () => {
  await db.destroy()
})

describe('POST /register', () => {
  test('on successful register, responds with status of 201', async () => {
    const res = await request(server).post('/api/auth/register').send({username: 'joe', password: "1234"})
    expect(res.status).toBe(201)
  })
  test('on successful register, responds with username and id', async () => {
    const res = await request(server).post('/api/auth/register').send({username: 'joe', password: "1234"})
    const users = await db('users')
    const user = await db('users').where('id', 4).first()
    expect(user).toMatchObject({username: 'joe', id: 4})
    expect(res.status).toBe(201)
    expect(users).toHaveLength(4)
  })
  test('on successful register, user array length is increased by one', async () => {
    await request(server).post('/api/auth/register').send({username: 'joe', password: "1234"})
    const users = await db('users')
    expect(users).toHaveLength(4)
  })
  test('if username is already in database, responds with status of 401 and user is not created', async () => {
    const res = await request(server).post('/api/auth/register').send({username: 'steve'})
    const users = await db('users')
    expect(res.status).toBe(401)
    expect(users).toHaveLength(3)
  })
  test('if username is already in database, responds with "username taken" message', async () => {
    const res = await request(server).post('/api/auth/register').send({username: 'steve'})
    const users = await db('users')
    expect(res.body.message).toBe('username taken')
  })
})

describe('POST /login', () => {
  test('on successful login, returns status 200', async () => {
    const res = await request(server).post('/api/auth/login').send({username: 'steve', password: '1234'})
    expect(res.status).toBe(200)
  })
  test('on successful login, returns welcome message', async () => {
    const res = await request(server).post('/api/auth/login').send({username: 'steve', password: '1234'})
    expect(res.body.message).toBe('welcome, steve')
  })
  test('if username is invalid, responds with status 401', async () => {
    const res = await request(server).post('/api/auth/login').send({username: ''})
    expect(res.status).toBe(401)
  })
  test('if username is invalid, responds with "invalid credentials" message', async () => {
    const res = await request(server).post('/api/auth/login').send({username: 'robert'})
    expect(res.body.message).toBe('invalid credentials')
  })
  test('if username or password are invalid, responds with status 401', async () => {
    const res = await request(server).post('/api/auth/login').send({username: 'bill', password: 'badPassword'})
    expect(res.status).toBe(401)
  })
  test('if username or password are invalid, responds with "username and password required" message', async () => {
    const res = await request(server).post('/api/auth/login').send({ username: 'steve', password: 'badPassword'
})
    expect(res.body.message).toBe('username and password required')
  })
})

describe('GET /users', () => {
  test('returns an array of current users', async () => {
    const res = await request(server).get('/api/users')
    expect(res.body).toBeInstanceOf(Array)
  })
  test('if no users, returns an empty array', async () => {
    await db('users').truncate()
    const res = await request(server).get('/api/users')
    expect(res.body).toHaveLength(0)
  })
})

describe('GET /jokes', () => {
  test('if token is not present, responds with message "token required"', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.body.message).toBe('Token required')
  })
  test('', async () => {
    const res = await request(server).get('/api/jokes').set('Authorization', 'notARealToken')
    expect(res.body.message).toBe('Token invalid')
  })
})
