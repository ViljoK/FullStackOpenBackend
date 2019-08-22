require('dotenv').config()
const express       = require('express')
const app           = express()
const bodyParser    = require('body-parser')
const morgan        = require('morgan')
const cors          = require('cors')
const Person        = require('./models/person')

app.use(cors())
app.use(bodyParser.json())

morgan.token('data', (req) => JSON.stringify(req.body))
app.use(morgan((tokens, req, res) => {
    let log = []
    log.push(tokens.method(req))
    log.push(tokens.url(req, res))
    log.push(tokens.status(req, res))
    log.push(tokens.res(req, res, 'content-length'))
    log.push(' - ')
    log.push(tokens['response-time'](req, res))
    log.push('ms')
    if (tokens.method(req) === 'POST') {
        log.push(tokens.data(req))
    }
    return log.join(' ')
}))

app.use(express.static('build'))

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        res.status(200).json(persons.map(person => person.toJSON()))
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const data = req.body
    if (!data.name || !data.number) {
        return res.status(422).json({ error : 'Nimi ja/tai numero puuttuu' })
    }
    const person = new Person({
        name:   data.name,
        number: data.number,
    })
    person.save().then(savedPerson => {
        res.status(200).json(savedPerson.toJSON())
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    Person.findById(id).then(person => {
        res.status(200).json(person.toJSON())
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (req,res, next) => {
    const id = req.params.id
    Person.updateOne({ _id: id }, { number: req.body.number }).then(() => {
        Person.find({}).then(persons => {
            res.status(200).json(persons.map(person => person.toJSON()))
        })
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.deleteOne({ _id: id }).then(() => {
        Person.find({}).then(persons => {
            res.status(200).json(persons.map(person => person.toJSON()))
        })
    }).catch(error => next(error))
})

app.get('/info', (req, res, next) => {
    const time = new Date().toLocaleString()
    Person.countDocuments().then(count => {
        res.status(200).json({ count: count, time: time })
    }).catch(error => next(error))
})

const unknownEndPoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndPoint)

const errorHandler = (err, req, res, next) => {
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    else if (err.name === 'ValidationError') {
        return res.status(422).send({ error: err.message, name: err.name })
    }
    next(err)
}
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`)
})
