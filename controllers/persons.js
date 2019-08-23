const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (req, res, next) => {
    Person.find({}).then(persons => {
        res.status(200).json(persons.map(person => person.toJSON()))
    }).catch(error => next(error))
})

personsRouter.post('/', (req, res, next) => {
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

personsRouter.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    Person.findById(id).then(person => {
        res.status(200).json(person.toJSON())
    }).catch(error => next(error))
})

personsRouter.put('/:id', (req,res, next) => {
    const id = req.params.id
    Person.updateOne({ _id: id }, { number: req.body.number }).then(() => {
        Person.find({}).then(persons => {
            res.status(200).json(persons.map(person => person.toJSON()))
        })
    }).catch(error => next(error))
})

personsRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Person.deleteOne({ _id: id }).then(() => {
        Person.find({}).then(persons => {
            res.status(200).json(persons.map(person => person.toJSON()))
        })
    }).catch(error => next(error))
})

personsRouter.get('/all/info', (req, res, next) => {
    const time = new Date().toLocaleString()
    Person.countDocuments().then(count => {
        res.status(200).json({ count: count, time: time })
    }).catch(error => next(error))
})

module.exports = personsRouter
