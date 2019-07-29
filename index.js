const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})