const Numbers = ({persons}) => {
    return (
        <div>
            <ul>
                {persons.map(person => <li key={person.id}>{person.name}</li>)}
            </ul>
      </div>
    )
}

export default Numbers