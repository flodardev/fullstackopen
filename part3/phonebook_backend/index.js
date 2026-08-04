const express = require("express")
const morgan = require("morgan")


const app = express();

app.use(express.json())

// morgan middleware
morgan.token("body", (req) => {
    return JSON.stringify(req.body)
})

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
    },
]

// Functions
const generateId = () => {
    const ids = persons.map(person => Number(person.id))
    const max = 100
    const min = 1
    let newId = Math.floor(Math.random() * (max - min + 1)) + min;

    while(ids.includes(newId))
    {
        newId = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return newId
}

// ROUTES

// get all
app.get("/api/persons", (request, response) => {
    if (persons) {
        response.json(persons)
    } else {
        response.status(404).json({
            status: 404,
            error: "no data in the server"
        })
    }
})

// get person
app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end();
    }

})

// delete person
app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// add person
app.post("/api/persons", (request, response) => {
    const person = request.body

    // send an error if name or number is missing
    if (!person.name || !person.number) {
        return response.status(400).json({
            error: "name or number is missing"
        })
    }


    // send an error if a name already exists, case insensitive
    if (persons.map(person => person.name.toLowerCase()).includes(person.name.toLowerCase())) {
        return response.status(400).json({
            error: "name already exists"
        })
    }

    const personObject = {
        id: String(generateId()),
        name: person.name,
        number: String(person.number),
    }
    persons = persons.concat(personObject)
    response.json(personObject)
})

// get info
app.get("/info", (request, response) => {

    const numberOfPersons = persons.length
    const dateNow = new Date()

    response.send (`
        <p>Phonebook has info for ${numberOfPersons} people</p>
        <p>${dateNow}</p>
        `)
})

// Middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: "unknown endpoint"
    })
}
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})