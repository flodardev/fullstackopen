import { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from "./components/Numbers"
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from "./components/Notification"
import DeleteNotification from './components/DeleteNotification'
import ErrorNotification from './components/ErrorNotification'
import numberService from "./services/numbers"
import "./App.css"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [notificationMessage, setNotificationMessage] = useState({newPerson: null, updatePerson: null})
  const [deleteNotification, setDeleteNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState({name: null, statusCode: null})

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
          .then(response => {
            setPersons(persons.map(person => person.id === response.id ? updatedPersonObject : person ))

            // notify user person number was updated
            setNotificationMessage({updatePerson: updatedPersonObject.name, newPerson: null})
            setTimeout(() => {
              setNotificationMessage({updatePerson: null, newPerson: null})
            }, 3000)

          })
          .catch(error => {
            // notify user error in updating phone number
            const statusCode = error.response.status

            setErrorMessage({name: oldPersonObject.name, statusCode: statusCode})
            setTimeout(()=>{
              setErrorMessage({name: null, statusCode: null})
            }, 5000)
          })
      }

      setNewName("")
      setNewNumber("")

    } else {

      // add the new person to the phonebook
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

          // notify user person is added to phonebook
          setNotificationMessage({updatePerson: null, newPerson: response.name})
          setTimeout(() => {
            setNotificationMessage({updatePerson: null, newPerson: null})
          }, 3000)

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
          setPersons(persons.filter(person => person.id !== id))
          console.log(response)
          // alert user delete was succesful
          setDeleteNotification(name)
          setTimeout(() => {
            setDeleteNotification(null)
          }, 3000)
        })
        .catch(error => {alert("Error in deleting person")})
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationMessage={notificationMessage}/>
      <DeleteNotification deleteNotification={deleteNotification}/>
      <ErrorNotification errorMessage={errorMessage}/>
      <PersonForm handleForm={handleForm} handleNewName={handleNewName} newName={newName} handleNewNumber={handleNewNumber} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <Numbers persons={persons} filteredPersons={filteredPersons} newFilter={newFilter} handleDeleteEvent={handleDeleteEvent}/>
    </div>
  )
}

export default App
