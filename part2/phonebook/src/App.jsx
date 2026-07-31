import { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from "./components/Numbers"
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import numberService from "./services/numbers"
import "./App.css"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [filteredPersons, setFilteredPersons] = useState(persons)

  // axios to db.json
  useEffect(() => {
    numberService.getAll()
      .then(numbers => setPersons(numbers))
      .catch(error => alert("Problem getting data from server"))
  }, [])

  // handle form submission
  const handleForm = (event) => {
    event.preventDefault()

    // reject copy submissions
    if (
      persons.map(person => person.name.toLowerCase())
      .includes(newName.toLowerCase())
    ) {

      // alert user name already exist
      if (confirm(`${newName} is already in the phonebook. Replace the number with a new one?`)) {

        const oldPersonObject = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const updatedPersonObject = {...oldPersonObject, number: newNumber}

        numberService.updateNumber(oldPersonObject.id, updatedPersonObject)
          .then(response => setPersons(persons.map(person => person.id === response.id ? updatedPersonObject : person )))
          .catch(error => alert("Error in updating number"))
      }

      setNewName("")
      setNewNumber("")

    } else {

      const personObject = {
        id: String(persons.length + 1),
        name: newName,
        number: String(newNumber),
      }

      // update db server
      numberService.create(personObject)
        .then(response => {
          // update state
          setPersons(persons.concat(response))
        })
        .catch(error => alert("error creating new person in db"))

      setNewName("")
      setNewNumber("")
    }

  }

  // handle name input
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  // handle number input
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  // handle filter input
  const handleFilterChange = (event) => {
    const value = event.target.value
    setNewFilter(value)

    setFilteredPersons(persons.filter(person => person.name.toLowerCase()
      .includes(value.toLowerCase())))

  }

  // handle delete btn event
  const handleDeleteEvent = (id, name) => {

    if (confirm(`Delete ${name} ?`)) {
      numberService.deleteNumber(id)
        .then(response => {
          // update state
          setPersons(persons.filter(person => person.id !== response.id))
        })
        .catch(error => alert("Error in deleting person"))
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm handleForm={handleForm} handleNewName={handleNewName} newName={newName} handleNewNumber={handleNewNumber} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <Numbers persons={persons} filteredPersons={filteredPersons} newFilter={newFilter} handleDeleteEvent={handleDeleteEvent}/>
    </div>
  )
}

export default App
