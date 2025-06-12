require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 3001

// Use the frontend
app.use(express.static('dist'))

// Need this or request.body will be undefined
app.use(express.json())

// Logging
morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body'),
)

const Person = require('./models/person.js')

app.get('/', (request, response) => {
	response.send('<h1>Homepage</h1>')
})

app.get('/info', (request, response, next) => {
	Person.find({})
		.then((found) =>
			response.send(
				`<div>Phonebook has info for ${found.length} people</div>` +
					`<p>${Date()}</p>`,
			),
		)
		.catch((error) => next(error))
})

app.get('/api/persons', (request, response, next) => {
	Person.find({})
		.then((result) => response.json(result))
		.catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	Person.findById(id)
		.then((found) => {
			if (found) return response.json(found)
			return response.status(404).json({
				error: `Person ${id} not found`,
			})
		})
		.catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	const number = request.body.number
	const name = request.body.name
	if (number && name)
		return Person.findById(id)
			.then((found) => {
				if (!found) return response.status(404).end()

				found.number = number
				found.name = name

				return found
					.save()
					.then((updated) => response.json(updated))
					.catch((error) => next(error))
			})
			.catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	Person.findByIdAndDelete(id)
		.then((deleted) => response.status(200).json(deleted))
		.catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (!body)
		return response.status(400).json({
			error: 'No body',
		})

	const missing = !body.name || !body.number

	if (missing)
		return response.status(400).json({
			error: 'Body is missing a name and/or number',
		})

	Person.find({ name: body.name })
		.then((matchingPeople) => {
			if (matchingPeople.length > 0)
				return response.status(409).json({
					error: `${body.name} already exists`,
				})

			const newPerson = new Person({
				name: body.name,
				number: body.number,
			})

			newPerson
				.save()
				.then((saved) => response.json(saved))
				.catch((error) => next(error))
		})
		.catch((error) => next(error))
})

const unknownEndpoint = (request, response) =>
	response.status(404).send({ error: 'Unknown endpoint' })

// Needs to go after all the endpoints
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError')
		return response.status(400).send({ error: 'Malformed ID' })

	next(error)
}

// Has to be last
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Running on ${PORT}...`)
})
