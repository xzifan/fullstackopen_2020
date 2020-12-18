const { request, response, json } = require('express')
const express = require('express')
const { format } = require('morgan')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Contact = require('./models/Contact')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('body', (req, res) => {
	return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (request, response) => {
	const datetime = new Date()
	const text = datetime.toLocaleString('en-us', { dateStyle: "long", weekday: 'short', timeStyle: "full", month: "short", timeZone: "Europe/Helsinki", timeZoneName: "long", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", houryear: "numeric", timeZoneName: "long" })
	Contact.count({}).then(total =>{
		response.send('Phonebook has info for ' + persons.length + ' people</br>' + text)
	});
})

app.get('/api/persons', (request, response) => {
	Contact
        .find({})
        .then(result => {
            response.contentType('json')
			response.json(result)
        })
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	Contact
		.findById(id)
		.then(result =>{
			if (result)
				response.json(result)
			else 
				response.status(404).send("Person not found")
		}).catch(error => {
			console.log("Invalid ID")
			response.status(405).send("Invalid ID value")
		})
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	Contact.findByIdAndDelete(id).then(result=>{
		console.log(result)
		response.json(result)
	}).catch(error => {
		console.log("Invalid ID")
		response.status(405).send("Invalid ID value")
	})
})

app.post('/api/persons', (request, response) => {
	if (!request.body.name || !request.body.number)
		response.status(400).json({ error: "name or number missing " })
	Contact.findOne({name:request.body.name},(err,result)=>{
		if (result==null){
			const newPerson = new Contact({...request.body})
			newPerson.save().then(result=>{
				response.json(result)
			})
		}else response.status(403).send({ result ,error: 'name must be unique' })
	})
})

app.put('/api/persons/:id', (request, response) => {
	const id = request.params.id

	if (!request.body.name || !request.body.number)
		response.status(400).send({ error: "name or number missing " })
	Contact.findOne({name:request.body.name},(err,result)=>{
		console.log(result)
		if (!result || (result&&result.id==id))
			Contact.findByIdAndUpdate(id,{...request.body}).then(result=>{
				response.json({status:"succeed",original:result,update:request.body})
			})
		else
			response.status(403).send({result , error: 'name must be unique' })
			
	})
	
})

app.listen(process.env.PORT||3001, () => {
	console.log('Server running on port ' +(process.env.PORT || "3001"))
})