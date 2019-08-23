const mongoose = require('mongoose')

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