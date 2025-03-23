const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb://a-sokolova-dev:${password}@cluster0-shard-00-00.rfiit.mongodb.net:27017,cluster0-shard-00-01.rfiit.mongodb.net:27017,cluster0-shard-00-02.rfiit.mongodb.net:27017/phonebookApp?replicaSet=atlas-12q0k6-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => {
    if (process.argv.length === 3) {
      Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
    } else if (process.argv.length === 5) {
      const name = process.argv[3]
      const number = process.argv[4]

      const person = new Person({
        name,
        number
      })

      person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
      })
    } else {
      console.log('Invalid number of arguments.')
      mongoose.connection.close()
    }
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)