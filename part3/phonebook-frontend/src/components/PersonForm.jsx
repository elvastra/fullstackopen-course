const PersonForm = (props) => {

  const {
    onSubmit, persons, setPersons,
    newNumber, setNewNumber, onNumberChange,
    newName, setNewName, onNameChange
  } = props

  return (
    <form onSubmit={onSubmit}>

      <div>
	<div>Name: <input value={newName}
			  onChange={onNameChange}/></div>

	<div>Number: <input value={newNumber}
			    onChange={onNumberChange}/></div>
      </div>

      <div>
	<button type="submit">Add</button>
      </div>

    </form>
  )
}

export default PersonForm
