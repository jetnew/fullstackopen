import { useState } from 'react'

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

const Persons = ({ personsToShow }) => {
  return (
    <>{personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}</>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App