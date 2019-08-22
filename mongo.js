const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Anna salasana')
    process.exit()
}

const passwd = process.argv[2]

const url = `mongodb+srv://fullstack:${passwd}@cluster0-yah0c.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true})

const personSchema = mongoose.Schema({
    name    : String,
    number  : String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person
        .find({})
        .then(persons => {
            console.log(persons)
            mongoose.connection.close()
        })
        .catch(error => {
            console.log(error)
            mongoose.connection.close()
        })
}
else if (process.argv.length === 5) {
    const person = new Person({
        name   : process.argv[3],
        number : process.argv[4],
    })
    person.save().then(response => {
        console.log(`Person saved`)
        mongoose.connection.close()
    }).catch(error => {
        console.log(error)
        mongoose.connection.close()
    })
}


