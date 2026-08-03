const express = require("express")

const app = express();

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
    { 
      "id": "5",
      "name": "Bubu", 
      "number": "39-23-6423122"
    }
]

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

// get info
app.get("/info", (request, response) => {

    const numberOfPersons = persons.length
    const dateNow = new Date()

    response.send (`
        <p>Phonebook has info for ${numberOfPersons} people</p>
        <p>${dateNow}</p>
        `)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})