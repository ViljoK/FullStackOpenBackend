const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const passwordMatch = user === null
            ? false
            : bcrypt.compare(password, user.passwordHash)

        if (!(user && passwordMatch)) {
            return res.status(401).json({ error: 'Invalid username or password' })
        }

        const userForToken = { username, id: user._id }
        const token = jwt.sign(userForToken, process.env.SECRECT)

        res.status(200).json({ token, username, name: user.name })
    } catch (exception) {
        next(exception)
    }
})

module.exports = loginRouter