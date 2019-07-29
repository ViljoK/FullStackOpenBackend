const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
    {
        name: 'Viljo Karhumaa',
        number: '0443114207',
        id: 1,
    },
    {
        name: 'Teppo Tulppu',
        number: '0503236678',
        id: 2,
    },
    {
        name: 'Seppo Jokinen',
        number: '0408485861',
        id: 3,
    },
    {
        name: 'Markku Kanerva',
        number: '0206677889',
        id: 4,
    },
]

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (req, res) => {
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