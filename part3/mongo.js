const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password, name, number as an argument: node mongo.js <password> <optional:name> <optional:number>')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.pwurs.mongodb.net/phonebook?retryWrites=true&w=majority`;
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length===3){
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    console.log("Phonebook:")
    Contact
        .find({})
        .then(result => {
            result.forEach(contact => console.log(contact.name,contact.number))
            mongoose.connection.close()
        })
}else{
    const name = process.argv[3]
    const number = process.argv[4] || null

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

    const contact = new Contact({
        name: name,
        number: number,
    })

    contact.save().then(result => {
    console.log("Added "+result.name +" number "+result.number+" to phonebook")
    mongoose.connection.close()
    })
}

