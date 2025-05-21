const PhonebookFilter = ({phonebookFilter, onPhonebookFilterChange}) => {
  return (
    <div>
      Show people matching: <input value={phonebookFilter}
				   onChange={onPhonebookFilterChange}/>
    </div>
  )
}

export default PhonebookFilter
