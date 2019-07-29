const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = []

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (req, res) => {
    const data = req.body
    if (!data.name || !data.number) {
        res.statusCode = 422
        res.send({error : 'Nimi ja/tai numero puuttuu'})
    }
    else if (persons.find(person => person.name === data.name)) {
        res.statusCode = 422
        res.send({error : `Henkilö ${data.name} löytyy jo luettelosta`})
    }
    else {
        let id = Math.ceil(Math.random() * 1000)
        while (persons.find(person => person.id === id)) {
            console.log('Arvotaan uusi tunniste')
            id = Math.ceil(Math.random() * 1000)
        }
        console.log(id, req.body.name, req.body.number)
        const newPerson = {
            id      :   id,
            name    :   req.body.name,
            number  :   req.body.number
        }
        persons.push(newPerson)
        res.json(persons)
    }
})

app.get('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    console.log(`Pyydetty id: ${id}`)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    }
    else {
        res.statusCode = 404
        res.send('Pyydetyllä id:llä ei löytynyt tietoja')
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    console.log(`Pyydetty poistamaan id: ${id}`)
    const personToDelete = persons.find(person => person.id === id)
    if (personToDelete) {
        persons = persons.filter(person => person.id !== id)
        res.send(`Poistettiin ${personToDelete.name}`)
    }
    else {
        res.statusCode = 404
        res.send('Poistettavaa henkilöä ei löydy')
    }
})

app.get('/info', (req, res) => {
    const time = new Date().toLocaleString()
    res.send(`Puhelinluettelossa on ${persons.length} nimeä \n${time}`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})