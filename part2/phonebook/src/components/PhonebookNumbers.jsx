const PhonebookNumbers = ({persons, phonebookFilter}) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(phonebookFilter.toLowerCase()))

  return filteredPersons.map((person) =>
    <div key={person.id}>{person.name} {person.number}</div>
  )
}

export default PhonebookNumbers
