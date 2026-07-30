const Numbers = ({persons, filteredPersons, newFilter}) => {

    if (newFilter) {
        return (
            <div>
                <ul>
                    {filteredPersons.map(person => <li key={person.id}>{person.name} | {person.number}</li>)}
                </ul>
        </div>
        )
    }

    return (


        <div>
            <ul>
                {persons.map(person => <li key={person.id}>{person.name} | {person.number}</li>)}
            </ul>
        </div>
    )
}

export default Numbers