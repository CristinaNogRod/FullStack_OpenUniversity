const Person = ({person, deletePerson}) => {
    return ( 
        <div>
            <span key={person.name}> {person.name} {person.number} </span>
            <button onClick={() => deletePerson(person.id)}> delete </button>
        </div>
        
    );
}

const Persons = ({persons, deletePerson}) => {
    return ( 
        <>
            {persons.map(person => {
                return <Person key={person.name} person={person} deletePerson={deletePerson}/>
            })}
        </> 
    );
}
 
export default Persons;