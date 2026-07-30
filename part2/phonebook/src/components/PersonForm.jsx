const PersonForm = ({handleForm, handleNewName, newName, handleNewNumber, newNumber}) => {
    return (
        <form onSubmit={handleForm}>
            <div>
                name: <input onChange={handleNewName} value={newName}/>
            </div>
            <div>
                number: <input type='number' onChange={handleNewNumber} value={newNumber}></input>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm