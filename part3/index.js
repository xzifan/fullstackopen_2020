const { request, response, json } = require('express')
const express = require('express')
const { format } = require('morgan')
const morgan = require('morgan')
const app = express()

app.use(express.json())
morgan.token('body',(req,res)=>{
    return JSON.stringify(req.body)
})
app.use(morgan({format:':method :url :status :res[content-length] - :response-time ms :body'}))
let data = {
    "persons":[
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]
  }

app.get('/info', (request, response) => {
    const datetime = new Date()
    const text = datetime.toLocaleString('en-us', { dateStyle:"long", weekday: 'short', timeStyle:"full",month:"short" , timeZone:"Europe/Helsinki",timeZoneName:"long", day:"2-digit",hour:"2-digit", minute:"2-digit",second:"2-digit",houryear:"numeric",timeZoneName:"long"}) 
    response.send('Phonebook has info for '+data.persons.length+' people</br>'+text)
})
  
app.get('/api/persons', (request, response) => {
    response.contentType('json')
    response.json(data)
})

app.get('/api/persons/:id',(request, response) => {
    const id = Number(request.params.id)
    const match = data.persons.find(person => person.id === id)

    if (match)
        response.json(match)
    else
        response.status(404).end("Person not found")
})

app.delete('/api/persons/:id',(request, response) => {
    const id = Number(request.params.id)
    data.persons = data.persons.filter(person => person.id ===id)

    response.status(204).end()
})

app.post('/api/persons',(request, response)=>{
    console.log(request.body.name)
    if (!request.body.name || !request.body.number)
        response.status(400).send({ error: "name or number missing "})
    else if (data.persons.find(person => person.name === request.body.name))
        response.status(403).send({ error: 'name must be unique' })
    else {
        var newPerson = {...request.body,id:Math.floor(Math.random()*1000000)}
        data.persons.push(newPerson)
        console.log(data)
        response.status(201).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})