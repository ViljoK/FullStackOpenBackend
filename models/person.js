const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Error: ', error.message)
    })

const personSchema = mongoose.Schema({
    name    : {
        type        : String,
        minlength   : 3,
        required    : true,
    },
    number  : {
        type        : String,
        minlength   : 10,
        required    : true,
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)