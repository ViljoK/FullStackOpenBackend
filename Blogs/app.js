const config = require('./utils/config')
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const app = express()

console.log(`Start connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected')
    }).catch(() => {
        console.log('Connectin error')
    })

app.use(cors())
app.use(bodyparser.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
