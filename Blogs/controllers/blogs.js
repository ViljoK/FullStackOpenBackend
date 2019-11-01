const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = req => {
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer')) {
        return auth.substring(7)
    }
    return false
}

blogsRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog
            .find({})
            .populate('user', { username: 1, name: 1 })

        res.json(blogs.map((blog) => blog.toJSON()))
    }catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (req, res, next) => {
    const { author, title, url, likes } = req.body
    const token = getTokenFrom(req)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRECT)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'Invalid or missing token' })
        }
        const user = await User.findById(decodedToken.id)
        const blog = new Blog({ author, title, url, likes, user: user.id })

        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()

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