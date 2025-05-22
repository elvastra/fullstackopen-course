const CountryList = ({countries, setSearchQuery}) => {
  if (countries.length > 10) return <div><p>Too many countries</p></div>
  return (
    <div>
      {countries.map(country => {
	const name = country.name.common
	return (
	  <p key={name}>
	    {name} <button onClick={() => setSearchQuery(name)}>Show</button>
	  </p>
	)
      })}
    </div>
  )
}

export default CountryList
