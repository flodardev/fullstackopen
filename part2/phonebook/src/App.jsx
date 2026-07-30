import { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from "./components/Numbers"
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import "./App.css"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [filteredPersons, setFilteredPersons] = useState(persons)

  // axios to db.json
  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then (response => {
      setPersons(response.data)
    })
  }, [])

  // handle form submission
  const handleForm = (event) => {
    event.preventDefault()

    // reject copy submissions
    if (
      persons.map(person => person.name.toLowerCase())
      .includes(newName.toLowerCase())
    ) {
      alert(`${newName} already exists!`)
      setNewName("")
    } else {
      // push to the list
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: Number(newNumber),
      }

      setPersons(persons.concat(personObject))

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

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm handleForm={handleForm} handleNewName={handleNewName} newName={newName} handleNewNumber={handleNewNumber} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <Numbers persons={persons} filteredPersons={filteredPersons} newFilter={newFilter}/>
    </div>
  )
}

export default App
