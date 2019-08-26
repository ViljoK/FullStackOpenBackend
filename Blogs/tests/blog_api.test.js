const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('HTTP GET', () => {
    test('blogs are returned as json', async () => {
        await (api)
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(helper.initialBlogs.length)
    })
    test('spesific blog is returned', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map((r) => r.title)

        expect(titles).toContain('Kalahommia')
    })
    test('indentified by id, not _id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
        expect(response.body[0]._id).toBeFalsy()
    })
})

describe('HTTP POST', () => {
    test('can insert blog', async () => {
        await (api)
            .post('/api/blogs')
            .send(helper.insertBlog)
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    })
    test('spesific blog inserted', async () => {
        await (api)
            .post('/api/blogs')
            .send(helper.insertBlog)
        const response = await api.get('/api/blogs')
        const titles = response.body.map((r) => r.title)

        expect(titles).toContain('Sienestys')
    })
    test('likes default is 0', async () => {
        const result = await (api)
            .post('/api/blogs')
            .send(helper.insertBlog)
        expect(result.body.likes).toBe(0)
    })
    test('if required data does not exists', async () => {
        const res = await (api)
            .post('/api/blogs')
            .send(helper.invalidBlog)
        expect(res.statusCode).toBe(422)
        expect(res.body.name).toBe('ValidationError')
    })
})


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

afterAll(() => {
    mongoose.connection.close()
})