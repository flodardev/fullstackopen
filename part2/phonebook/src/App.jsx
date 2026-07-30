import { useState } from 'react'
import phonebookData from './data'
import "./App.css"

const App = () => {
  const [persons, setPersons] = useState(phonebookData) 
  const [newName, setNewName] = useState('')

  // handle form submission
  const handleForm = (event) => {
    event.preventDefault()

    const personObject = {
      id: persons.length + 1,
      name: newName,
    }

    setPersons(persons.concat(personObject))
    console.log(persons)

    setNewName("")
  }

  // handle name input
  const handleNewName = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleForm}>
        <div>
          name: <input onChange={handleNewName} value={newName}/>
        </div>
        <div>debug: {newName}</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(person => <li key={person.id}>{person.name}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default App
