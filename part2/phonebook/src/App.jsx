import { useState } from 'react'
import phonebookData from './data'
import Numbers from "./components/Numbers"
import "./App.css"

const App = () => {
  const [persons, setPersons] = useState(phonebookData) 
  const [newName, setNewName] = useState('')

  // handle form submission
  const handleForm = (event) => {
    event.preventDefault()

    // reject copy submissions
    if (
      persons.map(person => person.name)
      .includes(newName)
    ) {
      alert(`${newName} already exists!`)
      setNewName("")
      console.log("test")
    } else {
      // push to the list
      const personObject = {
        id: persons.length + 1,
        name: newName,
      }

      setPersons(persons.concat(personObject))
      console.log(persons)

      setNewName("")
    }
  }

  // handle name input
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleForm}>
        <div>
          name: <input onChange={handleNewName} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons}/>
    </div>
  )
}

export default App
