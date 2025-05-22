const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital.join(", ")}</div>
      <div>Area: {country.area}</div>
      <h2>Languages</h2>
      <ul>
	{Object.values(country.languages).map(language =>
	  <li key={language}>{language}</li>
	)}
      </ul>
      <img alt={country.flags.alt} src={country.flags.png}/>
    </div>
  )
}

const Countries = ({countries, query, expandedCountries, onClick}) => {

  const matches = countries.filter(country =>
    country.name.common.toLowerCase().includes(query.toLowerCase()))

  if (matches.length > 10)  return <div><p>Too many matches</p></div>
  if (matches.length === 1) return <Country country={matches[0]}/>

  return (
    <div>
      {matches.map(country => {
	const key = country.ccn3
	const expanded = expandedCountries.find(code => code === key)

	return (
	  <div key={key}>
	    <p>
	      {country.name.common} <button onClick={() => onClick(key)}>
				      {expanded ? "Hide" : "Show"}
				    </button>
	    </p>
	    {expanded && <Country country={country}/>}
	  </div>
	)
      })}
    </div>
  )
}

export default Countries
