const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT || 3001

// Need this or request.body will be undefined
app.use(express.json())

// Logging
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

let persons = [
    {
	"id": "1",
	"name": "Arto Hellas",
	"number": "040-123456"
    },
    {
	"id": "2",
	"name": "Ada Lovelace",
	"number": "39-44-5323523"
    },
    {
	"id": "3",
	"name": "Dan Abramov",
	"number": "12-43-234345"
    },
    {
	"id": "4",
	"name": "Mary Poppendieck",
	"number": "39-23-6423122"
    }
]

app.get("/", (request, response) => {
    response.send('<h1>Homepage</h1>')
})

app.get("/info", (request, response) => {
    response.send(`<div>Phonebook has info for ${persons.length} people</div>` + `<p>${Date()}</p>`)
})

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const found = persons.find((person) => id === person.id)
    if (found) return response.json(found)

    response.status(404).json({
	error: `Person ${id} not found`
    })
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter((person) => person.id !== id)
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    if (!request.body) return response.status(400).json({
	error: "No body"
    })

    const missing = !request.body.name || !request.body.number

    if (missing) return response.status(400).json({
	error: "Body is missing a name and/or number"
    })

    const newPerson = request.body

    const found = persons.find((person =>
	person.name === newPerson.name))

    if (found) return response.status(409).json({
	error: `${newPerson.name} already exists`
    })

    newPerson.id = String(Math.floor(Math.random() * 10000))

    persons = persons.concat(newPerson)
    response.json(newPerson)
})

app.listen(PORT, () => {
    console.log(`Running on ${PORT}...`)
})
