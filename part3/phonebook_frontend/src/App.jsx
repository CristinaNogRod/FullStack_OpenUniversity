import { useState, useEffect} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState({ message: null, type: null })
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  // GET request
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  // event handlers
  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  // PUT request
  const updateNumber = (id, person) => {
    // confirm update
    if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with the new one?`)) {

      personService
      .update(id, person)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNotification({message: `Added ${person.name}`, type: "sucess"})
      })
      .catch(() => {
        setNotification(
          {message: `Information of '${person.name}' was already removed from server`, type: "error"}
        )
      })

      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
      setNewName('')
      setNewNumber('')
    }    
  }

  // event handler for submit form
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    // check if name already exists
    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) {
        // alert(`${newName} is already added to the phonebook.`)
        const targetPerson = persons.find(person => person.name === newName)
        const id = targetPerson.id
        updateNumber(id, personObject)
        return
    }
    
    // POST request & reset states
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification({message: `Added ${newName}`, type: "sucess"})
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setNotification({ message: error.response.data.error, type: 'error' })
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
      })
  }
  
  // filter handler
  const handleFilterChange = (event) => {
    const value = event.target.value
    setFilter(value)
    setShowAll(value === "")
  }
  // filter persons
  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
  

  // DELETE request
  const deletePerson = (id) => {
    // confirm deletion
    if (window.confirm("Do you really delete this record?")) {
      personService
      .remove(id)
      .then( () => {
        setPersons(persons.filter(n => n.id !== id))
      })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter  filterValue={filterValue} handleFilterChange={handleFilterChange} />
      
      <h3>add a new</h3>
      <PersonForm addName={addName} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />

      <h3> Numbers </h3>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
      
    </div> 
  )
}

export default App