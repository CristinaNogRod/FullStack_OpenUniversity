const express = require('express')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    next(error);
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


// ROUTES
app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Person.countDocuments({}).then(count => {
        const date = new Date()
        const info = `
            <p>Phonebook has info for ${count} people</p>
            <p>${date}</p>
        `
        response.send(info)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            if (result) {
                console.log(`Deleted person with id ${request.params.id}`)
                response.status(204).end()
            } else {
                console.log(`Person with id ${request.params.id} not found`)
                response.status(404).send({ error: 'Person not found' })
            }
        })
        .catch(error => next(error))
})

// const generateId = () => {
//     return Math.floor(Math.random() * 10000)
// }

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.content === undefined) {
        return response.status(400).json({error: 'name or number missing'})
    }

    // if (persons.find(person => person.name === body.name)) {
    //     return response.status(400).json({ 
    //         error: 'name must be unique' 
    //     })
    // }

    const person = new Person ({
        // id: generateId(),
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        console.log("saving person")
        response.json(savedPerson)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators: true, context: 'query'})
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
})

// remaining middleware
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
