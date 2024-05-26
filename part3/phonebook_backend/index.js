const express = require('express')
require('dotenv').config()
const app = express()

const Person = require('./models/person')

let persons = []

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
  
const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(requestLogger)

// const morgan = require('morgan')
// //app.use(morgan('tiny'))
// morgan.token('req-body', (req) => JSON.stringify(req.body))
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// app.get('/info', (request, response) => {
//     const date = new Date()
//     const info = `
//         <p>Phonebook has info for ${persons.length} people</p>
//         <p>${date}</p>
//     `
//     response.send(info)
// })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findById(id).then(person =>
        response.json(person)
    )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 10000)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'name or number missing' 
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)

    console.log(response)
})


app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
