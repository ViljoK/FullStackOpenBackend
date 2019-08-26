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
        const blogs = await helper.blogsInDb()
        expect(blogs.length).toBe(helper.initialBlogs.length + 1)
    })
    test('spesific blog inserted', async () => {
        await (api)
            .post('/api/blogs')
            .send(helper.insertBlog)
        const blogs = await helper.blogsInDb()
        const titles = blogs.map((blog) => blog.title)

        expect(titles).toContain('Sienestys')
    })
    test('likes default is 0', async () => {
        const res = await (api)
            .post('/api/blogs')
            .send(helper.insertBlog)
        expect(res.body.likes).toBe(0)
    })
    test('if required data does not exists', async () => {
        const res = await (api)
            .post('/api/blogs')
            .send(helper.invalidBlog)
        expect(res.statusCode).toBe(422)
        expect(res.body.name).toBe('ValidationError')
    })
})

describe('HTTP DELETE', () => {
    test('can delete', async () => {
        let blogs = await helper.blogsInDb()
        const id = blogs[0].id

        await api.delete(`/api/blogs/${id}`)
        blogs = await helper.blogsInDb()

        expect(blogs.length).toBe(helper.initialBlogs.length - 1)
    })
    test('spesific data to be deleted', async () => {
        let blogs = await helper.blogsInDb()
        const id = blogs[0].id
        const title = blogs[0].title

        await api.delete(`/api/blogs/${id}`)
        blogs = await helper.blogsInDb()
        const titles = blogs.map((blog) => blog.title)

        expect(titles).toEqual(expect.not.arrayContaining([title]))
    })
    test('deleting with nonexisting id', async () => {
        const id = await helper.nonExistingId()

        const res = await api.delete(`/api/blogs/${id}`)
        const blogs = await helper.blogsInDb()

        expect(blogs.length).toBe(helper.initialBlogs.length)
        expect(res.statusCode).toBe(400)
    })
})

describe('HTTP PUT', () => {
    test('can increase by amount', async () => {
        let blogs = await helper.blogsInDb()
        const id = blogs[0].id
        const likesBefore = blogs[0].likes

        const result = await api.put(`/api/blogs/${id}`).send({ amount: 12 })
        blogs = await helper.blogsInDb()

        expect(blogs[0].id).toBe(id)
        expect(blogs[0].likes).toBe(likesBefore + 12)
        expect(result.body.likes).toBe(likesBefore)
    })
    test('increases by one if amount not set', async () => {
        let blogs = await helper.blogsInDb()
        const id = blogs[0].id
        const likesBefore = blogs[0].likes

        const result = await api.put(`/api/blogs/${id}`)
        blogs = await helper.blogsInDb()

        expect(blogs[0].id).toBe(id)
        expect(blogs[0].likes).toBe(likesBefore + 1)
        expect(result.body.likes).toBe(likesBefore)
    })
    test('put with nonexisting id', async () => {
        const blogsBefore = await helper.blogsInDb()
        const id = await helper.nonExistingId()

        const res = await api.put(`/api/blogs/${id}`)
        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter).toEqual(blogsBefore)
        expect(res.statusCode).toBe(400)
    })
})


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

afterAll(() => {
    mongoose.connection.close()
})