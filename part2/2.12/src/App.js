import { useState, useEffect } from 'react'
import personService from './services/person'

const Filter = ({ filter, handler }) => {
  return (
    <div>filter name: <input value={filter} onChange={handler} /></div>
  )
}

const PersonForm = ({ addHandler, name, nameHandler, number, numberHandler}) => {
  return (
    <form onSubmit={addHandler}>
        <div>name: <input value={name} onChange={nameHandler}/></div>
        <div>number: <input value={number} onChange={numberHandler}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <>{personsToShow.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={deletePerson(person)}>delete</button></p>)}</>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    // Person exists in database
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = persons.find(person => person.name === newName)
        const newPersonObject = {
          ...personObject,
          number: newNumber,
        }
        personService
          .put(newPersonObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    // Person doesn't exist in database
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = ({id, name}) => {
    return (event) => {
      event.preventDefault()
      if (window.confirm("Delete " + name + "?")) {
        personService
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id))
          })
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filterName} handler={handleFilterName} />
      <h3>Add New Person</h3>
      <PersonForm addHandler={addPerson} name={newName} nameHandler={handleNameChange} number={newNumber} numberHandler={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App