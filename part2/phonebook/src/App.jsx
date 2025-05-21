import { useEffect, useState } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm.jsx'
import PhonebookFilter from './components/PhonebookFilter.jsx'
import PhonebookNumbers from './components/PhonebookNumbers.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  // Fetch data from server
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`)
    }
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNameFilterChange = (event) => setNameFilter(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>

      <PhonebookFilter
	phonebookFilter={nameFilter}
	onPhonebookFilterChange={handleNameFilterChange}/>

      <h2>Add new number</h2>

      <PersonForm
	onSubmit={addPerson}
	persons={persons} setPersons={setPersons}

	onNameChange={handleNameChange}
	newName={newName} setNewName={setNewName}

	onNumberChange={handleNumberChange}
	newNumber={newNumber} setNewNumber={setNewNumber}/>

      <h2>Numbers</h2>

      <PhonebookNumbers
	persons={persons} phonebookFilter={nameFilter}/>

    </div>
  )
}

export default App
