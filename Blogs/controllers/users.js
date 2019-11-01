const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await User
            .find({})
            .populate('blogs', { title: 1, likes: 1 })
        res.status(200).json(users.map(u => u.toJSON()))
    } catch (exception) {
        next(exception)
    }
})

usersRouter.post('/', async (req, res, next) => {
    try{
        const { username, name, password } = req.body
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({ username, name, passwordHash })

        const result = await user.save()
        res.status(201).json(result.toJSON())
    }catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter