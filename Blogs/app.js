const config = require('./utils/config')
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const app = express()

logger.info(`Start connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => {
        logger.info('Connected')
    }).catch(() => {
        logger.info('Connectin error')
    })

app.use(cors())
app.use(bodyparser.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
