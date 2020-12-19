const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Contact = require('./models/Contact')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (request, response) => {
    const datetime = new Date()
    const text = datetime.toLocaleString('en-us', { dateStyle: 'long', weekday: 'short', timeStyle: 'full', month: 'short', timeZone: 'Europe/Helsinki', timeZoneName: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', houryear: 'numeric'})
    Contact.count({},(err,count) => {
        if (err) response.json(err)
        else response.send('Phonebook has info for ' + count + ' people</br>' + text)
    })
})

app.get('/api/persons', (request, response) => {
    Contact
        .find({})
        .then(result => {
            response.contentType('json')
            response.json(result)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Contact
        .findById(id)
        .then(result => {
            if (result)
                response.json(result)
            else
                response.status(404).send('Person not found')
        }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Contact.findByIdAndDelete(id).then(result => {
        console.log(result)
        response.json(result)
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const newPerson = new Contact({ ...request.body })

    newPerson.save().then(result => {
        response.json(result)
    }).catch(error => response.status(403).send(error))

})

app.put('/api/persons/:id', (request, response) => {
    const id = request.params.id

    Contact.findByIdAndUpdate(id, { id: id, name: request.body.name, number: request.body.number }, { runValidators: true, context: 'query' }).then(result => {
        response.json({ status: 'succeed', original: result, update: request.body })
    }).catch(error => response.status(403).send(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

app.listen(process.env.PORT || 3001, () => {
    console.log('Server running on port ' + (process.env.PORT || '3001'))
})