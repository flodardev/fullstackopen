const Numbers = ({persons, filteredPersons, newFilter, handleDeleteEvent}) => {
    return (
        <Number persons={!newFilter ? persons : filteredPersons} handleDeleteEvent={handleDeleteEvent}/>
    )
}

const Number = ({persons, handleDeleteEvent}) => {
    return (
        <div>
            <ul>
                {persons.map(person => <li key={person.id}>{person.name} | {person.number} | <button onClick={() => handleDeleteEvent(person.id, person.name)}>delete</button></li>)}
            </ul>
        </div>
    )
}

export default Numbers