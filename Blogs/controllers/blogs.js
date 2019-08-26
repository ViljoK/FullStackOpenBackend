const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find({})
        res.json(blogs.map((blog) => blog.toJSON()))
    }catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (req, res, next) => {
    const blog = new Blog(req.body)
    try {
        const result = await blog.save()
        res.status(201).json(result.toJSON())
    }catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        const result = await Blog.deleteOne({ _id: req.params.id })
        if (result.n === 0) {
            throw { name: 'NonExistingId', message: 'Given id does not exists' }
        }
        res.json(result)
    }catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    try {
        const increaseAmount = req.body.amount ? req.body.amount : 1
        const result = await Blog.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: increaseAmount } })
        if (result === null) {
            throw { name: 'NonExistingId', message: 'Given id does not exists' }
        }
        res.json(result)
    }catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter