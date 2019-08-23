const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res, next) => {
    Blog
        .find({})
        .then((blogs) => {
            res.json(blogs.map((blog) => blog.toJSON()))
        })
        .catch((error) => next(error))
})

blogsRouter.post('/', (req, res, next) => {
    const blog = new Blog(req.body)
    blog
        .save()
        .then((result) => {
            res.status(201).json(result.toJSON())
        })
        .catch((error) => next(error))
})

module.exports = blogsRouter