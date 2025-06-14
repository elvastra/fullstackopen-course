import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm.jsx'
import PhonebookFilter from './components/PhonebookFilter.jsx'
import PhonebookNumbers from './components/PhonebookNumbers.jsx'
import PhonebookNotification from './components/PhonebookNotification.jsx'
import PhonebookService from './services/PhonebookService.js'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [nameFilter, setNameFilter] = useState('')
	const [success, setSuccess] = useState(null)
	const [failure, setFailure] = useState(null)

	// Fetch data from server
	useEffect(() => {
		PhonebookService.getAll().then((all) => setPersons(all))
	}, [])

	const notifySuccess = (message) => {
		setSuccess(message)
		setTimeout(() => setSuccess(null), 5000)
	}

	const notifyFailure = (message) => {
		setFailure(message)
		setTimeout(() => setFailure(null), 5000)
	}

	const changePerson = (id, obj) => {
		return PhonebookService.update(id, obj).then((updated) => {
			setPersons(
				persons.map((person) => (person.id === updated.id ? updated : person)),
			)
			setNewName('')
			setNewNumber('')
			notifySuccess(`Changed number of ${updated.name}`)
		})
	}

	const addPerson = (obj) => {
		return PhonebookService.create(obj)
													 .then((added) => {
														 setPersons(persons.concat(added))
														 setNewName('')
														 setNewNumber('')
														 notifySuccess(`Added ${added.name}`)
													 })
													 .catch((error) => notifyFailure(error.response.data.error))
	}

	const removePerson = (id) => {
		const current = persons.find((person) => person.id === id)
		if (window.confirm(`Delete ${current.name}?`)) {
			PhonebookService.remove(id)
											.then((removed) => {
												setPersons(persons.filter((person) => person.id !== removed.id))
												notifySuccess(`${current.name} deleted`)
											})
											.catch((error) =>
												notifyFailure(`${current.name} was already deleted from server`),
											)
		}
	}

	const handleNameChange = (event) => setNewName(event.target.value)
	const handleNumberChange = (event) => setNewNumber(event.target.value)
	const handleNameFilterChange = (event) => setNameFilter(event.target.value)
	const handleAddClick = (event) => {
		event.preventDefault()

		const personObject = { name: newName, number: newNumber }
		const current = persons.find((person) => person.name === newName)
		const shouldUpdate =
			current &&
			window.confirm(
				`${current.name} is already in the phonebook, replace old number?`,
			)

		if (shouldUpdate) return changePerson(current.id, personObject)
		if (!current) return addPerson(personObject)
	}

	return (
		<div>
				<h1>Phonebook</h1>

				<PhonebookNotification.Success message={success} />
				<PhonebookNotification.Failure message={failure} />

				<PhonebookFilter
						phonebookFilter={nameFilter}
														onPhonebookFilterChange={handleNameFilterChange}
				/>

				<h2>Add new number</h2>

				<PersonForm
						onSubmit={handleAddClick}
					persons={persons}
					setPersons={setPersons}
					onNameChange={handleNameChange}
					newName={newName}
					setNewName={setNewName}
					onNumberChange={handleNumberChange}
					newNumber={newNumber}
					setNewNumber={setNewNumber}
				/>

				<h2>Numbers</h2>

				<PhonebookNumbers
						persons={persons}
										phonebookFilter={nameFilter}
										onDeleteClick={removePerson}
				/>
		</div>
	)
}

export default App
