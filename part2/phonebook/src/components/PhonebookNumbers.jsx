const PhonebookNumbers = ({persons, phonebookFilter, onDeleteClick}) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(phonebookFilter.toLowerCase()))

  return filteredPersons.map((person) =>
    <div key={person.id}>
      {person.name} {person.number} <button onClick={() => onDeleteClick(person.id)}>Delete</button>
    </div>
  )
}

export default PhonebookNumbers
